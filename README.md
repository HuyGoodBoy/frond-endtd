# React Frontend Project

This is a React frontend project built with Vite. It can be deployed to GitHub Pages.

## Local Development

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at http://localhost:5173/

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment.

### Setup with GitHub Desktop

1. **Install GitHub Desktop**:
   - Download and install from [desktop.github.com](https://desktop.github.com/)

2. **Create a GitHub Repository**:
   - Sign in to GitHub Desktop with your GitHub account
   - Go to File > New Repository (or press Ctrl+N)
   - Fill in the repository name
   - Set the local path to this project folder
   - Click "Create Repository"

3. **Commit your files**:
   - GitHub Desktop will show all project files as changes
   - Add a summary (e.g., "Initial commit")
   - Click "Commit to main"

4. **Publish to GitHub**:
   - Click "Publish repository" in the top right
   - Ensure "Keep this code private" is unchecked if you want a public repository
   - Click "Publish Repository"

5. **Configure GitHub Pages**:
   - Go to your repository on GitHub.com
   - Go to Settings > Pages
   - Under "Source", select "Deploy from a branch"
   - Under "Branch", select "gh-pages" and "/ (root)"
   - Click "Save"

### Deploying to GitHub Pages

Whenever you want to deploy your site:

1. Make sure all your changes are committed using GitHub Desktop
2. Run the deployment command:
   ```bash
   npm run deploy
   ```

3. Wait a few minutes for GitHub Pages to build and deploy your site
4. Your site will be available at: `https://[your-username].github.io/[repo-name]/`

5. **After deploying**:
   - GitHub Desktop will show "gh-pages" branch was updated
   - You can switch back to main branch in GitHub Desktop to continue development

## Troubleshooting GitHub Pages Issues

If your site shows a blank page after deployment:

1. **Check browser console** (F12) for any JavaScript errors
2. **Verify file paths** - Make sure all assets use relative paths (`./`)
3. **Check build output** - Run `npm run build` locally and test the output
4. **Review base URL** - Ensure `vite.config.js` has `base: './'`
5. **Ensure index.html exists** in the deployed branch

## Project Structure

```
├── public/           # Static assets
├── src/              # Source code
│   ├── assets/       # Project assets (images, etc.)
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── App.jsx       # Main App component
│   └── main.jsx      # Entry point
├── .gitignore        # Git ignore file
├── deploy.js         # Deployment script
├── index.html        # HTML entry point
├── package.json      # Project configuration
├── postcss.config.cjs # PostCSS configuration
├── tailwind.config.cjs # Tailwind CSS configuration
└── vite.config.js    # Vite configuration
``` 