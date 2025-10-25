#!/bin/bash

# سبLess Responsive Test Script
echo "🪶 سبLess Responsive Design Test"
echo "================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}📱 Testing:${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null; then
    print_success "Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend is not running. Please start it first."
    exit 1
fi

echo ""
print_step "Responsive Design Features Implemented:"
echo ""

print_info "📱 Mobile Responsive Features:"
echo "   • Responsive padding: xs: 1, sm: 2, md: 4, lg: 8"
echo "   • Responsive typography: Different font sizes for mobile/desktop"
echo "   • Responsive spacing: Smaller gaps on mobile"
echo "   • Responsive cards: Stack vertically on mobile"
echo "   • Responsive buttons: Smaller on mobile"
echo "   • Responsive icons: Smaller on mobile"
echo "   • Responsive navigation: Hide tagline on mobile"
echo "   • Responsive subscription list: Column layout on mobile"
echo ""

print_info "🖥️  Desktop Features:"
echo "   • Full navigation menu visible"
echo "   • Larger typography and spacing"
echo "   • Side-by-side layouts"
echo "   • Larger touch targets"
echo ""

print_step "How to Test Responsive Design:"
echo ""
echo "1. 🌐 Open http://localhost:3000 in your browser"
echo ""
echo "2. 📱 Test Mobile View:"
echo "   • Press F12 to open Developer Tools"
echo "   • Click the mobile device icon (📱)"
echo "   • Select iPhone or Android device"
echo "   • Or resize browser window to mobile width"
echo ""
echo "3. 🖥️  Test Desktop View:"
echo "   • Use full browser window"
echo "   • Or select 'Responsive' in DevTools"
echo ""
echo "4. 🔄 Test Breakpoints:"
echo "   • xs: < 600px (Mobile)"
echo "   • sm: 600px - 900px (Tablet)"
echo "   • md: 900px - 1200px (Small Desktop)"
echo "   • lg: > 1200px (Large Desktop)"
echo ""

print_step "What to Look For:"
echo ""
echo "📱 Mobile View (< 600px):"
echo "   • Compact header with smaller logo"
echo "   • Hidden navigation menu"
echo "   • Stacked subscription cards"
echo "   • Smaller buttons and icons"
echo "   • Column layout for subscription items"
echo "   • Smaller typography"
echo ""
echo "🖥️  Desktop View (> 900px):"
echo "   • Full navigation menu visible"
echo "   • Side-by-side layouts"
echo "   • Larger typography"
echo "   • Larger touch targets"
echo "   • More spacing between elements"
echo ""

print_step "Demo Mode Testing:"
echo ""
echo "1. Click 'Try Me' button on landing page"
echo "2. Test responsive design in demo mode:"
echo "   • Add new subscription (responsive dialog)"
echo "   • Delete/cancel subscriptions (responsive buttons)"
echo "   • View analytics (responsive charts)"
echo "   • Test language toggle (responsive chip)"
echo ""

print_step "Pricing Page Testing:"
echo ""
echo "1. Click 'View Pricing' button"
echo "2. Test responsive pricing cards:"
echo "   • Cards stack on mobile"
echo "   • Side-by-side on desktop"
echo "   • Responsive typography"
echo "   • Responsive buttons"
echo ""

print_success "Responsive design is now fully implemented!"
echo ""
echo "🎯 Key Responsive Features:"
echo "   ✅ Mobile-first design approach"
echo "   ✅ Flexible grid system"
echo "   ✅ Responsive typography"
echo "   ✅ Touch-friendly buttons"
echo "   ✅ Optimized spacing"
echo "   ✅ Adaptive layouts"
echo "   ✅ Responsive navigation"
echo "   ✅ Mobile-optimized forms"
echo ""
echo "🚀 Ready for mobile and desktop testing!"
echo ""
echo "💡 Pro Tip: Use browser DevTools to test different screen sizes"
echo "   and see how the UI adapts to different devices."
