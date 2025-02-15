import asyncio
import asyncpg
import torch
import argparse
from hybrid_recommender import HybridRecommender

# Configuration
DB_CONFIG = {
    'database': 'your_database',
    'user': 'your_user',
    'password': 'your_password',
    'host': 'localhost',
    'port': '5432'
}
MODEL_PATH = 'hybrid_recommender.pt'
NUM_EVENTS = 10  # Number of events to recommend per user
RATE_LIMIT = 5   # Maximum number of concurrent update operations

async def fetch_user_tags(conn):
    """Fetch user tags from the database asynchronously."""
    return await conn.fetch("SELECT user_id, tag_id, tag_count FROM USER_TAG;")

async def fetch_event_tags(conn):
    """Fetch event tags from the database asynchronously."""
    return await conn.fetch("SELECT event_id, tag_id FROM EVENT_TAG;")

async def update_recommendations(conn, user_id, recommendations, semaphore):
    """Update recommendations for a user with rate limiting."""
    async with semaphore:
        # Delete old recommendations
        await conn.execute("DELETE FROM USER_RECOMMENDATIONS WHERE user_id = $1;", user_id)

        # Insert new recommendations
        for event_id, score in recommendations:
            await conn.execute(
                "INSERT INTO USER_RECOMMENDATIONS (user_id, event_id, score) VALUES ($1, $2, $3)",
                user_id, event_id, round(score, 2)
            )
        print(f"Updated {len(recommendations)} recommendations for user {user_id}")

async def process_user(user_id, user_tags, events, model):
    """Process recommendations for a single user asynchronously."""
    recommendations = model.recommend(
        user_id=user_id,
        user_tags=user_tags,
        items=events,
        top_k=NUM_EVENTS
    )
    return user_id, recommendations

async def main(delay):
    # Determine device
    device = torch.device(
        "cuda" if torch.cuda.is_available() else
        "mps" if hasattr(torch, "backends") and torch.backends.mps.is_available() else
        "cpu"
    )

    # Load or initialize the model
    try:
        model = HybridRecommender.load_model(MODEL_PATH)
        model.device = device
        print("Loaded existing model.")
    except FileNotFoundError:
        model = HybridRecommender(embedding_dim=16, alpha=0.5, beta=0.5, device=device)
        print("Initialized new model.")

    # Wait for the specified delay before starting the update
    if delay > 0:
        print(f"Waiting for {delay} seconds before updating recommendations...")
        await asyncio.sleep(delay)

    # Connect to the database
    conn = await asyncpg.connect(**DB_CONFIG)

    try:
        # Fetch data asynchronously
        user_tags_data = await fetch_user_tags(conn)
        event_tags_data = await fetch_event_tags(conn)

        # Organize user tags (e.g., {user_id: {tag_id: tag_count, ...}, ...})
        users = {}
        for record in user_tags_data:
            users.setdefault(record['user_id'], {})[record['tag_id']] = record['tag_count']

        # Organize event tags (e.g., {event_id: [tag_id, tag_id, ...], ...})
        events = {}
        for record in event_tags_data:
            events.setdefault(record['event_id'], []).append(record['tag_id'])

        # Process users concurrently to generate recommendations
        user_tasks = [
            process_user(user_id, user_tags, events, model)
            for user_id, user_tags in users.items()
        ]
        user_results = await asyncio.gather(*user_tasks)

        # Create a semaphore to limit concurrent update operations
        update_semaphore = asyncio.Semaphore(RATE_LIMIT)

        # Update recommendations in the database concurrently with rate limiting
        update_tasks = [
            update_recommendations(conn, user_id, recommendations, update_semaphore)
            for user_id, recommendations in user_results
        ]
        await asyncio.gather(*update_tasks)

        # Save the model
        model.save_model(MODEL_PATH)
        print("Recommendations updated successfully!")

    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        await conn.close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Update user recommendations.')
    parser.add_argument(
        '--delay',
        type=int,
        default=0,
        help='Delay in seconds before updating recommendations'
    )
    args = parser.parse_args()
    asyncio.run(main(args.delay))

# run the code with the following command: python mainWithSQLasync.py --delay 5
# The code will wait for 5 seconds before updating the recommendations.