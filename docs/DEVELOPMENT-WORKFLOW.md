# pyBIM Development & Release Workflow

This document defines the permanent development, branching, and release rules for the `pyBIM` repository (`GeekOfProgramming/pyBIM`).

---

## 1. Core Principles

1. **GitHub `main` is Authoritative**:
   - The `main` branch on GitHub is the single source of truth for the codebase.
   - All feature and maintenance work originates from the latest `main`.

2. **Single Local Checkout (`C:\bim`)**:
   - All development takes place directly in the root working directory: `C:\bim`.
   - **No new local Git worktrees** (`.worktrees/` is retired).
   - Only **one active task branch** is checked out at any given time.

3. **One Task = One Branch = One Pull Request**:
   - Every feature, fix, or maintenance package is implemented on a dedicated branch created from the updated `main`.
   - Work packages are self-contained and committed entirely to the task branch.
   - Changes are merged into `main` exclusively through a GitHub Pull Request.

---

## 2. Standard Feature / Task Lifecycle

### Step 1: Start from Clean `main`
```bash
git checkout main
git pull origin main
```

### Step 2: Create a Dedicated Task Branch
```bash
git checkout -b feature/your-feature-name-v1
# or: git checkout -b fix/your-fix-name-v1
# or: git checkout -b chore/your-task-name-v1
git push -u origin <branch-name>
```

### Step 3: Implement & Validate Locally
Perform your development, ensuring that:
- Code adheres to project patterns and TypeScript/ESM standards.
- Security tests pass:
  ```bash
  npm run test:security
  ```
- Local production build compiles cleanly:
  ```bash
  npm run build
  ```

### Step 4: Commit & Push to GitHub
```bash
git add <files>
git commit -m "feat/fix/chore: descriptive message"
git push origin <branch-name>
```

### Step 5: Open a Pull Request into `main`
- Open a PR on GitHub targeting the `main` branch.
- Automated CI on GitHub Actions runs (or can be validated locally via `npm run test:security && npm run build`):
  - `npm ci --include=dev`
  - `npm run test:security`
  - `npm run build:worker`
  - `npx wrangler deploy --dry-run --config wrangler.production.jsonc`
- Verify all test and build checks pass cleanly without deploying to production.

### Step 6: Merge Using Linear History
- Merge the PR into `main` using a linear-history-compatible method (Squash & Merge or Rebase & Merge).
- In accordance with repository Ruleset `24924121`, linear history is enforced and force-pushes/deletions on `main` are blocked.

### Step 7: Post-Merge Local Synchronization & Cleanup
```bash
git checkout main
git pull origin main
git branch -d <completed-branch-name>
```
Delete the remote branch via GitHub or `git push origin --delete <branch-name>`.

---

## 3. Deployment Architecture & Staging Retirement

1. **Direct Production Deployment from `main` (Post-STEP B)**:
   - Once STEP B deployment automation is active, merging into `main` serves as the authorized production release trigger, directly deploying to the Cloudflare Worker `pybim`.
   - The legacy `release/pybim-public-v1` staging-only branch is being phased out in favor of this direct GitHub-first release model.

2. **Non-Deploying PR Validation**:
   - Pull Requests to `main` run thorough compilation, security, OpenNext bundling, and Wrangler production dry-runs.
   - PR validation is strictly non-deploying and does not require Cloudflare production credentials.
