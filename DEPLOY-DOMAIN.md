# Pointing beachborderscurbing.net at the new site

The new site is live on GitHub Pages at **https://homeplacer.github.io/beach-borders-website/**.
This guide flips the real domain over to it. Domain is registered & DNS-managed at **GoDaddy**.

> ⚠️ **Order matters.** Set the DNS records at GoDaddy **first**. Only after that do we run the
> activate step. Doing it the other way around briefly sends visitors to a dead page. The current
> staging URL keeps working until the very last step.

---

## Step 1 — Change DNS at GoDaddy

Log in to GoDaddy → **My Products → Domains → beachborderscurbing.net → DNS / Manage DNS**.

You're replacing the records that currently point to the old GoHighLevel host.

### A) Apex domain (`beachborderscurbing.net`)
**Delete** the existing `A` record (currently `162.159.140.166`) and add these **four A records**.
Each one: Type `A`, Name `@`, Value as below, TTL 600 (or 1 hour).

| Type | Name | Value |
|------|------|-------------------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

*(Optional but nice — IPv6. Add these four `AAAA` records, Name `@`:)*

| Type | Name | Value |
|------|------|----------------------|
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |

### B) www (`www.beachborderscurbing.net`)
**Edit** the existing `www` record (currently a CNAME to `sites.ludicrous.cloud`) so it points to GitHub:

| Type | Name | Value |
|-------|------|------------------------|
| CNAME | www | homeplacer.github.io |

Save everything. DNS usually updates within a few minutes (GoDaddy can take up to an hour).

### Check it propagated
Run this in Terminal — when the apex shows the `185.199.x.153` GitHub IPs, you're ready for Step 2:
```bash
dig +short beachborderscurbing.net
dig +short www.beachborderscurbing.net
```

---

## Step 2 — Activate (one command)

Once `dig` shows the GitHub IPs, run:
```bash
/Users/spencer/beach-borders-website/activate-domain.sh
```
This adds the `CNAME` file, pushes, tells GitHub the domain, and turns on HTTPS.
(Or just tell Claude "flip the domain now" and it'll run it.)

After this, **https://beachborderscurbing.net** serves the new site, `www` redirects to it, and the
old `homeplacer.github.io/...` staging link redirects to the real domain. The free HTTPS certificate
can take a few minutes to issue — a "not secure" warning right after activation is normal and clears itself.

---

## Optional: lock the domain to this account (prevents takeovers)
In GitHub → your avatar → **Settings → Pages → "Add a domain"** → enter `beachborderscurbing.net`.
GitHub gives you a `TXT` record (`_github-pages-challenge-homeplacer`) to add at GoDaddy. Nice-to-have, not required.

## Rolling back
To return to the old site, just restore the original GoDaddy DNS records (apex `A` → `162.159.140.166`,
`www` CNAME → `sites.ludicrous.cloud`).
