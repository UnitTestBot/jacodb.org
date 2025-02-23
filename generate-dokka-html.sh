echo "Cleanup folders"
rm -rf jacodb-temp
rm -rf docs

echo "Cloning https://github.com/UnitTestBot/jacodb.git"
git clone https://github.com/UnitTestBot/jacodb.git jacodb-temp
cd jacodb-temp
echo "Checking out develop branch"
echo "Building site"
./gradlew dokkaHtmlMultiModule -PsemVer=1.4.0
echo "Site is ready"
cd ..
mkdir "docs"
echo "Copy to resources"
cp -r jacodb-temp/build/dokka/htmlMultiModule docs
rm -rf jacodb-temp
git add docs/*

echo "Done"
