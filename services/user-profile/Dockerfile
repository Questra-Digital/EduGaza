# Use the official Go image as a builder
FROM golang:1.23-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy go.mod and go.sum if you have them (optional)
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the Go binary
RUN go build -o server .

# Use a minimal image for the final container
FROM alpine:latest

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/server .

# Expose port 8080
EXPOSE 8080

# Command to run the binary
CMD ["./server"]
