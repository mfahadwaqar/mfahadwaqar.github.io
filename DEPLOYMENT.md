# Deployment Guide: GitHub Pages with CI/CD

This guide will walk you through deploying your personal website to GitHub Pages using GitHub Actions for automated CI/CD.

## Prerequisites

- A GitHub account
- Your website code in a GitHub repository
- Repository name format: `username.github.io` (for custom domain) OR any repository name (for `username.github.io/repository-name`)

## Step-by-Step Deployment

### Step 1: Create/Prepare Your GitHub Repository

1. **If you haven't created the repository yet:**
   - Go to [GitHub](https://github.com) and click "New repository"
   - Name it either:
     - `username.github.io` (for root domain: `https://username.github.io`)
     - Any name (for subpath: `https://username.github.io/repository-name`)
   - Make it **public** (required for free GitHub Pages)
   - Don't initialize with README (if you already have files)

2. **If the repository already exists:**
   - Make sure it's set to **public** (Settings → Change repository visibility)

### Step 2: Push Your Code to GitHub

If you haven't pushed your code yet:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Personal website"

# Add your GitHub repository as remote
git remote add origin https://github.com/username/repository-name.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: "GitHub Actions" (not "Deploy from a branch")
5. Click **Save**

### Step 4: Verify GitHub Actions Workflow

The workflow file (`.github/workflows/deploy.yml`) is already configured. It will:

- Trigger on every push to `main` or `master` branch
- Deploy your static files (HTML, CSS, assets) to GitHub Pages
- Exclude unnecessary files (app.py, requirements.txt, etc.)

### Step 5: Test the Deployment

1. **Make a small change** to your website (or just push the current code)
2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Check the deployment:**
   - Go to your repository → **Actions** tab
   - You should see "Deploy to GitHub Pages" workflow running
   - Wait for it to complete (usually 1-2 minutes)

4. **View your website:**
   - Go to **Settings** → **Pages**
   - Your site URL will be displayed (e.g., `https://username.github.io` or `https://username.github.io/repository-name`)
   - It may take a few minutes for the first deployment to be live

## Your Website URL

After deployment, your website will be available at:

- **If repository is `username.github.io`**: `https://username.github.io`
- **If repository has another name**: `https://username.github.io/repository-name`

## How CI/CD Works

### Automatic Deployment

Every time you push changes to the `main` or `master` branch:

1. GitHub Actions automatically detects the push
2. Runs the workflow defined in `.github/workflows/deploy.yml`
3. Uploads your static files (HTML, CSS, assets)
4. Deploys them to GitHub Pages
5. Your website is updated within 1-2 minutes

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

## What Gets Deployed

The workflow automatically includes:
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `assets/` folder (images, etc.)

The workflow automatically excludes:
- ❌ `app.py` (FastAPI - not needed for static hosting)
- ❌ `requirements.txt`
- ❌ `.github/` folder
- ❌ `node_modules/`
- ❌ Other development files

## Troubleshooting

### Website Not Showing

1. **Check Actions tab**: Make sure the workflow completed successfully
2. **Check Pages settings**: Ensure "GitHub Actions" is selected as source
3. **Wait a few minutes**: First deployment can take 5-10 minutes
4. **Check repository visibility**: Must be public (or you need GitHub Pro)

### Workflow Fails

1. Go to **Actions** tab → Click on failed workflow
2. Check the error message
3. Common issues:
   - Missing files (make sure `index.html` exists)
   - Repository not public
   - Permissions issue (should auto-resolve)

### Changes Not Appearing

1. **Hard refresh** your browser: `Ctrl+F5` or `Cmd+Shift+R`
2. **Clear browser cache**
3. **Check Actions**: Make sure latest push triggered deployment
4. **Wait 1-2 minutes**: GitHub Pages has a short cache

## Updating Your Website

To update your website:

```bash
# Make your changes to HTML/CSS
# Then commit and push
git add .
git commit -m "Update website content"
git push origin main
```

The website will automatically redeploy within 1-2 minutes!

## Custom Domain (Optional)

If you want to use a custom domain (e.g., `yourname.com`):

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Follow GitHub's instructions to configure DNS
4. GitHub will automatically create a `CNAME` file

## Notes

- **FastAPI is not used** in GitHub Pages deployment (it's static hosting only)
- The `app.py` file is kept for local development
- All static files work perfectly on GitHub Pages
- The workflow uses the official GitHub Actions for Pages deployment

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Check your repository's **Actions** tab for deployment logs

