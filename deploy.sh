#!/bin/bash
set -e

echo "Deploying Byzantica..."

# Build and push API
echo "Building API..."
cd api
docker build -t ghcr.io/arbobeck/saints-api:latest .
docker push ghcr.io/arbobeck/saints-api:latest
cd ..

# Build Angular
echo "Building Angular..."
cd ui/saints-ui
npm ci
npm run build -- --configuration=production
cd ../..

echo "Build complete! Now:"
echo "1. Deploy API image to Render"
echo "2. Run migrations: dotnet ef database update"
echo "3. Deploy Angular to Netlify"
echo "4. Configure DNS"