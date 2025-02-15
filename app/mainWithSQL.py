import psycopg2
import torch
from hybrid_recommender import HybridRecommender



def main():
    # Configuration - Update these with your database credentials
    db_params = {
        'dbname': 'your_database',
        'user': 'your_user',
        'password': 'your_password',
        'host': 'localhost',
        'port': '5432'
    }
    model_path = 'hybrid_recommender.pt'
    num_events = 10  # Number of events to recommend per user

    # Determine device
    device = torch.device("cuda" if torch.cuda.is_available() else
                          "mps" if torch.backends.mps.is_available() else
                          "cpu")

    # Connect to the database
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()

    try:
        # Load existing model or initialize new
        try:
            model = HybridRecommender.load_model(model_path)
            model.device = device
            print("Loaded existing model.")
        except FileNotFoundError:
            model = HybridRecommender(embedding_dim=16, alpha=0.5, beta=0.5, device=device)
            print("Initialized new model.")

        # Fetch user tags data
        cursor.execute("SELECT user_id, tag_id, tag_count FROM USER_TAG;")
        users = {}
        for user_id, tag_id, tag_count in cursor.fetchall():
            users.setdefault(user_id, {})[tag_id] = tag_count

        # Fetch event tags data
        cursor.execute("SELECT event_id, tag_id FROM EVENT_TAG;")
        events = {}
        for event_id, tag_id in cursor.fetchall():
            events.setdefault(event_id, []).append(tag_id)

        # Process recommendations for each user
        for user_id in users:
            print(f"Processing recommendations for user {user_id}...")

            # Get user's tag preferences
            user_tags = users[user_id]

            # Generate recommendations
            recommendations = model.recommend(
                user_id=user_id,
                user_tags=user_tags,
                items=events,
                top_k=num_events
            )

            # Update database
            cursor.execute("DELETE FROM USER_RECOMMENDATIONS WHERE user_id = %s;", (user_id,))
            for event_id, score in recommendations:
                cursor.execute(
                    "INSERT INTO USER_RECOMMENDATIONS (user_id, event_id, score) VALUES (%s, %s, %s)",
                    (user_id, event_id, round(score, 2))

                print(f"Updated {len(recommendations)} recommendations for user {user_id}")

                # Commit changes and save model
                conn.commit()
                model.save_model(model_path)
                print("Recommendations updated successfully!")

    except Exception as e:
        conn.rollback()
        print(f"Error: {str(e)}")
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    main()