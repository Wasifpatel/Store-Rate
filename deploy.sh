#!/bin/bash

echo "🚀 Store Rate MVP Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Please run: git init && git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Check if user is logged into Vercel
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ Not logged into Vercel. Please run: npm install -g vercel && vercel login"
    exit 1
fi

echo "✅ Git and Vercel CLI ready"

# Deploy backend
echo "📦 Deploying backend..."
cd backend
vercel --prod
BACKEND_URL=$(vercel ls | grep backend | awk '{print $2}' | head -1)
echo "✅ Backend deployed at: https://$BACKEND_URL"

# Deploy frontend
echo "📦 Deploying frontend..."
cd ../frontend
vercel --prod --env VITE_API_URL=https://$BACKEND_URL
FRONTEND_URL=$(vercel ls | grep frontend | awk '{print $2}' | head -1)
echo "✅ Frontend deployed at: https://$FRONTEND_URL"

echo ""
echo "🎉 Deployment Complete!"
echo "Frontend: https://$FRONTEND_URL"
echo "Backend: https://$BACKEND_URL"
echo ""
echo "📝 Next steps:"
echo "1. Set up your MySQL database (PlanetScale or Railway)"
echo "2. Add environment variables in Vercel dashboard"
echo "3. Run the database schema from database/schema.sql"
echo "4. Test your application!"
