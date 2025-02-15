import torch
import torch.nn as nn
import torch.nn.functional as F

class HybridRecommender(nn.Module):
    def __init__(self, embedding_dim=16, alpha=0.5, beta=0.5, device="cpu"):
        """
        Initialize the hybrid recommender.
        - embedding_dim: Dimension for all embeddings.
        - alpha: Weight for the collaborative filtering score.
        - beta: Weight for the content-based score.
        """
        super(HybridRecommender, self).__init__()
        self.embedding_dim = embedding_dim
        self.alpha = alpha  # weight for collaborative filtering
        self.beta = beta    # weight for content-based
        self.device = device

        # --- Content-Based Part: Tag Embeddings ---
        self.tag2idx = {}
        self.idx2tag = {}
        self.num_tags = 0
        # Initialize with a dummy embedding. New tags will expand this.
        self.tag_embeddings = nn.Embedding(1, self.embedding_dim)

        # --- Collaborative Filtering Part: User Embeddings ---
        self.user2idx = {}
        self.idx2user = {}
        self.num_users = 0
        self.user_embeddings = nn.Embedding(1, self.embedding_dim)

        # --- Collaborative Filtering Part: Item Embeddings ---
        self.item2idx = {}
        self.idx2item = {}
        self.num_items = 0
        self.item_embeddings = nn.Embedding(1, self.embedding_dim)

    # ----- Methods for Dynamic Updates -----
    def add_new_tag(self, tag_id):
        """Adds a new tag to the model if it doesn't exist."""
        if tag_id in self.tag2idx:
            return
        new_index = self.num_tags
        self.tag2idx[tag_id] = new_index
        self.idx2tag[new_index] = tag_id
        self.num_tags += 1

        # Expand the embedding matrix.
        old_weights = self.tag_embeddings.weight.data
        new_embedding = nn.Embedding(self.num_tags, self.embedding_dim)
        if new_index > 0:
            new_embedding.weight.data[:new_index] = old_weights
        self.tag_embeddings = new_embedding

    def add_new_user(self, user_id):
        """Adds a new user for collaborative filtering if not already present."""
        if user_id in self.user2idx:
            return
        new_index = self.num_users
        self.user2idx[user_id] = new_index
        self.idx2user[new_index] = user_id
        self.num_users += 1

        old_weights = self.user_embeddings.weight.data
        new_embedding = nn.Embedding(self.num_users, self.embedding_dim)
        if new_index > 0:
            new_embedding.weight.data[:new_index] = old_weights
        self.user_embeddings = new_embedding

    def add_new_item(self, item_id):
        """Adds a new item for collaborative filtering if not already present."""
        if item_id in self.item2idx:
            return
        new_index = self.num_items
        self.item2idx[item_id] = new_index
        self.idx2item[new_index] = item_id
        self.num_items += 1

        old_weights = self.item_embeddings.weight.data
        new_embedding = nn.Embedding(self.num_items, self.embedding_dim)
        if new_index > 0:
            new_embedding.weight.data[:new_index] = old_weights
        self.item_embeddings = new_embedding

    def get_tag_embedding(self, tag_id):
        """Retrieve (or create) the embedding for a given tag."""
        if tag_id not in self.tag2idx:
            self.add_new_tag(tag_id)
        idx = self.tag2idx[tag_id]
        return self.tag_embeddings(torch.tensor(idx))

    # ----- Content-Based Representations -----
    def compute_user_content_vector(self, user_tags):
        """
        Computes a user's content vector as a weighted average of tag embeddings.
        user_tags: dict mapping tag_id to weight (e.g. {"sports": 2, "music": 10})
        """
        vectors = []
        weights = []
        for tag_id, weight in user_tags.items():
            if tag_id not in self.tag2idx:
                self.add_new_tag(tag_id)
            idx = self.tag2idx[tag_id]
            embedding = self.tag_embeddings(torch.tensor(idx))
            vectors.append(embedding)
            weights.append(weight)
        if not vectors:
            return torch.zeros(self.embedding_dim)
        vectors = torch.stack(vectors)  # Shape: (n_tags, embedding_dim)
        weights = torch.tensor(weights, dtype=torch.float32).unsqueeze(1)  # Shape: (n_tags, 1)
        weighted_sum = torch.sum(vectors * weights, dim=0)
        return weighted_sum / (torch.sum(weights) + 1e-8)

    def compute_item_content_vector(self, content_tags):
        """
        Computes an item's content vector as the average of its tag embeddings.
        content_tags: list of tag ids (e.g. ["sports", "fitness"])
        """
        vectors = []
        for tag_id in content_tags:
            if tag_id not in self.tag2idx:
                self.add_new_tag(tag_id)
            idx = self.tag2idx[tag_id]
            embedding = self.tag_embeddings(torch.tensor(idx))
            vectors.append(embedding)
        if not vectors:
            return torch.zeros(self.embedding_dim)
        vectors = torch.stack(vectors)
        return torch.mean(vectors, dim=0)

    # ----- Forward (Scoring) -----
    def forward(self, user_id, user_tags, item_id, item_tags):
        """
        Computes the hybrid recommendation score for a given user and item.
        - user_id: Identifier for the user.
        - user_tags: Dict of the user's tag interactions.
        - item_id: Identifier for the item.
        - item_tags: List of tags for the item.
        """
        # Ensure the user and item exist (for CF part).
        if user_id not in self.user2idx:
            self.add_new_user(user_id)
        if item_id not in self.item2idx:
            self.add_new_item(item_id)
        user_idx = self.user2idx[user_id]
        item_idx = self.item2idx[item_id]

        # --- Collaborative Filtering Score ---
        # Using cosine similarity between user and item latent vectors.
        user_cf = self.user_embeddings(torch.tensor(user_idx))
        item_cf = self.item_embeddings(torch.tensor(item_idx))
        collab_score = F.cosine_similarity(user_cf.unsqueeze(0), item_cf.unsqueeze(0))

        # --- Content-Based Score ---
        user_content = self.compute_user_content_vector(user_tags)
        item_content = self.compute_item_content_vector(item_tags)
        content_score = F.cosine_similarity(user_content.unsqueeze(0), item_content.unsqueeze(0))

        # --- Hybrid Score ---
        final_score = self.alpha * collab_score + self.beta * content_score
        return final_score.squeeze()  # Return as a scalar

    # ----- Recommendation Method -----
    def recommend(self, user_id, user_tags, items, top_k=5):
        """
        Recommend items for a given user.
        - user_id: Identifier for the user.
        - user_tags: Dict of the user's tag interactions.
        - items: Dict mapping item_id to its list of tags.
        - top_k: Number of top recommendations to return.
        Returns a list of (item_id, score) tuples sorted by score descending.
        """
        scores = []
        for item_id, item_tags in items.items():
            score = self.forward(user_id, user_tags, item_id, item_tags)
            scores.append((item_id, score.item()))
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_k]

    # ----- Model Persistence -----
    def save_model(self, path):
        """Saves the model state and all mappings to a file."""
        torch.save({
            'state_dict': self.state_dict(),
            'tag2idx': self.tag2idx,
            'idx2tag': self.idx2tag,
            'num_tags': self.num_tags,
            'user2idx': self.user2idx,
            'idx2user': self.idx2user,
            'num_users': self.num_users,
            'item2idx': self.item2idx,
            'idx2item': self.idx2item,
            'num_items': self.num_items,
            'embedding_dim': self.embedding_dim,
            'alpha': self.alpha,
            'beta': self.beta,
        }, path)

    @classmethod
    def load_model(cls, path):
        """Loads the model from a file."""
        checkpoint = torch.load(path)
        model = cls(embedding_dim=checkpoint['embedding_dim'],
                    alpha=checkpoint['alpha'],
                    beta=checkpoint['beta'])
        model.tag2idx = checkpoint['tag2idx']
        model.idx2tag = checkpoint['idx2tag']
        model.num_tags = checkpoint['num_tags']
        model.tag_embeddings = nn.Embedding(model.num_tags, model.embedding_dim)

        model.user2idx = checkpoint['user2idx']
        model.idx2user = checkpoint['idx2user']
        model.num_users = checkpoint['num_users']
        model.user_embeddings = nn.Embedding(model.num_users, model.embedding_dim)

        model.item2idx = checkpoint['item2idx']
        model.idx2item = checkpoint['idx2item']
        model.num_items = checkpoint['num_items']
        model.item_embeddings = nn.Embedding(model.num_items, model.embedding_dim)

        model.load_state_dict(checkpoint['state_dict'])
        return model
