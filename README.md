# Oshop

[![Build Status](https://dev.azure.com/noxxys/oshop/_apis/build/status/Noxxys.oshop?branchName=master)](https://dev.azure.com/noxxys/oshop/_build/latest?definitionId=1&branchName=master)
[![Deployment status](https://vsrm.dev.azure.com/noxxys/_apis/public/Release/badge/f84a8b88-54f2-417a-93e6-cd708b7a4e51/1/1)](#)

**This app is a work in progress, missing features and probably containing bugs**. Read below for more information.

This project is a fictitious web shop that I created while finishing [this excellent Angular course](https://www.udemy.com/the-complete-angular-master-class). It allows me to apply the knowledge learned during the course. The app's front-end is made with Angular 7, it is serverless and uses Firebase as its real-time database.

I started coding this project along with the teacher, and then quickly decided to continue developping it on my own, because there were too many differences between my code and the teacher's code. Then, I only used the introduction video of each section as requirements of what should be built. Here's a list of some of the differences:

- Using Angular 7 instead of 4
- Using a more recent version of AngularFire
- Ditched Bootstrap in favor of Angular Material
- Refactored the Firebase services to be more object oriented
- Most of the code is different now, as I'm not watching the course anymore
- CI/CD pipeline using Azure Devops

TODO: [see the project's board](https://github.com/Noxxys/oshop/projects/1)

The app is automatically deployed to Firebase hosting on https://oshop-b85ea.web.app after a successful merge to the master branch. There are also admin screens to manage products and orders, but you need to have admin access for that. If you want to get admin access, send me the Google email you used to log in.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.1.

## Install

First, you need to install [Nodejs](https://nodejs.org) version 8 or higher.
Then run `npm install` from your command line.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Unit tests for this project are currently failing / not implemented yet.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Please note that I don't plan to add any end-to-end tests to this project, as the focus is to learn Angular.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
