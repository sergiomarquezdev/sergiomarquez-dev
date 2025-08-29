#!/bin/bash
# setup-dev-environment.sh
# Script para configurar el entorno de desarrollo completo para sergiomarquez.dev

echo "🚀 Configurando entorno de desarrollo para sergiomarquez.dev portfolio..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_status $RED "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
print_status $YELLOW "📦 Installing dependencies..."
npm ci

# Setup pre-commit hook
print_status $YELLOW "🔧 Setting up pre-commit hook..."
if [ -f ".git/hooks/pre-commit" ]; then
    print_status $YELLOW "⚠️ Pre-commit hook already exists. Backing up..."
    mv .git/hooks/pre-commit .git/hooks/pre-commit.backup.$(date +%s)
fi

cp scripts/pre-commit-hook.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
print_status $GREEN "✅ Pre-commit hook installed"

# Run initial validation
print_status $YELLOW "🔍 Running initial validation..."
npm run validate

if [ $? -eq 0 ]; then
    print_status $GREEN "✅ Initial validation passed"
else
    print_status $YELLOW "⚠️ Validation issues found. Attempting auto-fix..."
    npm run lint:fix
    npm run format

    print_status $YELLOW "🔍 Re-running validation..."
    npm run validate

    if [ $? -eq 0 ]; then
        print_status $GREEN "✅ Issues fixed successfully"
    else
        print_status $RED "❌ Some issues require manual attention"
        exit 1
    fi
fi

# Test build
print_status $YELLOW "🏗️ Testing build process..."
npm run build

if [ $? -eq 0 ]; then
    print_status $GREEN "✅ Build test successful"
else
    print_status $RED "❌ Build test failed"
    exit 1
fi

print_status $GREEN "🎉 Development environment setup complete!"
echo ""
print_status $GREEN "✅ Available commands:"
echo "  • npm run dev          - Start development server"
echo "  • npm run build        - Build for production"
echo "  • npm run preview      - Preview production build"
echo "  • npm run validate     - Run all quality checks"
echo "  • npm run lint:fix     - Auto-fix linting issues"
echo "  • npm run format       - Auto-format code"
echo ""
print_status $GREEN "🤖 Automated features configured:"
echo "  • Pre-commit validation hooks"
echo "  • GitHub Actions CI/CD pipeline"
echo "  • Google AdSense + CMP integration"
echo "  • Automated dependency updates (Dependabot)"
echo "  • Health monitoring (every 6 hours)"
echo "  • Auto-fix workflow (on CI failures)"
echo "  • Cloudflare Pages auto-deployment"
echo ""
print_status $YELLOW "💡 Tips:"
echo "  • Pre-commit hook will auto-fix most issues"
echo "  • GitHub Actions will validate all changes"
echo "  • Health monitor will alert if site goes down"
echo "  • Run 'npm run validate' before major commits"
