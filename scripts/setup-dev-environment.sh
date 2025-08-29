#!/bin/bash
# Setup development environment for portfolio project

echo "🚀 Setting up development environment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Install dependencies
print_info "Installing dependencies..."
npm install

# Setup pre-commit hook
print_info "Setting up pre-commit hook..."
if [ -d ".git" ]; then
    cp scripts/pre-commit-hook.sh .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    print_status "Pre-commit hook installed"
else
    print_info "Not a git repository, skipping pre-commit hook setup"
fi

# Validate setup
print_info "Validating setup..."
npm run validate

print_status "Development environment setup complete! 🎉"
print_info "You can now use:"
print_info "  npm run dev     - Start development server"
print_info "  npm run build   - Build for production"
print_info "  npm run validate - Run all validations"
