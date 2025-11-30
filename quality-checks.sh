#!/bin/bash
set -e  # Exit on any error

echo "🔍 Running Quality Gates..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track failures
FAILED=0

echo ""
echo "═══════════════════════════════════════"
echo "  API Quality Checks (.NET)"
echo "═══════════════════════════════════════"

# 1. Dotnet format check
echo -e "${YELLOW}→ Checking code formatting...${NC}"
cd api/SaintsApi
if dotnet format --verify-no-changes; then
    echo -e "${GREEN}✓ Code formatting passed${NC}"
else
    echo -e "${RED}✗ Code formatting failed${NC}"
    FAILED=1
fi

# 2. Vulnerability scan
echo -e "${YELLOW}→ Scanning for vulnerable packages...${NC}"
if dotnet list package --vulnerable 2>&1 | grep -q "no vulnerable packages"; then
    echo -e "${GREEN}✓ No vulnerable packages found${NC}"
else
    echo -e "${RED}✗ Vulnerable packages detected${NC}"
    dotnet list package --vulnerable
    FAILED=1
fi

# 3. Run tests with coverage
echo -e "${YELLOW}→ Running tests with coverage...${NC}"
cd ../
if dotnet test --collect:"XPlat Code Coverage" --results-directory ./TestResults; then
    echo -e "${GREEN}✓ Tests passed${NC}"
    
    # Check coverage (optional - requires reportgenerator)
    # dotnet tool install -g dotnet-reportgenerator-globaltool
    # reportgenerator -reports:"./TestResults/**/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html
else
    echo -e "${RED}✗ Tests failed${NC}"
    FAILED=1
fi

cd ..

echo ""
echo "═══════════════════════════════════════"
echo "  UI Quality Checks (Angular)"
echo "═══════════════════════════════════════"

cd ui/saints-ui

# 4. Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}→ Installing dependencies...${NC}"
    npm ci
fi

# 5. ESLint
echo -e "${YELLOW}→ Running ESLint...${NC}"
if npm run lint; then
    echo -e "${GREEN}✓ Linting passed${NC}"
else
    echo -e "${RED}✗ Linting failed${NC}"
    FAILED=1
fi

# 6. Angular tests with coverage
echo -e "${YELLOW}→ Running Angular tests with coverage...${NC}"
if npm run test -- --watch=false --code-coverage --browsers=ChromeHeadless; then
    echo -e "${GREEN}✓ Angular tests passed${NC}"
    
    # Check coverage threshold (optional)
    COVERAGE_FILE="coverage/saints-ui/coverage-summary.json"
    if [ -f "$COVERAGE_FILE" ]; then
        # You can add coverage threshold checking here
        echo "Coverage report: coverage/saints-ui/index.html"
    fi
else
    echo -e "${RED}✗ Angular tests failed${NC}"
    FAILED=1
fi

# 7. npm audit
echo -e "${YELLOW}→ Checking for npm vulnerabilities...${NC}"
if npm audit --audit-level=high; then
    echo -e "${GREEN}✓ No high/critical vulnerabilities${NC}"
else
    echo -e "${RED}✗ High/critical vulnerabilities found${NC}"
    FAILED=1
fi

cd ../..

echo ""
echo "═══════════════════════════════════════"
echo "  Container Security Scan"
echo "═══════════════════════════════════════"

# 8. Trivy scan (if available)
if command -v trivy &> /dev/null; then
    echo -e "${YELLOW}→ Scanning Docker images with Trivy...${NC}"
    
    if docker images | grep -q "ghcr.io/arbobeck/saints-api"; then
        if trivy image --severity HIGH,CRITICAL ghcr.io/arbobeck/saints-api:latest; then
            echo -e "${GREEN}✓ API image scan passed${NC}"
        else
            echo -e "${RED}✗ API image has vulnerabilities${NC}"
            FAILED=1
        fi
    fi
else
    echo -e "${YELLOW}⚠ Trivy not installed - skipping container scan${NC}"
    echo "  Install: https://aquasecurity.github.io/trivy/latest/getting-started/installation/"
fi

echo ""
echo "═══════════════════════════════════════"
echo "  Quality Gate Summary"
echo "═══════════════════════════════════════"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All quality gates passed!${NC}"
    exit 0
else
    echo -e "${RED}✗ Quality gates failed${NC}"
    exit 1
fi