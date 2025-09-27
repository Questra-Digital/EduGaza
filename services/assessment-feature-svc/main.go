
package main

import (
	"fmt"
	"log"
	"net/http"
)

// handler for root path
func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "🚀 Assessment Service is running!")
}

func main() {
	http.HandleFunc("/", helloHandler)

	fmt.Println("✅ Server started on http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
