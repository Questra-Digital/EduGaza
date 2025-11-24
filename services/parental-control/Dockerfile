FROM golang:1.24-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum first
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the code
COPY . .

RUN go build -o parental-control

# Runtime stage
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/parental-control .

EXPOSE 8085
CMD ["./parental-control"]
