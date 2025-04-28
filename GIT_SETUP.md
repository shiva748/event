# Git Setup for Event Management Application

This project includes three `.gitignore` files to properly manage which files are tracked in the Git repository:

1. Root `.gitignore` - Contains general patterns for a MERN stack application
2. `/client/.gitignore` - Specific to the React client application
3. `/server/.gitignore` - Specific to the Node.js backend application

## Important Note About Environment Variables

The `.env` files containing sensitive information like database credentials and API keys are excluded from Git tracking. To set up a working environment, you need to:

1. Create a `.env` file in the `/server` directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

2. Replace `your_mongodb_connection_string` with your actual MongoDB connection string.
3. Generate a secure random string for `JWT_SECRET`.

## Initial Git Setup

If you're setting up this repository for the first time:

```bash
# Initialize Git repository
git init

# Add all files respecting the .gitignore rules
git add .

# Make initial commit
git commit -m "Initial commit"

# Connect to remote repository (replace with your actual repository URL)
git remote add origin <your-repository-url>

# Push to remote repository
git push -u origin main
```

## Best Practices

- Never commit sensitive information like API keys or database credentials
- Review changes before committing to ensure no sensitive data is included
- Regularly update your local repository to get the latest changes from team members 