# <%= name %>

<%= description %>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

To generate the application add globally the libs:

```
yarn add g cliberry
```

or using npm

```
npm install g cliberry
```

and use command to generate the sources:

```
cliberry ng6 new --name "NAME OF YOUR PROJECT" --force --description "DESCRIPTION OF YOUT PROJECT"
```

`ng6` can not be needed if it's the default target of ng cli 
(can be changed) or it can be used as `ng` (can be upgraded).

`--force` is not needed for an empty folder

to build the project use build command:

```
yarn build
```

or 

```
npm run build
```

and to create the bundle after the build:

```
yarn package
```

or 

```
npm run package
```

The generated project will use the web component of the name: `<NAME-OF-YOUR-PROJECT></NAME-OF-YOUR-PROJECT>`

After including generated project bundle with name: `NAME-OF-YOUR-PROJECT.min.js`

To develop the project you can import it into the InteliJ IDEA (or Web Storm) IDE 
and use defined targets to run the project.

Or use `yarn/npm` to `run/test/lint` the project

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
