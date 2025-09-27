package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// Notification represents a simple notification structure
type Notification struct {
	ID      string `json:"id"`
	Message string `json:"message"`
}

// handler for GET /notifications
func getNotifications(w http.ResponseWriter, r *http.Request) {
	// Example dummy notifications
	notifications := []Notification{
		{ID: "1", Message: "Welcome to Edu-Gaza Notification Service!"},
		{ID: "2", Message: "Your class starts at 10 AM."},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(notifications)
}

func main() {
	http.HandleFunc("/notifications", getNotifications)

	log.Println("🚀 Notification Service is running on port 4000...")
	if err := http.ListenAndServe(":4000", nil); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
