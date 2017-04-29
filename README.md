# Project Title

CompuCorp Test

### Set up

First things firts...
```
npm i 
```

### Environments

Development environment

```
webpack-dev-server
```

Production environment. Deploy.

```
npm run build
```

Testing environment. 

````
npm run test
npm test

## Main tools used

* [Angular 1.x ] (https://angularjs.org/)
* [Webpack 2](https://webpack.js.org/) 
* [Stylus](http://stylus-lang.com/)
* [Karma](https://karma-runner.github.io)
* [Jasmine](https://jasmine.github.io/)



## Brief explanation of solution

I took a modular apporach building small encapsulated components. Each one of them having a single role and all connected to a root or parent component that made communication between components possible. Each one of the components are as simple as possible and made of other small components making them easy to understand and to test. All major logic goes inside the root component trying to have only presentational components with no complex controllers. Also tried to build small reusable components for the UI (e.g. buttons, cards, jumbotron). Really had fun and learned a lot while building this project!! 
