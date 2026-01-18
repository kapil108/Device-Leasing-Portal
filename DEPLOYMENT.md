# 🚀 Deployment Guide

## Quick Deployment Options

| Platform | Purpose | Best For | Cost |
|----------|---------|----------|------|
| **Vercel** | Next.js App | Production deployment | Free tier available |
| **MongoDB Atlas** | Database | Database hosting | Free tier (512MB) |
| **Render** | Full-stack App | Alternative hosting | Free tier available |

---

## Option 1: Vercel Deployment (Recommended) ⭐

### Prerequisites
- GitHub repository (✅ Already set up)
- MongoDB Atlas account (or other MongoDB hosting)

### Step 1: Set Up MongoDB Atlas

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Select **FREE** tier (M0 Sandbox)
   - Choose cloud provider and region (closest to your users)
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Grant "Read and write to any database" permission

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" and click "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `device-leasing`

   Example:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/device-leasing?retryWrites=true&w=majority
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find `Device-Leasing-Portal` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (detected automatically)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | `your-secret-key-min-32-chars-long-12345` |

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-app.vercel.app`

### Step 3: Verify Deployment

1. **Visit Your App**
   - Open the deployed URL from Vercel dashboard

2. **Seed Database**
   - Navigate to `https://your-app.vercel.app/api/auth/register`
   - You should see a JSON response confirming users were created

3. **Test Login**
   - Go back to homepage
   - Click "Supplier Login"
   - Use credentials: `supplier@test.com` / `Supplier@123`
   - Verify dashboard loads with sample devices

---

## Option 2: Render Deployment (Alternative)

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create Web Service

1. **New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select `Device-Leasing-Portal` repository

2. **Configure Service**
   - **Name**: `device-leasing-portal`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `master`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Environment Variables**
   Add in "Environment" section:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-secret-key-min-32-chars-long-12345
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete
   - Your app will be at `https://device-leasing-portal.onrender.com`

### Step 3: Verify Deployment

Same verification steps as Vercel above.

---

## Post-Deployment Steps

### 1. Custom Domain (Optional)

**On Vercel:**
- Go to project settings → Domains
- Add your custom domain
- Update DNS records as instructed

**On Render:**
- Go to service settings → Custom Domains
- Add domain and configure DNS

### 2. Update README

Add your live deployment URL:
```markdown
## 🌐 Live Demo

**Production**: https://your-app.vercel.app

**Test Credentials**:
- Supplier: supplier@test.com / Supplier@123
- Employee: employee@test.com / Employee@123
```

### 3. Monitor Performance

**Vercel:**
- Dashboard shows analytics automatically
- View deployment logs for debugging

**Render:**
- Check "Logs" tab for application logs
- Monitor service metrics

---

## Troubleshooting

### Issue: Build Failed

**Solution:**
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run lint
```

### Issue: Database Connection Failed

**Possible causes:**
1. Incorrect MongoDB URI
2. IP not whitelisted (use 0.0.0.0/0)
3. Wrong database user credentials

**Solution:**
- Verify connection string format
- Check MongoDB Atlas network access settings
- Ensure password doesn't contain special characters (or URL encode them)

### Issue: Environment Variables Not Working

**Solution:**
- Redeploy after adding/changing variables
- Verify variable names match exactly (case-sensitive)

---

## Cost Estimate

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Hobby | $0 (Free) |
| MongoDB Atlas | M0 | $0 (Free 512MB) |
| Render | Free | $0 (with limitations) |

**Total: $0/month** for starter deployment

---

## Next Steps

1. ✅ Choose deployment platform (Vercel recommended)
2. ✅ Set up MongoDB Atlas
3. ✅ Deploy application
4. ✅ Verify all features work
5. 📝 Update README with live URL
6. 🎉 Share your project!

---

## Support

If you encounter issues:
- Check Vercel/Render logs
- Verify environment variables
- Test database connection
- Review MongoDB Atlas network access
