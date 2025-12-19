#!/bin/bash
echo "Deploying backend application..."
echo "Resetting backend codebase..."
./reset_homecenter.sh

sudo chmod +x ./*
sudo chmod +x ./../mvnw

echo "Cleaning system logs..."
./clean_logs.sh

echo "Building backend application..."
./build_package.sh

echo "Stopping existing backend service..." 
./stop_homecenter.sh
./clean_logs.sh

echo "Starting backend service..." 
./setup_homecenter.sh
./start_homecenter.sh

echo "Backend deployment completed."
./open_logs.sh