#!/bin/sh
echo "Waiting for database to be ready..."
sleep 5

echo "Running migrations..."
npx typeorm migration:run -d dist/data-source.js

echo "Starting application..."
node dist/main