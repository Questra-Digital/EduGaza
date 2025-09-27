package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    // Set the response content type
    w.Header().Set("Content-Type", "text/plain")
    // Write response
    fmt.Fprintln(w, "Hello, world!")
}

func main() {
    // Register the handler function for the "/hello" endpoint
    http.HandleFunc("/profile", helloHandler)

    // Start the HTTP server on port 8080
    fmt.Println("Server is running on http://localhost:8080")
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        fmt.Println("Error starting server:", err)
    }
}
