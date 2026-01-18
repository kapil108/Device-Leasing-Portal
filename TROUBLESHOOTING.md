# Vercel Deployment Troubleshooting Guide

## ✅ What I Just Fixed

1. **Added `vercel.json`** - Explicit configuration for Vercel deployment
2. **Tested local build** - Confirmed build works successfully (no errors)
3. **Pushed changes** - Triggered automatic redeployment

## 🔍 Common Deployment Issues & Solutions

### Issue 1: Environment Variables Not Set ⚠️

**Symptoms:**
- Application loads but crashes on database operations
- Error: "Missing MONGODB_URI"

**Solution:**
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/device-leasing
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
```

4. Redeploy after adding variables

---

### Issue 2: Build Fails on Vercel 🔴

**Symptoms:**
- Deployment shows "Build Failed"
- TypeScript errors in logs

**Solution:**
Check Vercel deployment logs:
1. Go to your project → "Deployments"
2. Click on the failed deployment
3. Read the build logs

Common fixes:
- Missing dependencies → Run `npm install` locally
- TypeScript errors → Run `npm run build` locally to catch issues
- Outdated packages → Update package.json

---

### Issue 3: Database Connection Error 🗄️

**Symptoms:**
- App loads but shows database errors
- "/api/auth/register" fails

**Solution:**

1. **Check MongoDB Atlas IP Whitelist:**
   - Go to MongoDB Atlas → Network Access
   - Add `0.0.0.0/0` (Allow from anywhere)
   - Or add Vercel's IP ranges

2. **Verify Connection String:**
   ```
   mongodb+srv://username:PASSWORD@cluster.mongodb.net/device-leasing?retryWrites=true&w=majority
   ```
   - Replace PASSWORD with actual password
   - Ensure no special characters (or URL encode them)
   - Database name is correct

3. **Test Connection:**
   - After deployment, visit: `https://your-app.vercel.app/api/auth/register`
   - Should return JSON with user creation confirmation

---

### Issue 4: Empty/Blank Page 📄

**Symptoms:**
- Site loads but shows blank page
- No errors in console

**Possible Causes:**
1. Client-side hydration mismatch
2. CSS not loading
3. JavaScript errors

**Solutions:**
- Clear browser cache
- Check browser console for errors
- Verify `globals.css` is imported in `layout.tsx`

---

### Issue 5: API Routes Not Working 🔌

**Symptoms:**
- 404 errors on `/api/*` routes
- API endpoints return 500 errors

**Solution:**
1. Verify file structure:
   ```
   src/app/api/
   ├── auth/
   │   ├── login/route.ts
   │   └── register/route.ts
   └── devices/route.ts
   ```

2. Check route.ts exports:
   ```typescript
   export async function POST(req: Request) { ... }
   export async function GET() { ... }
   ```

---

## 📋 Deployment Checklist

Before deploying, ensure:
- [ ] Local build works: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Environment variables are set in Vercel
- [ ] MongoDB Atlas network access allows Vercel
- [ ] Database credentials are correct
- [ ] `.env.local` is NOT committed to GitHub
- [ ] `vercel.json` is committed

---

## 🔄 How to Redeploy

### Option 1: Automatic (Recommended)
Just push to GitHub:
```bash
git add .
git commit -m "fix: Your changes"
git push origin master
```
Vercel automatically detects and redeploys.

### Option 2: Manual via Vercel Dashboard
1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments" tab
4. Click "Redeploy" on latest deployment

### Option 3: Using Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

---

## 🚀 Post-Deployment Steps

1. **Visit Deployed URL**
   - Check if homepage loads

2. **Seed Database**
   - Go to: `https://your-app.vercel.app/api/auth/register`
   - Should see JSON response confirming users created

3. **Test Login**
   - Supplier: `supplier@test.com` / `Supplier@123`
   - Employee: `employee@test.com` / `Employee@123`

4. **Verify Features**
   - Supplier dashboard shows devices
   - Marketplace shows listings
   - CRUD operations work

---

## 🆘 Still Having Issues?

Check these resources:
1. **Vercel Logs**: Project → Deployments → Click deployment → "View Function Logs"
2. **MongoDB Atlas Logs**: Database → Monitoring
3. **Browser Console**: F12 → Console tab

### Get deployment logs:
```bash
vercel logs your-deployment-url
```

---

## 📊 Verify Deployment Status

Current commits on master:
- `fix(vercel): Add Vercel configuration` ✅
- `chore: Sync all changes` ✅

Check deployment at: https://vercel.com/dashboard
