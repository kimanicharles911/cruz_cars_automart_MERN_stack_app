
<h1 align="center"><a href="https://cruzcarsautomartmern.herokuapp.com" target="_blank">🌐 Cruz Cars Automart MERN Stack App</a></h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/kimanicharles911/emmethub_nodejs_modules/blob/master/LICENSE.txt" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> This is the Repository of an online automart. One can view cars available for sale, add cars to sell them, search for cars w/ specific features, update and delete car data. It is built using React, Express (node), MongoDB/Mongoose, Bootstrap and axios http client. The comments in the file allow easy understanding of the code.

## Deployed at
* https://cruzcarsautomartmern.herokuapp.com

***
## Frontend

* It is located in the folder called frontend in this repository.

#### Setup/Installation Requirements
##### Install Dependencies

```
npm install
```

##### Run React Development Server

```
npm run start
```

##### To Build for Production

```
Nothing is done inside the frontend folder all building configuration is done in the backend.
```

## How It Was Built
##### Create React App
```sh
npx create-react-app
npm i --save bootstrap
npm i --save react-bootstrap
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @popperjs/core
npm i --save axios
npm i --save react-router-dom
npm i --save buffer
npm i --save http-proxy-middleware
```
##### Dependencies
* Bootstrap
* React Bootstrap
* fortawesome
* font-awesome
* Axios
* React Router Dom
* Buffer
* http-proxy-middleware

##### src folder structure
```
src/
  components/
    AccordionComponent.jsx
    AccordionComponent.css
    AllCarsComponent.jsx
    AllCarsComponent.css
    MainComponent.jsx
    MainComponent.css
    MultipleUpdatesComponent.jsx
    MultipleUpdatesComponent.css
    NavbarComponent.jsx
    NavbarComponent.css
    modals/
      AddCarModalComponent.jsx
      AddCarModalComponent.css
      DeleteModalComponent.jsx
      DeleteModalComponent.css
      EditModalComponent.jsx
      EditModalComponent.css
      ViewModalComponent.jsx
      ViewModalComponent.css
    index.js
  __tests__/
    __snapshots__/
  modules/
    index.js
    axiosErrorMessage.js
    axiosResponseMessage.js
    formDataCreator.js
    objectCreator.js
  images/
    nav-icon.svg
    index.js
  App.css
  App.jsx
  App.test.js
  index.css
  index.js
  reportWebVitals.js
  setupProxy.js
  setupTests.js
```

***
## Backend

* It is located in the root of this repository.
#### Deployed at
* https://cruzcarsautomartmern.herokuapp.com/api/v1/cars/

#### API Usage

| HTTP method      |   EndPoint   |   Public Access   |   Example   |
| ---- |:---- |:---- |:---- |
| POST     | /api/v1/cars/car    |  TRUE    |  Find example in routes/index.js    |
| GET     | /api/v1/cars/car    |  TRUE    |  https://cruzcarsautomartmern.herokuapp.com/api/v1/cars/car    |
| GET     | /api/v1/cars/car?id=61f3bf1ec27ace1490f0b84b    |  TRUE    |  https://cruzcarsautomartmern.herokuapp.com/api/v1/cars/car?id=61f3bf1ec27ace1490f0b84b    |
| GET     | /api/v1/cars/search?carAge=9    |  TRUE    |  https://cruzcarsautomartmern.herokuapp.com/api/v1/cars/search?carAge=9    |
| PATCH     | /api/v1/cars/car/:id    |  TRUE    |  Find example in routes/index.js    |
| DELETE     | /api/v1/cars/car/:id    |  TRUE    |  https://cruzcarsautomartmern.herokuapp.com/api/v1/cars/car/61f37614e24f30ca0558cc41    |


#### Setup/Installation Requirements

##### Install Dependencies

```sh
sudo apt install nodejs #(for linux platform)
npm i
```

* Add the below line in your package.json file as one of the scripts value:
```sh
"dev": "nodemon app.js"
```

##### Development Usage

```sh
npm run dev
```

## How It Was Built
##### Node
```sh
npm init
npm i --save express
npm i --save bson
npm i --save cors
npm i --save dotenv
npm i --save express
npm i --save mongoose
npm i --save multer
npm i --save-dev nodemon
```

##### Dependencies
* Node
* Express
* Bson
* Cors
* Dotenv
* Mongoose
* Multer
* Nodemon

##### Deploy to Heroku
* Git does not track empty folders in the root of a repository so ensure you've manually added a little dummy data into any empty folder that is used by the application. For example those used by multer. In this case I added a dummy car image in the uploadedImages folder. This prevents POST, PATCH and PUT request errors on heroku.
<br>

* Add this in package.json
```sh
"scripts": {
  "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
}
```
```sh
"engines": {
  "node": "16.13.2",
  "npm": "8.1.2"
}
```

* Change scripts start from using nodemon to:
```sh
"start": "node app.js",
```

* Add the below LOC to the app.js file
```sh
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
```

* Then run the following terminal commands:
```sh
install heroku
heroku login
touch Procfile
```

* Add this line in the Procfile which will depend with the name of your server file which in my case is app.js:
```sh
web: node app.js
```

* Then run the following terminal commands:
```sh
heroku create cruzcarsautomartmern
git add . 
git commit -m"first deploy to heroku"
## optional for pushing to github: git push -u origin master
git push heroku master
```

* Set MongoDB Password by first:
  * Replace the .env variable in the mongoose connection string with the password itself.
  * Do not use && chained git commands.
```sh
  git add .
  git status
  git commit -m"attempt to deploy to heroku"
  git status
  git push heroku master #only pushes to heroku but not github
  git reset HEAD~1 #destroys the commit that had the mongoDB password exposed to version control
  git status
```
* Disable Heroku from reverting to an app.js file without a raw password by excluding app.js from version control w/:
```sh
git update-index --assume-unchanged "app.js"
```
* Undo it w/:
```sh
git update-index --no-assume-unchanged "app.js"
```

### folder structure w/ MVC architecture
```
config/
  index.js
controllers/
  carsController.js
models/
  CarModel.js
routes/
  index.js
uploadedImages/
  dummy-car.jpg
app.js
LICENSE.txt
MISCELLANEOUS.txt
package-lock.json
package.json
permaData.json
Procfile
README.md
```

## License and Copyright Information.

This project is MIT licensed see [my MIT LICENSE](https://github.com/kimanicharles911/cruz_cars_automart_MERN_stack_app/blob/master/LICENSE.txt) for details.<br />
Copyright © 2022 [Charles Kimani & Emmethub](https://github.com/kimanicharles911).

### Author

###### 👤 **Charles Kimani**

* Website: [author.emmethub.com](https://author.emmethub.com)
* Github: [@kimanicharles911](https://github.com/kimanicharles911)
* LinkedIn: [@kimanicharles](https://linkedin.com/in/kimanicharles)

#### Show your support

Give a ⭐️ if this project helped you!

***