package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Story struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

func storyHandler(w http.ResponseWriter, r *http.Request) {
	story := Story{
		ID:      "1",
		Title:   "My First Story",
		Content: "This is a sample story served from Go!",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(story)
}

func main() {
	http.HandleFunc("/story", storyHandler)

	log.Println("Server running at http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
