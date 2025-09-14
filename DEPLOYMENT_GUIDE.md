# 🚀 Deployment Guide: MySQL + Vercel

## Prerequisites
- GitHub account
- Vercel account
- PlanetScale account (for MySQL)

## Step 1: Set Up MySQL Database

### Option A: PlanetScale (Recommended)
1. Go to [planetscale.com](https://planetscale.com)
2. Sign up with GitHub
3. Create a new database: `store_rating_platform`
4. Go to "Connect" → "General" and copy the connection string
5. The connection string looks like: `mysql://username:password@host/database`

### Option B: Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project → "Provision MySQL"
4. Get the connection details from the database service

## Step 2: Deploy Backend to Vercel

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Set the root directory to `backend`
   - Add environment variables:
     ```
     DB_HOST=your_mysql_host
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_NAME=store_rating_platform
     JWT_SECRET=your_super_secret_jwt_key_here
     NODE_ENV=production
     ```
   - Deploy!

3. **Note your backend URL:**
   - Vercel will give you a URL like: `https://your-backend-app.vercel.app`

## Step 3: Deploy Frontend to Vercel

1. **Create a new Vercel project:**
   - Go to Vercel dashboard
   - Click "New Project"
   - Import the same repository
   - Set the root directory to `frontend`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-app.vercel.app
     ```
   - Deploy!

## Step 4: Set Up Database Schema

1. **Connect to your MySQL database:**
   - Use PlanetScale's web console or any MySQL client
   - Run the SQL from `database/schema.sql`

2. **Or use PlanetScale CLI:**
   ```bash
   npm install -g @planetscale/cli
   pscale auth login
   pscale database create store_rating_platform
   pscale connect store_rating_platform main --port 3309
   # Then run the schema.sql file
   ```

## Step 5: Test Your Deployment

1. **Backend Health Check:**
   - Visit: `https://your-backend-app.vercel.app/api/health`
   - Should return: `{"status": "OK", "message": "Server is running"}`

2. **Frontend:**
   - Visit your frontend URL
   - Test login/register functionality
   - Test store browsing and rating

## Environment Variables Summary

### Backend (.env)
```
DB_HOST=your_mysql_host
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=store_rating_platform
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-app.vercel.app
```

## Troubleshooting

### Common Issues:
1. **CORS errors:** Make sure your backend allows your frontend domain
2. **Database connection:** Check your environment variables
3. **Build failures:** Check the Vercel build logs

### Useful Commands:
```bash
# Test backend locally
cd backend
npm install
npm start

# Test frontend locally
cd frontend
npm install
npm run dev
```

## Production Checklist
- [ ] Database schema created
- [ ] Environment variables set
- [ ] Backend deployed and health check passes
- [ ] Frontend deployed and connects to backend
- [ ] Test all user flows
- [ ] Set up custom domains (optional)
