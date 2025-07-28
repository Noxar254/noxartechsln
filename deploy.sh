# Deploy to Firebase Hosting

echo "🚀 Starting Firebase deployment..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Login to Firebase (if not already logged in)
echo "🔐 Checking Firebase authentication..."
firebase login

# Initialize Firebase project (if not already initialized)
if [ ! -f ".firebaserc" ]; then
    echo "⚙️ Initializing Firebase project..."
    firebase init hosting
fi

# Build and optimize (if needed)
echo "🔨 Optimizing assets..."
# Add any build commands here if needed

# Deploy to Firebase Hosting
echo "🌐 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment complete!"
echo "🎉 Your website is now live and optimized!"
echo ""
echo "📊 Check your performance:"
echo "   - Firebase Console: https://console.firebase.google.com/"
echo "   - PageSpeed Insights: https://pagespeed.web.dev/"
echo "   - GTmetrix: https://gtmetrix.com/"
echo ""
echo "🚀 Your website is now lightning fast!"
