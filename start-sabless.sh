#!/bin/bash

# سبLess Startup Script
echo "🪶 سبLess — Because Less is More"
echo "================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}📋 Step $1:${NC} $2"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Kill any existing processes
print_step "1" "Killing existing processes..."
pkill -f "npm start" 2>/dev/null || true
pkill -f "node server" 2>/dev/null || true
pkill -f "nodemon" 2>/dev/null || true
pkill -f "react-scripts" 2>/dev/null || true
sleep 2
print_success "Existing processes killed"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Install dependencies if needed
print_step "2" "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    print_warning "Installing dependencies..."
    npm install --legacy-peer-deps
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_success "Dependencies already installed"
fi

# Install client dependencies if needed
if [ ! -d "client/node_modules" ]; then
    print_warning "Installing client dependencies..."
    cd client && npm install --legacy-peer-deps && cd ..
    if [ $? -eq 0 ]; then
        print_success "Client dependencies installed"
    else
        print_error "Failed to install client dependencies"
        exit 1
    fi
else
    print_success "Client dependencies already installed"
fi

# Start backend server
print_step "3" "Starting backend server..."
node server/index.js &
BACKEND_PID=$!
sleep 3

# Check if backend is running
if curl -s http://localhost:5000/api/health > /dev/null; then
    print_success "Backend server running on http://localhost:5000"
else
    print_error "Backend server failed to start"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# Start frontend server
print_step "4" "Starting frontend server..."
cd client && npm start &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
print_warning "Waiting for frontend to start (this may take a moment)..."
sleep 10

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null; then
    print_success "Frontend server running on http://localhost:3000"
else
    print_warning "Frontend server may still be starting..."
    print_warning "Please wait a moment and check http://localhost:3000"
fi

echo ""
print_success "سبLess is now running!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo ""
echo "📱 Features available:"
echo "   • Landing page with product story"
echo "   • Interactive demo mode"
echo "   • Subscription management"
echo "   • Responsive design (mobile & desktop)"
echo "   • Arabic/English language toggle"
echo "   • Pricing plans page"
echo ""
echo "🎮 To run the demo script:"
echo "   ./demo.sh"
echo ""
echo "📱 To test responsive design:"
echo "   ./test-responsive.sh"
echo ""
echo "🛑 To stop the servers:"
echo "   Press Ctrl+C or run: pkill -f 'npm start' && pkill -f 'node server'"
echo ""

# Keep script running
print_warning "Servers are running in the background..."
print_warning "Press Ctrl+C to stop all servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    print_warning "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    pkill -f "npm start" 2>/dev/null || true
    pkill -f "node server" 2>/dev/null || true
    print_success "Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
while true; do
    sleep 1
done
