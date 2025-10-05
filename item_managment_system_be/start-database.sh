#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`

DB_CONTAINER_NAME="item_managment_system_be-postgres"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

# Use a different port to avoid conflicts with other PostgreSQL containers
DB_PORT=5433
DATABASE_PASSWORD="password"

# Check if .env file exists and load it
if [ -f .env ]; then
  set -a
  source .env
  # Override with .env values if they exist
  if [ ! -z "$DATABASE_PORT" ]; then
    DB_PORT="$DATABASE_PORT"
  fi
  if [ ! -z "$DATABASE_PASSWORD" ]; then
    DATABASE_PASSWORD="$DATABASE_PASSWORD"
  fi
fi

if [ "$DATABASE_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please change the default password in the .env file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  DATABASE_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  if [ -f .env ]; then
    sed -i -e "s#DATABASE_PASSWORD=.*#DATABASE_PASSWORD=$DATABASE_PASSWORD#" .env
  fi
fi

docker run -d \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER="postgres" \
  -e POSTGRES_PASSWORD="$DATABASE_PASSWORD" \
  -e POSTGRES_DB=item_managment_system \
  -p "$DB_PORT":5432 \
  pgvector/pgvector:pg17 && echo "Database container '$DB_CONTAINER_NAME' was successfully created"
