# cliberry-schematics

[![Version npm](https://img.shields.io/npm/v/@cliberry-schematics.svg)](https://www.npmjs.com/package/cliberry-schematics)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) 

Schematics collection for generation angular project with support and configuration for useful framework and tools

This repository is a basic Schematic/Cliberry implementation that serves as a starting point to create and publish Schematics to NPM.

## Table of Contents

* [Installation](#installation)
* [API](#api)
* [Testing](#testing)
* [Unit Testing](#unit-testing)
* [Publishing](#publishing)

### Installation

For using the cli you need to install the npm package first:

```
npm install g cliberry
```

or 

```
yarn g cliberry
```

and then using cli like an [@angular/cli](https://cli.angular.io/).

The default schematics will be set to local templates if needed. They can be override 
by adding additional `--collection` parameter.

There is no need to install `@angular/cli` it is included inside `cliberry` tool.

Have fun with using `cliberry` ;).

### API

##### cliberry new
Create new cliberry/schematics collection with:
  * schematics
  * debug framework
  * yarn 
  * yarn lock file
  * tests (jasmine, protractor - defaults)
  * lint
  * IDEA config 
  * editorconfig
  * gitignore
  * README

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`yarn test` or `npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:


```bash
yarn build
yarn publish
```

```bash
npm run build
npm publish
```

That's it!
 
