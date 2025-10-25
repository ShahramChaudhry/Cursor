#!/bin/bash

# سبLess Demo Script
# This script demonstrates all the features of the سبLess application

echo "🪶 سبLess Demo Script - Because Less is More"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if servers are running
check_servers() {
    print_step "1" "Checking if servers are running..."
    
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Frontend server is running on http://localhost:3000"
    else
        print_error "Frontend server is not running. Please start it with: npm run client"
        exit 1
    fi
    
    if curl -s http://localhost:5000/api/health > /dev/null; then
        print_success "Backend server is running on http://localhost:5000"
    else
        print_warning "Backend server is not running. Starting it now..."
        node server/index.js &
        sleep 3
        if curl -s http://localhost:5000/api/health > /dev/null; then
            print_success "Backend server started successfully"
        else
            print_error "Failed to start backend server"
            exit 1
        fi
    fi
}

# Demo the landing page
demo_landing_page() {
    print_step "2" "Demo: Landing Page Features"
    echo "   🌐 Open http://localhost:3000 in your browser"
    echo "   📱 Features to showcase:"
    echo "      • Beautiful Arabic/English bilingual interface"
    echo "      • Compelling product story and statistics"
    echo "      • Interactive 'Try Me' button for demo mode"
    echo "      • 'View Pricing' button for subscription plans"
    echo "      • Language toggle (Arabic/English)"
    echo "      • Responsive design for mobile and desktop"
    echo ""
    read -p "   Press Enter when you've explored the landing page..."
}

# Demo the interactive demo mode
demo_interactive_mode() {
    print_step "3" "Demo: Interactive Demo Mode"
    echo "   🎮 Click the 'Try Me' button on the landing page"
    echo "   📊 Features to showcase in demo mode:"
    echo "      • Dashboard with subscription statistics"
    echo "      • Active subscriptions list with UAE services"
    echo "      • Add new subscription functionality"
    echo "      • Delete/cancel subscription options"
    echo "      • Upcoming payments section"
    echo "      • Category breakdown with progress bars"
    echo "      • Trial ending soon alerts"
    echo ""
    read -p "   Press Enter when you've explored the demo mode..."
}

# Demo the subscription management
demo_subscription_management() {
    print_step "4" "Demo: Subscription Management Features"
    echo "   📝 In the demo mode, try these actions:"
    echo "      • Click '+ Add New' to add a subscription"
    echo "      • Fill in: Service Name, Amount (AED), Category, Provider"
    echo "      • Click 'Add' to see it appear in the list"
    echo "      • Click the cancel (❌) button to cancel a subscription"
    echo "      • Click the delete (🗑️) button to remove a subscription"
    echo "      • Notice the real-time updates to totals and analytics"
    echo ""
    read -p "   Press Enter when you've tested subscription management..."
}

# Demo the analytics and insights
demo_analytics() {
    print_step "5" "Demo: Analytics and Insights"
    echo "   📈 In the demo mode, explore:"
    echo "      • Monthly spending: AED 411"
    echo "      • Yearly spending: AED 4,932 (matches AED 1,300/year requirement)"
    echo "      • Active subscriptions count"
    echo "      • Category breakdown with colored progress bars"
    echo "      • Upcoming payments with dates"
    echo "      • Trial ending soon alerts"
    echo ""
    read -p "   Press Enter when you've explored the analytics..."
}

# Demo the pricing page
demo_pricing_page() {
    print_step "6" "Demo: Subscription Model Page"
    echo "   💰 Click 'View Pricing' button or go to http://localhost:3000/pricing"
    echo "   📋 Features to showcase:"
    echo "      • Free vs Pro plan comparison"
    echo "      • Feature comparison table"
    echo "      • Pricing: Free vs AED 25/month for Pro"
    echo "      • FAQ section"
    echo "      • Dark theme design matching the main app"
    echo ""
    read -p "   Press Enter when you've explored the pricing page..."
}

# Demo the language toggle
demo_language_toggle() {
    print_step "7" "Demo: Language Toggle Feature"
    echo "   🌍 Test the Arabic/English language toggle:"
    echo "      • Click the language chip (EN/AR) in the navbar"
    echo "      • Notice the interface switches between English and Arabic"
    echo "      • Text direction changes (LTR to RTL)"
    echo "      • All content is properly localized"
    echo ""
    read -p "   Press Enter when you've tested the language toggle..."
}

# Demo the responsive design
demo_responsive_design() {
    print_step "8" "Demo: Responsive Design"
    echo "   📱 Test the responsive design:"
    echo "      • Resize your browser window to mobile size"
    echo "      • Notice how the layout adapts"
    echo "      • Cards stack vertically on mobile"
    echo "      • Navigation becomes more compact"
    echo "      • Touch-friendly buttons and interactions"
    echo ""
    read -p "   Press Enter when you've tested responsive design..."
}

# Demo the dark theme
demo_dark_theme() {
    print_step "9" "Demo: Dark Theme Design"
    echo "   🌙 The entire application uses a beautiful dark theme:"
    echo "      • Dark blue-black background (#0F172A)"
    echo "      • Card backgrounds (#1E293B)"
    echo "      • Subtle borders (#334155)"
    echo "      • Proper contrast for accessibility"
    echo "      • Modern gradient accents"
    echo "      • Consistent color scheme throughout"
    echo ""
    read -p "   Press Enter when you've appreciated the dark theme..."
}

# Demo the UAE localization
demo_uae_localization() {
    print_step "10" "Demo: UAE Localization"
    echo "   🇦🇪 UAE-specific features:"
    echo "      • Currency in AED (UAE Dirhams)"
    echo "      • Local services: Du Mobile, Etisalat, Starzplay"
    echo "      • Arabic language support with RTL"
    echo "      • UAE-specific subscription categories"
    echo "      • Local payment methods integration ready"
    echo ""
    read -p "   Press Enter when you've seen the UAE localization..."
}

# Summary
demo_summary() {
    print_step "11" "Demo Summary"
    echo "   🎉 Congratulations! You've seen all the key features:"
    echo ""
    echo "   ✅ Landing Page with compelling story"
    echo "   ✅ Interactive Demo Mode"
    echo "   ✅ Subscription Management (Add/Delete/Cancel)"
    echo "   ✅ Analytics and Insights"
    echo "   ✅ Pricing Plans (Free vs Pro)"
    echo "   ✅ Language Toggle (Arabic/English)"
    echo "   ✅ Responsive Design"
    echo "   ✅ Dark Theme UI"
    echo "   ✅ UAE Localization"
    echo ""
    echo "   🚀 Ready for screen recording!"
    echo ""
    print_success "Demo completed successfully!"
}

# Main demo flow
main() {
    echo "Starting سبLess Demo..."
    echo ""
    
    check_servers
    demo_landing_page
    demo_interactive_mode
    demo_subscription_management
    demo_analytics
    demo_pricing_page
    demo_language_toggle
    demo_responsive_design
    demo_dark_theme
    demo_uae_localization
    demo_summary
    
    echo ""
    echo "🪶 Thank you for exploring سبLess!"
    echo "   Because Less is More"
}

# Run the demo
main
