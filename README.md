# Autimilezzz Frontend

Static frontend for the Autimilezzz car information platform.

## Quick Start

Simply open `index.html` in a web browser, or use a local server:

```bash
npx serve .
```

## Deployment on Render

### Configuration
- **Root Directory:** `frontend`
- **Build Command:** `npm install`
- **Publish Directory:** `.`
- **Site Type:** Static Site

### Important: Update API Endpoint

Before deploying, update the API endpoint in your JavaScript files to point to your deployed backend:

Replace: `http://localhost:5000`
With: `https://your-backend-name.onrender.com`

## Files Structure

- `index.html` - Main HTML file
- `styles.css` - Styling
- `app.js` - Application logic
- `data.js` - Car data
- `package.json` - Package configuration

## Features

- Responsive design
- Car browsing and comparison
- Budget-based recommendations
- Video reviews
- Detailed specifications
