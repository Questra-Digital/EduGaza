package main

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Struct for a user record
type User struct {
	Name  string `bson:"name"`
	Email string `bson:"email"`
}

func main() {
	// Create Gin router
	r := gin.Default()

	// MongoDB connection details from environment variables
	mongoURI := "mongodb://mongo:27017"
	dbName := "userdb"
	collectionName := "users"

	// Connect to MongoDB
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		panic(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		panic(err)
	}

	collection := client.Database(dbName).Collection(collectionName)
	fmt.Println("Connected to MongoDB!")

	// Endpoint
	r.GET("/profile", func(c *gin.Context) {
		// Generate a random record
		user := User{
			Name:  fmt.Sprintf("User%d", rand.Intn(1000)),
			Email: fmt.Sprintf("user%d@example.com", rand.Intn(1000)),
		}

		// Insert into MongoDB
		_, err := collection.InsertOne(context.Background(), user)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to insert record"})
			return
		}

		c.JSON(200, gin.H{
			"message": "Hello, world!",
			"user":    user,
		})
	})

	// Run server
	r.Run(":8080")
}
