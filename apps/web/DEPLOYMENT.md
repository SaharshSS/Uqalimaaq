# Deployment Guide for Uqalimaaq

This guide explains how to deploy the Uqalimaaq web app to Vercel and configure Supabase OAuth authentication.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A Supabase project (sign up at [supabase.com](https://supabase.com))
3. Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to the web app directory:
   ```bash
   cd apps/web
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to link your project or create a new one.

### Option B: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Root Directory**: `apps/web`
   - **Framework Preset**: Other
   - **Build Command**: (leave empty - static site)
   - **Output Directory**: `.` (current directory)
5. Click "Deploy"

After deployment, Vercel will provide you with a URL like:
- `https://your-project-name.vercel.app`
- Or your custom domain if configured

## Step 2: Configure Supabase Site URL and Redirect URLs

**THIS IS THE CRITICAL STEP THAT FIXES THE "localhost:3000" REDIRECT ERROR!**

The issue you're experiencing (redirecting to `localhost:3000`) is because Supabase's **Site URL** is set to `localhost:3000`. You need to update this to your Vercel domain.

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project (`tjodmaqwodkpyusohljj`)
3. Navigate to **Authentication** → **URL Configuration**

4. **Update the Site URL** (THIS IS THE MOST IMPORTANT STEP):
   - Change **Site URL** from `http://localhost:3000` to your Vercel URL:
   - `https://your-project-name.vercel.app`
   - Replace `your-project-name` with your actual Vercel project name
   - This is the default URL Supabase will redirect to after OAuth

5. **Add Redirect URLs**:
   In the **Redirect URLs** section, add ALL of these URLs (one per line):

   ```
   http://localhost:8000
   http://localhost:8000/
   http://localhost:8000/learn.html
   http://localhost:3000
   http://localhost:3000/
   https://your-project-name.vercel.app
   https://your-project-name.vercel.app/
   https://your-project-name.vercel.app/learn.html
   https://your-project-name.vercel.app/*
   ```

   Replace `your-project-name` with your actual Vercel project name.

   If you have a custom domain, also add:
   ```
   https://your-custom-domain.com
   https://your-custom-domain.com/
   https://your-custom-domain.com/learn.html
   https://your-custom-domain.com/*
   ```

6. Click **Save**

**Important Notes:**
- The **Site URL** is the default redirect destination. If it's set to `localhost:3000`, Supabase will always try to redirect there first.
- The **Redirect URLs** are the allowed URLs. Even if Site URL is correct, the redirect URL must be in this list.
- Changes may take a few minutes to propagate.
- After updating, **clear your browser cache** and try signing in again.

## Step 3: Configure OAuth Providers

For each OAuth provider (Google, Apple, Microsoft/Azure), you need to:

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add authorized redirect URIs:
   - `https://tjodmaqwodkpyusohljj.supabase.co/auth/v1/callback`
6. Copy the Client ID and Client Secret
7. In Supabase Dashboard → **Authentication** → **Providers** → **Google**:
   - Enable Google provider
   - Paste Client ID and Client Secret
   - Save

### Apple OAuth

1. Go to [Apple Developer Portal](https://developer.apple.com)
2. Create a Services ID
3. Configure Sign in with Apple
4. Add redirect URL: `https://tjodmaqwodkpyusohljj.supabase.co/auth/v1/callback`
5. In Supabase Dashboard → **Authentication** → **Providers** → **Apple**:
   - Enable Apple provider
   - Enter your Apple credentials
   - Save

### Microsoft/Azure OAuth

1. Go to [Azure Portal](https://portal.azure.com)
2. Register a new application
3. Add redirect URI: `https://tjodmaqwodkpyusohljj.supabase.co/auth/v1/callback`
4. In Supabase Dashboard → **Authentication** → **Providers** → **Azure**:
   - Enable Azure provider
   - Enter your Azure credentials
   - Save

## Step 4: Verify Deployment

1. Visit your deployed Vercel URL
2. Click "Sign In" or "Create Account"
3. Try signing in with one of the OAuth providers
4. You should be redirected back to your app (not localhost!)

## Troubleshooting

### Error: Redirecting to `localhost:3000` after OAuth sign-in

**Problem**: You're being redirected to `http://localhost:3000/#access_token=...` after selecting your Google account.

**Root Cause**: Your Supabase **Site URL** is set to `http://localhost:3000` instead of your Vercel URL.

**Solution**:
1. Go to [Supabase Dashboard](https://app.supabase.com) → Your Project → **Authentication** → **URL Configuration**
2. **Change the Site URL** from `http://localhost:3000` to your Vercel URL (e.g., `https://your-project.vercel.app`)
3. **Add your Vercel URL to Redirect URLs** (see Step 2 above)
4. **Save** the changes
5. Wait 2-3 minutes for changes to propagate
6. **Clear your browser cache** or use an incognito window
7. Try signing in again

**Quick Fix (Temporary)**: If you're redirected to localhost:3000 but see tokens in the URL:
- Copy the entire URL (including the `#access_token=...` part)
- Navigate to your Vercel URL
- Manually paste the hash part (`#access_token=...`) after your Vercel URL
- The authentication should complete
- **But you still need to fix the Site URL in Supabase!**

### Error: "Redirect URL not allowed"

**Problem**: The redirect URL in your Supabase dashboard doesn't match your Vercel domain.

**Solution**: 
1. Check your Vercel deployment URL
2. Add it to Supabase **Authentication** → **URL Configuration** → **Redirect URLs**
3. Make sure to include both `/learn.html` and `/` paths
4. Wait a few minutes for changes to propagate

### Error: "Invalid client credentials"

**Problem**: OAuth provider credentials are incorrect or not configured.

**Solution**:
1. Verify your OAuth provider credentials in Supabase
2. Check that the redirect URI in your OAuth provider matches: `https://tjodmaqwodkpyusohljj.supabase.co/auth/v1/callback`
3. Ensure the OAuth provider is enabled in Supabase

### Still seeing localhost errors after fixing Site URL

**Problem**: Browser cache, cookies, or Supabase hasn't updated yet.

**Solution**:
1. **Wait 3-5 minutes** after changing Supabase settings (changes need to propagate)
2. Clear your browser cache completely
3. Clear cookies for your Vercel domain and Supabase domain
4. Try in an incognito/private window
5. Check browser console (F12) for error messages
6. Verify the Site URL in Supabase is exactly your Vercel URL (no trailing slash, correct protocol: `https://`)
7. Double-check that your Vercel URL is in the Redirect URLs list

## Environment Variables (Optional)

If you need to use different Supabase credentials for different environments:

1. In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add variables:
   - `SUPABASE_URL` (if you want to override)
   - `SUPABASE_ANON_KEY` (if you want to override)

Note: Currently, the app uses hardcoded Supabase credentials. To use environment variables, you'd need to modify the HTML files to read from environment variables (requires a build step).

## Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Update Supabase redirect URLs to include your custom domain
5. Wait for DNS propagation (can take up to 48 hours)

## Continuous Deployment

Once connected to Git:
- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- All deployments get unique URLs for testing

## Support

If you continue to have issues:
1. Check the browser console for detailed error messages
2. Check Supabase logs in the dashboard
3. Verify all redirect URLs are correctly configured
4. Ensure OAuth providers are properly set up

