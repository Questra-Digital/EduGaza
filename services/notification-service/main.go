package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Notification represents a simple notification structure
type Notification struct {
	ID      string `json:"id"`
	Message string `json:"message"`
}

var collection *mongo.Collection

// handler for GET /notifications
func getNotifications(w http.ResponseWriter, r *http.Request) {
	// Create a random notification
	notification := Notification{
		ID:      fmt.Sprintf("%d", rand.Intn(100000)),
		Message: fmt.Sprintf("Random notification %d", rand.Intn(1000)),
	}

	// Insert into MongoDB
	_, err := collection.InsertOne(context.TODO(), notification)
	if err != nil {
		http.Error(w, "❌ Failed to insert notification", http.StatusInternalServerError)
		return
	}

	// Respond with JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(notification)
}

func main() {
	// Seed random numbers
	rand.Seed(time.Now().UnixNano())

	// Get MongoDB URI from env (set in docker-compose)
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://mongo:27017/notificationsdb"
	}

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("❌ MongoDB connection error: %v", err)
	}

	// Choose database + collection
	collection = client.Database("notificationsdb").Collection("notifications")

	// Setup route
	http.HandleFunc("/notifications", getNotifications)

	log.Println("🚀 Notification Service is running on port 4000...")
	if err := http.ListenAndServe(":4000", nil); err != nil {
		log.Fatalf("❌ Error starting server: %v", err)
	}
}
