#!/bin/sh
# Pre-commit hook for sergiomarquez.dev portfolio
# Place this file in .git/hooks/pre-commit and make it executable
# chmod +x .git/hooks/pre-commit

echo "🔍 Running pre-commit validation for sergiomarquez.dev..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_status $RED "❌ npm not found. Please install Node.js and npm."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status $YELLOW "📦 Installing dependencies..."
    npm ci
fi

# Run TypeScript check
print_status $YELLOW "🔍 Running TypeScript validation..."
if ! npm run type-check; then
    print_status $RED "❌ TypeScript validation failed. Please fix the errors before committing."
    exit 1
fi

# Run ESLint (usando prettier como linter)
print_status $YELLOW "🧹 Running ESLint validation..."
if ! npm run lint:eslint; then
    print_status $YELLOW "⚠️ ESLint found issues. Attempting auto-fix..."
    npm run lint:eslint:fix

    # Check if auto-fix resolved all issues
    if ! npm run lint:eslint; then
        print_status $RED "❌ ESLint issues remain after auto-fix. Please resolve manually."
        exit 1
    else
        print_status $GREEN "✅ ESLint issues auto-fixed successfully."
        # Add the fixed files to the commit
        git add .
    fi
fi

# Run Prettier check
print_status $YELLOW "💄 Checking code formatting..."
if ! npm run format:check; then
    print_status $YELLOW "⚠️ Code formatting issues found. Auto-formatting..."
    npm run format

    # Add the formatted files to the commit
    git add .
    print_status $GREEN "✅ Code formatting applied."
fi

# Security audit (non-blocking, just warning)
print_status $YELLOW "🔒 Running security audit..."
if ! npm audit --audit-level=moderate; then
    print_status $YELLOW "⚠️ Security vulnerabilities found. Consider running 'npm audit fix'."
    print_status $YELLOW "ℹ️ This is not blocking the commit, but should be addressed."
fi

# Build test (quick validation)
print_status $YELLOW "🏗️ Testing build process..."
if ! npm run build; then
    print_status $RED "❌ Build failed. Please fix the build errors before committing."
    exit 1
fi

print_status $GREEN "✅ All pre-commit checks passed!"
print_status $GREEN "🚀 Proceeding with commit..."

exit 0
