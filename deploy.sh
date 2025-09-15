# Custom deploy script for GitHub Pages
# This script creates a custom build for GitHub Pages

# Build the app with Vite
npm run build

# Make sure dist directory exists
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found"
  exit 1
fi

# Create .nojekyll file to prevent GitHub Pages from ignoring files that begin with underscore
touch dist/.nojekyll

# Copy index.html to 404.html for proper SPA routing
cp dist/index.html dist/404.html

# Add a debug index.js file directly to the dist folder
echo "console.log('App successfully loaded');" > dist/debug.js

# Create a fallback script loader that can be used if main script fails
cat > dist/fallback.html << EOL
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exam Practice App - Fallback</title>
    <style>
      body { font-family: sans-serif; text-align: center; padding: 20px; }
      .loading { margin-top: 50px; }
    </style>
  </head>
  <body>
    <h1>Exam Practice App</h1>
    <div class="loading">Loading application...</div>
    <script>
      window.location.href = '/exam-practice-app/index.html';
    </script>
  </body>
</html>
EOL

echo "Build completed successfully. Deploy the contents of the dist folder to GitHub Pages."