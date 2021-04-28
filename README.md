# Website

## Status

### `preview` [![CircleCI](https://circleci.com/gh/AustinCodingAcademy/austincodingacademy.com/tree/preview.svg?style=svg)](https://circleci.com/gh/AustinCodingAcademy/austincodingacademy.com/tree/preview)

### `master` [![CircleCI](https://circleci.com/gh/AustinCodingAcademy/austincodingacademy.com/tree/master.svg?style=svg)](https://circleci.com/gh/AustinCodingAcademy/austincodingacademy.com/tree/master)

## Requirements

1. Install ruby and rbenv
    * Mac run `brew install rbenv`
    * [Windows](https://rubyinstaller.org/)
    * [rbenv Repo](https://github.com/rbenv/rbenv)
2. Add to path to local rc/bash file:
    1. Run `echo 'export PATH="/usr/local/opt/m4/bin:$PATH"' >> ~/.zshrc`
3. Get permission for Gem to install Bundler
    * Run `export GEM_HOME="$HOME/.gem”`
    * [Reference](https://github.com/rbenv/rbenv/issues/1267)
4. Install Bundler 2:
    1. Run `gem install bundler`
    2. [Reference](https://bundler.io/guides/bundler_2_upgrade.html)
5. Run `bundle install` to install all the “gems”/packages for this website. See `gemfile.lock`
6. If error see Steps 2 and 3 again.

## Development

1. If needed, run `bundle` again.
2. Run `npm i` to install Node packages. See `package.json` file.
  
3. `KEY=austincodingacademy.com npm start` or `KEY=lubbockcodingacademy.com npm start`
  
  > If error:
  > `ExperimentalWarning: The fs.promises API is experimental`
  > `[1] [build] Browserslist: caniuse-lite is outdated. Please run:`
  > `[1] npx browserslist@latest --update-db`

  > * You may choose to update browserslist: `npx browserslist@latest --update-db` or
  > * `npm uninstall browserslist` then `npm browserslist@latest --update-db`
  > * Check latest version of browserslist installed. If it's not installing latest you'll need to `npm uninstall`, delete `node_modules/`, `npm cache clean --force`, then `npm i`, `npx browserslist@latest --update-db` to install the latest version. (*this is a last resort!*)

4. Otherwise, navigate to `http://localhost:8080` to see your changes. There is not feed on from the dev server telling you it's running.

## Test

1. `npm test`
