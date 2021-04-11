#  itunes
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `npx react-native run-ios`
  * for Android
    * Run Genymotion
    * run `npx react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).


### Supported Devices:
1. Android
2. Iphone

### Supported Features:
1. search song
2. indicates that this song is playing
3. music control show up when a song is playing
4. play the song
5. pause the song
6. playing the song while searching

### Requirement to build the app:
1. run `npm install`
2. run `npx react-native run-android`

### Instructions to build and deploy the app:
1. Setup fastlane to automate deploy to appcenter
  * run `gem install fastlane -NV && fastlane update_plugins`
2. Run Build and deploy to appcenter
  * run `fastlane android dev`
3. Download apk from appcenter
  * `https://install.appcenter.ms/orgs/ricky102/apps/itunes-android`


