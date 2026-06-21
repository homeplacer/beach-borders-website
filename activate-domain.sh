#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Activate the custom domain for the Beach Borders site on GitHub Pages.
#
# RUN THIS ONLY AFTER the GoDaddy DNS records in DEPLOY-DOMAIN.md are saved and
# propagated (i.e. `dig +short beachborderscurbing.net` shows the 185.199.x.153
# GitHub IPs). Running it before DNS is pointed will briefly break the staging
# URL by redirecting it to a domain that still serves the old site.
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")"

DOMAIN="beachborderscurbing.net"
REPO="homeplacer/beach-borders-website"

# Safety check: confirm DNS is actually pointing at GitHub before we flip.
echo "Checking DNS for $DOMAIN ..."
ips="$(dig +short A "$DOMAIN" || true)"
if ! echo "$ips" | grep -q '185.199.10[89].153\|185.199.11[01].153'; then
  echo "✋ $DOMAIN is not pointing at GitHub Pages yet."
  echo "   Current A records: ${ips:-(none)}"
  echo "   Set the GoDaddy DNS records in DEPLOY-DOMAIN.md first, then re-run."
  exit 1
fi
echo "✓ DNS looks good: $ips"

# 1) Add the CNAME file (this is what tells GitHub Pages to serve the domain).
echo "$DOMAIN" > CNAME
git add CNAME
git commit -m "Point site at custom domain $DOMAIN" || echo "(CNAME already committed)"
git push origin main

# 2) Register the domain with the Pages API as well (belt and suspenders).
gh api -X PUT "/repos/$REPO/pages" -f cname="$DOMAIN" >/dev/null 2>&1 || true

# 3) Enforce HTTPS once the certificate is ready (retries for a few minutes).
echo "Waiting for HTTPS certificate to provision (this can take a few minutes)..."
for i in $(seq 1 20); do
  if gh api -X PUT "/repos/$REPO/pages" -F https_enforced=true >/dev/null 2>&1; then
    echo "✓ HTTPS enforced."
    break
  fi
  sleep 15
done

echo ""
echo "🎉 Done. https://$DOMAIN now serves the new site."
echo "   If you see a 'not secure' warning, give the certificate a few more minutes."
