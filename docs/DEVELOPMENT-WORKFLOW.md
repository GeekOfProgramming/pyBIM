# pyBIM Development & Release Workflow

This document defines the permanent development, branching, release, and emergency recovery rules for the `pyBIM` repository (`GeekOfProgramming/pyBIM`).

---

## 1. Core Principles

1. **GitHub `main` is Authoritative**:
   - The `main` branch on GitHub is the single source of truth for all production code.
   - All feature and maintenance work originates from the latest `main`.
   - Direct pushes to `main` are restricted under repository governance; changes must land via validated Pull Requests.

2. **Single Local Checkout (`C:\bim`)**:
   - All development takes place directly in the root working directory: `C:\bim`.
   - **No new local Git worktrees** (`.worktrees/` is retired).
   - Only **one active task branch** is checked out at any given time.

3. **One Task = One Branch = One Pull Request**:
   - Every feature, fix, or maintenance package is implemented on a dedicated branch created from the latest `origin/main`.
   - Work packages are self-contained and committed entirely to the task branch.
   - Changes are merged into `main` exclusively through a GitHub Pull Request that passes all required CI checks.

4. **Linear, Auditable Commit History**:
   - Merge commits are prohibited on `main`.
   - Commits are merged using Squash & Merge (recommended for single-logical-change PRs) or Rebase & Merge.
   - Force-pushing (`git push --force`) and branch deletion on `main` are strictly blocked.

---

## 2. Standard Feature / Task Lifecycle

### Step 1: Synchronize Clean `main`
```bash
git checkout main
git fetch origin --prune
git pull origin main
```
Verify that the working tree contains no uncommitted tracked changes before branching.

### Step 2: Create a Dedicated Task Branch
Branch directly from up-to-date `origin/main`:
```bash
git checkout -b feature/your-feature-name-v1
# or: git checkout -b fix/your-fix-name-v1
# or: git checkout -b chore/your-task-name-v1
# or: git checkout -b ops/fix-XX-description
git push -u origin <branch-name>
```

### Step 3: Implement & Validate Locally
Perform your development, ensuring that:
- Code adheres to project patterns and TypeScript/ESM standards.
- Security tests pass cleanly:
  ```bash
  npm run test:security
  ```
- Local production build compiles cleanly:
  ```bash
  npm run build
  ```
- If testing in an appropriate Linux environment (or via GitHub Actions CI):
  ```bash
  npm run build:worker
  npx wrangler deploy --dry-run --config wrangler.production.jsonc
  ```

### Step 4: Verify Formatting & Clean Diffs
Ensure no accidental formatting or whitespace errors:
```bash
git diff --check
```

### Step 5: Commit & Push to GitHub
```bash
git add <files>
git commit -m "feat/fix/chore: descriptive message"
git push origin <branch-name>
```

### Step 6: Open a Pull Request into `main`
- Open a PR on GitHub targeting the `main` branch:
  ```bash
  gh pr create --title "type: summary" --body "..."
  ```
- Automated CI on GitHub Actions (`.github/workflows/pr-validation.yml`) triggers on every pull request targeting `main`.
- The required status check is:
  - **`Validate Pull Request (Linux)`**
- This check executes:
  1. Linux container execution (`ubuntu-latest`) on Node.js 22 LTS
  2. Clean dependency installation: `npm ci --include=dev`
  3. Security suite: `npm run test:security`
  4. Next.js + OpenNext Worker build: `npm run build:worker`
  5. Artifact integrity verification (`.open-next/worker.js` and `.open-next/assets`)
  6. Wrangler dry-run check: `npx wrangler deploy --dry-run --config wrangler.production.jsonc`
- **Important**: PR validation is strictly non-deploying and does not require or receive Cloudflare production secrets.

### Step 7: Merge Using Linear History
- Once `Validate Pull Request (Linux)` passes green and review approval is satisfied:
- Merge the PR into `main` using **Squash and merge** or **Rebase and merge**.
- Direct merge commits are blocked by Ruleset `24924121`.

### Step 8: Post-Merge Local Synchronization & Cleanup
```bash
git checkout main
git pull origin main
git branch -d <completed-branch-name>
git push origin --delete <completed-branch-name>
```

---

## 3. Production Deployment Architecture

1. **Automatic Production Deployment from `main`**:
   - Merging an approved PR into `main` automatically triggers production building and deployment via Cloudflare Builds, deploying directly to Worker `pybim` serving `https://www.pybim.com` and `https://www.pybim.it`.
   - The remote staging Worker (`pybim-staging`), staging token, and staging environment have been retired. The historical release branch (`release/pybim-public-v2`) remains preserved in the remote repository as an audited release reference.

2. **Wrangler Configuration Alignment**:
   - Both `wrangler.jsonc` (default) and `wrangler.production.jsonc` target the production Worker `pybim` identically with zero drift.
   - The Cloudflare Builds Deploy Command explicitly references `wrangler.production.jsonc`:
     ```bash
     npx wrangler deploy --config wrangler.production.jsonc
     ```

3. **Production Deployment Verification**:
   - Immediately following any merge to `main`, verify production health across both domains, following redirects to inspect the final response:
     ```bash
     curl -ILs -o /dev/null -w "%{http_code} %{url_effective}\n" https://www.pybim.com
     curl -ILs -o /dev/null -w "%{http_code} %{url_effective}\n" https://www.pybim.it
     ```
   - Check headers on the effective endpoints:
     ```bash
     curl -IL https://www.pybim.com
     curl -IL https://www.pybim.it
     ```
   - Confirm final HTTP 200 responses, verified security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`), and absence of 5xx errors. (Note: HSTS is scheduled for deployment in a dedicated security hardening task and is not yet active).

---

## 4. Emergency Hotfix & Recovery Procedures

In the event of an active production incident, pyBIM maintains two distinct, auditable recovery tracks:

### Track 1: Edge Runtime Rollback (Immediate Mitigation)
When a newly deployed Worker build introduces runtime exceptions or breaks critical user journeys:
1. **Do not wait for a full CI build and Git push cycle.**
2. Use Cloudflare Workers rollback via Wrangler CLI or Cloudflare Dashboard:
   ```bash
   # List recent production worker versions:
   npx wrangler versions list --config wrangler.production.jsonc

   # Roll back to the prior known-good version ID:
   npx wrangler rollback [VERSION_ID] --config wrangler.production.jsonc
   ```
3. Cloudflare shifts traffic back to the designated Worker version without rebuilding assets.
4. **Follow-Up**: After edge traffic is stabilized, proceed immediately to Track 2 to ensure the Git source code matches the active production state.

### Track 2: Git Source Revert & Hotfix (Root-Cause Remediation)
To synchronize Git repository history with the active rollback or apply an emergency hotfix:
1. **Create an Emergency Hotfix Branch**:
   ```bash
   git checkout -b hotfix/critical-incident-fix origin/main
   ```
2. **Apply Revert or Patch**:
   - For a clean revert:
     ```bash
     git revert <bad-commit-sha>
     ```
   - For an emergency patch: implement the minimal fix, ensuring `npm run test:security` passes.
3. **Emergency Bypass & Protection Policy**:
   - Production protection rules on `main` do not configure any standing bypass actors. Direct unvalidated pushes are consistently blocked.
   - In catastrophic scenarios where GitHub Actions CI is degraded or offline, the repository owner (`GeekOfProgramming`) can temporarily adjust ruleset enforcement or configure a documented, temporary bypass in repository settings to merge critical recovery fixes.
   - **Audit Requirement**: Any temporary administrative override must be documented in a post-incident retrospective with rationale, timestamp, and commit SHA.
   - Standard hotfixes should always traverse the Pull Request path whenever CI is operational to ensure automated verification.
4. **Deploy Verification**:
   - Monitor the Cloudflare Builds log for the resulting commit on `main`.
   - Execute production endpoint verification on both apex and localized domains following redirects.
