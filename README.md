JacoDB library site. 

## Development

Install `nvm`. Particular `node` version is written in `.nvmrc` file.

```batch
yarn
yarn develop
```

This error means that `yarn clean` should be run:

```
There was an error compiling the html.js component for the development server.
See our docs page on debugging HTML builds for help https://gatsby.dev/debug-html TypeError: Cannot read properties of undefined (reading 'href')
```



## Build site

### Frontend

```batch
yarn build
```

### Generate JacoDB docs 

execute in command line:

```batch
generate-dokka-html.bat
```

This script will checkout develop branch of https://github.com/UnitTestBot/jacodb.git into jacodb-temp folder. Then run 
`dokkaHtmlMultiModule` task for generating docs and put them into docs folder. 

All generated docs are under source control. So do not forget to **push** them.   

### Build whole site into jar 

execute in command line:

```batch
./gradlew bootJar
```
then you could run jar by

```batch
java -jar backend/build/libs/jacodb-site.jar
```

And proceed to http://localhost:8080