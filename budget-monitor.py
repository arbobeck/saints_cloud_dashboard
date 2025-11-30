#!/usr/bin/env python3
"""
Budget Monitor - Simulates Azure cost monitoring
Demonstrates budget awareness and cost governance skills
"""

import json
import sys
from datetime import datetime
from pathlib import Path

# ANSI color codes
RED = '\033[0;31m'
YELLOW = '\033[1;33m'
GREEN = '\033[0;32m'
NC = '\033[0m'  # No Color

def load_budget_config(config_path='budget.json'):
    """Load budget configuration"""
    try:
        with open(config_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"{RED}✗ budget.json not found{NC}")
        sys.exit(1)

def check_budget(config):
    """Check if spending is within budget thresholds"""
    current_spend = config['current_spend']
    monthly_budget = config['monthly_budget']
    thresholds = config['thresholds']
    
    percentage = (current_spend / monthly_budget) * 100
    
    print("=" * 60)
    print("  BUDGET MONITORING REPORT")
    print("=" * 60)
    print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Monthly Budget: ${monthly_budget:,.2f}")
    print(f"Current Spend: ${current_spend:,.2f}")
    print(f"Percentage Used: {percentage:.1f}%")
    print(f"Remaining: ${monthly_budget - current_spend:,.2f}")
    print("=" * 60)
    
    # Check thresholds
    status = "OK"
    if percentage >= thresholds['critical']:
        print(f"{RED}🚨 CRITICAL: Budget at {percentage:.1f}%!{NC}")
        print(f"{RED}   Action required immediately!{NC}")
        status = "CRITICAL"
    elif percentage >= thresholds['warning']:
        print(f"{YELLOW}⚠️  WARNING: Budget at {percentage:.1f}%{NC}")
        print(f"{YELLOW}   Consider cost optimization{NC}")
        status = "WARNING"
    else:
        print(f"{GREEN}✓ Budget healthy at {percentage:.1f}%{NC}")
    
    # Service breakdown
    if 'services' in config:
        print("\nService Breakdown:")
        print("-" * 60)
        for service, cost in config['services'].items():
            pct = (cost / current_spend) * 100 if current_spend > 0 else 0
            print(f"  {service:.<40} ${cost:>8,.2f} ({pct:>5.1f}%)")
    
    print("=" * 60)
    
    return status

def main():
    """Main execution"""
    config_path = Path(__file__).parent / 'budget.json'
    config = load_budget_config(config_path)
    
    status = check_budget(config)
    
    # Exit with appropriate code
    if status == "CRITICAL":
        sys.exit(2)
    elif status == "WARNING":
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()