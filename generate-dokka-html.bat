echo "Cleanup folders"
rmdir jacodb-temp /s/q
rmdir "docs" /s/q

echo "Cloning https://github.com/UnitTestBot/jacodb.git"
git clone https://github.com/UnitTestBot/jacodb.git jacodb-temp
cd jacodb-temp
echo "Checking out develop branch"
git checkout origin/develop
echo "Building site"
call ./gradlew dokkaHtmlMultiModule -PsemVer=1.4.0
echo "Site is ready"
cd ..
mkdir "docs"
echo "Copy to resources"
xcopy "jacodb-temp\build\dokka\htmlMultiModule" "docs" /s/h/e/k/f/c
git add docs/*
rmdir jacodb-temp /s/q

echo "Done"
