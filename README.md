# Personal Website

A minimalist, single-page personal website built with HTML, CSS, and FastAPI.

## Features

- Clean, academic-style design
- Responsive layout for mobile and desktop
- FastAPI backend for serving static files
- Automated deployment with GitHub Actions

## Local Development

### Prerequisites

- Python 3.11 or higher
- pip (Python package manager)

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd personal_website
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the FastAPI server:
```bash
python app.py
```

Or using uvicorn directly:
```bash
uvicorn app:app --reload
```

4. Open your browser and navigate to:
```
http://localhost:8000
```

## Project Structure

```
personal_website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── app.py              # FastAPI application
├── requirements.txt    # Python dependencies
├── assets/             # Images and other static assets
│   └── profile.jpg     # Profile picture (add your own)
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions CI/CD workflow
```

## Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that can be configured to deploy to various platforms:

### Option 1: Railway

1. Create a Railway account and project
2. Get your Railway token
3. Add `RAILWAY_TOKEN` to GitHub Secrets
4. Uncomment the Railway deployment step in `deploy.yml`

### Option 2: Render

1. Create a Render account and web service
2. Get your Render API key and service ID
3. Add `RENDER_API_KEY` and `RENDER_SERVICE_ID` to GitHub Secrets
4. Uncomment the Render deployment step in `deploy.yml`

### Option 3: Fly.io

1. Create a Fly.io account
2. Initialize Fly.io in your project: `flyctl launch`
3. Get your Fly.io API token
4. Add `FLY_API_TOKEN` to GitHub Secrets
5. Uncomment the Fly.io deployment step in `deploy.yml`

### Option 4: GitHub Pages (Static Only) - **RECOMMENDED**

The workflow is already configured for GitHub Pages deployment! Follow these steps:

1. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select "GitHub Actions"
   - Save

2. **Push your code:**
   ```bash
   git push origin main
   ```

3. **View your site:**
   - After deployment (1-2 minutes), visit `https://username.github.io` or `https://username.github.io/repository-name`
   - Check the **Actions** tab to see deployment status

**See `DEPLOYMENT.md` for detailed step-by-step instructions.**

## Customization

### Adding Your Profile Picture

1. Add your profile picture to the `assets/` directory
2. Name it `profile.jpg` (or update the path in `index.html`)
3. The image will be displayed in a circular format

### Updating Content

Edit `index.html` to update your personal information, experience, education, projects, and achievements.

### Styling

Modify `styles.css` to customize colors, fonts, spacing, and layout.

## License

This project is open source and available for personal use.
