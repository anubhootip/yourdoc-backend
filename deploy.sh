source .env

# Building React output
if [ "$NETLIFY_AUTH_TOKEN" != "" ]; then
  # rm -rf ./frontend_build.zip
  # npm install
  # cd yourdoc_frontend
  # rm -rf build
  # npm install
  # ENV=production && npm run build
  # cd ..
  node build.js NETLIFY_AUTH_TOKEN=$NETLIFY_AUTH_TOKEN NETLIFY_API_URL=$NETLIFY_API_URL
else
  echo "No env variables found!!"
fi


echo "Finished deploying"