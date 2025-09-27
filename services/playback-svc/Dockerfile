# Start from the official Go image
FROM golang:1.23-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Download dependencies first (better caching)
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build binary
RUN go build -o server main.go

# Final lightweight image
FROM alpine:latest
WORKDIR /root/

# Copy binary from builder stage
COPY --from=builder /app/server .

# Expose port
EXPOSE 8080

# Run the binary
CMD ["./server"]
