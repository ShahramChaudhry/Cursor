#!/bin/bash

echo "🚀 Starting سبLess - Because Less is More"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   You can start it with: brew services start mongodb-community"
    echo "   Or install it with: brew install mongodb-community"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client && npm install --legacy-peer-deps && cd ..
fi

# Create config.env if it doesn't exist
if [ ! -f "config.env" ]; then
    echo "⚙️  Creating config.env file..."
    cp config.env.example config.env 2>/dev/null || echo "Please create config.env file manually"
fi

echo "🌍 Starting development servers..."
echo "   Backend: http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo ""

# Start the development servers
npm run dev
