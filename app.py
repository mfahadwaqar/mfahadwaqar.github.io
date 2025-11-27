from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

app = FastAPI(title="Muhammad Fahad Waqar - Personal Website")

# Mount static files directory (CSS, images, etc.)
app.mount("/assets", StaticFiles(directory="assets"), name="assets")

@app.get("/")
async def read_root():
    """Serve the main index.html file"""
    return FileResponse("index.html")

@app.get("/styles.css")
async def get_css():
    """Serve the CSS file"""
    return FileResponse("styles.css", media_type="text/css")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "personal-website"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

