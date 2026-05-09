# 🚀 Final Deployment Checklist: Abdul Basit Nawaz Portfolio

Follow these steps in order before you officially "Launch" your site to ensure everything is secure, fast, and professional.

---

### 🛡️ STEP 1: Firebase Security Rules (Permanent Fix)
Move your database from "Test Mode" to "Permanent Mode" so it never expires.
1. Go to **Firebase Console** > **Realtime Database** > **Rules**.
2. Replace everything with this code:
```json
{
  "rules": {
    "presence": {
      ".read": true,
      ".write": true
    },
    ".read": false,
    ".write": false
  }
}
```
3. Click **Publish**.

---

### 🔍 STEP 2: SEO & Meta Data
Make sure your site looks good on Google and Social Media.
1. Open `index.html`.
2. Ensure `<title>` is set to: `Abdul Basit Nawaz | Full-Stack Software Engineer`.
3. Check the `<meta name="description">` content.
4. Verify your **Favicon** (the small tab icon) is appearing correctly.

---

### 📦 STEP 3: Production Build
Compile your code into a lightweight, high-performance bundle.
1. Open your terminal in the project folder.
2. Run: `npm run build`
3. This will create a `dist` folder. **Do not modify anything inside `dist`.**

---

### 🚀 STEP 4: Live Deployment
Upload your site to the internet.
1. Make sure you are logged in: `firebase login`
2. Deploy the site: `firebase deploy`
3. Once finished, Firebase will give you a **Hosting URL** (e.g., `https://your-site.web.app`).

---

### 🔗 STEP 5: Custom Domain (Optional)
If you have a personal domain (e.g., `abdulpasit.com`):
1. Go to **Firebase Hosting** settings.
2. Click **Add Custom Domain**.
3. Follow the instructions to update your DNS records (A and CNAME).

---
**Status: READY FOR LAUNCH 🚀**
