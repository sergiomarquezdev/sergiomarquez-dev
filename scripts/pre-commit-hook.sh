#!/bin/sh
# Simple pre-commit hook for sergiomarquez.dev

echo "🔍 Pre-commit validation..."

# TypeScript check
bun run type-check || exit 1

# Lint check
bun run lint || exit 1

echo "✅ Validation passed"
        print_status $GREEN "✅ Biome issues auto-fixed successfully."
        # Add the fixed files to the commit
        git add .
    fi
fi

# Security audit (non-blocking, just warning) - using npm as Bun doesn't have audit yet
print_status $YELLOW "🔒 Running security audit..."
if ! npm audit --audit-level=moderate; then
    print_status $YELLOW "⚠️ Security vulnerabilities found. Consider running 'npm audit fix' (Bun compatible)."
    print_status $YELLOW "ℹ️ This is not blocking the commit, but should be addressed."
fi

# Build test (quick validation)
print_status $YELLOW "🏗️ Testing build process..."
if ! bun run build; then
    print_status $RED "❌ Build failed. Please fix the build errors before committing."
    exit 1
fi

print_status $GREEN "✅ All pre-commit checks passed!"
print_status $GREEN "🚀 Proceeding with commit..."

exit 0
