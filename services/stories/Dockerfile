FROM golang:1.23-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

# Copy only the source file(s)
COPY main.go .

# Build the Go binary
RUN go build -o main main.go

EXPOSE 8080
CMD ["./main"]
