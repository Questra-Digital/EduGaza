FROM golang:1.23-alpine

WORKDIR /app

# Copy only the source file(s)
COPY main.go .

# Build the Go binary
RUN go build -o main main.go

EXPOSE 8080
CMD ["./main"]
