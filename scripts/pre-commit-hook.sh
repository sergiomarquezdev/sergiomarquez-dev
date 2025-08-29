#!/bin/sh
# Pre-commit hook for portfolio project
# Lightweight validation without over-engineering

echo "🔍 Running pre-commit validations..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo "${RED}❌ $1${NC}"
}

# 1. TypeScript Check
echo "🔍 Checking TypeScript..."
if npm run type-check; then
    print_status "TypeScript check passed"
else
    print_error "TypeScript check failed"
    exit 1
fi

# 2. Prettier format check
echo "🎨 Checking code formatting..."
if npm run format:check; then
    print_status "Code formatting is correct"
else
    print_warning "Formatting issues found. Auto-fixing..."
    npm run format
    git add .
    print_status "Code formatted and staged"
fi

# 3. Build test
echo "🏗️  Testing build..."
if npm run build; then
    print_status "Build successful"
else
    print_error "Build failed"
    exit 1
fi

# 4. Security audit (non-blocking)
echo "🔒 Running security audit..."
if npm audit --audit-level=high; then
    print_status "No high severity vulnerabilities found"
else
    print_warning "Security vulnerabilities detected. Please review after commit."
fi

print_status "All pre-commit checks passed! ✨"
exit 0
