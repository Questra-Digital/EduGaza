package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Story struct {
	ID      string `json:"id" bson:"id"`
	Title   string `json:"title" bson:"title"`
	Content string `json:"content" bson:"content"`
}

var collection *mongo.Collection

func connectMongo() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://mongo:27017"))
	if err != nil {
		log.Fatal("Mongo connection failed:", err)
	}

	collection = client.Database("storiesdb").Collection("stories")
	log.Println("✅ Connected to MongoDB")
}

func addStoryHandler(w http.ResponseWriter, r *http.Request) {
	var story Story
	if err := json.NewDecoder(r.Body).Decode(&story); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, story)
	if err != nil {
		http.Error(w, "Failed to insert story", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(story)
}

func listStoriesHandler(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, "Failed to fetch stories", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var stories []Story
	if err := cursor.All(ctx, &stories); err != nil {
		http.Error(w, "Failed to decode stories", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stories)
}

func main() {
	connectMongo()

	http.HandleFunc("/stories", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			addStoryHandler(w, r)
		} else if r.Method == http.MethodGet {
			listStoriesHandler(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	log.Println("🚀 Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
