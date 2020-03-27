rm -f temp.html || 0
rm -rf dist || 0
touch temp.html
node ssr.js
mkdir dist
cp temp.html dist/index.html
rm temp.html
cp main.css dist/main.css
cp -r fonts dist/fonts
