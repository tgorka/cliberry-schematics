# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- generator for additional generators
### Changed
### Removed
### Fixed

## [0.0.9] - 2018-09-17
### Added
- generator for additional generators: 
  ```
  cliberry schematics g --name 'name' --description 'desc' --alias a1 --alias a2 --parameter 'pass:p:password desc' --parameter login:l --parameter email
  ```
### Fixed
- angular.json in the init spec.json checking


## [0.0.8] - 2018-09-12
### Fixed
- update cliberry for the generation

## [0.0.7] - 2018-09-12
### Fixed
- change \r\n to \n
- update .editorconfig
- update generation of .editorconfig


## [0.0.6] - 2018-09-11
### Fixed
- update gitignore
- add "schematics" target in the generated package.json


## [0.0.5] - 2018-09-11
### Added
- use cliberry.json support for the project
- generate cliberry.json
- add badge with dependency check
- add generation of the badges with dependency check
- add and generate new badges

### Removed
- don't use cliberry in a dev package not using circular dependency

### Fixed
- update the url of the badge in the template
- dot with the names


## [0.0.4] - 2018-09-11
### Fixed
- index not compiled with ts


## [0.0.3] - 2018-09-11
### Added
- meta data for cliberry
- generate cliberry.json config file to keep the version information
- add cliberry.json for the project


## [0.0.2] - 2018-09-11
### Fixed
- name for the badge


## [0.0.1] - 2018-09-11
### Added
- generate project with:
  * schematics
  * debug framework
  * yarn 
  * yarn lock file
  * tests (jasmine, protractor - defaults)
  * lint
  * code build
  * IDEA config 
  * editorconfig
  * gitignore
  * README
- Create the target that project that copy the files from the selected folder on ng-init
- Create blank schematics project
- Init javascript project, IDEA config, ignore file
- Community files: CODE_OF_CONDUCT, README, PULL_REQUEST_TEMPLATE, CONTRIBUTING
- Create and init the project
