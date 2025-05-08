#!/bin/bash

git config --global user.email "kevin@zollege.com"
git config --global user.name "Kevin Colten"
if [ "${CIRCLE_BRANCH}" == "preview" ]; then export JEKYLL_ENV='preview.'; fi
if [ "${CIRCLE_BRANCH}" == "preview" ] || [ "${CIRCLE_BRANCH}" == "master" ]; then
  mkdir _data
  node _javascripts/events.js
  node _javascripts/tutoring.js
  npm run images
  npm run configs
  node _javascripts/github.js
  node _javascripts/start-dates.js
  if [ ! -f _data/startDates.yml ]; then exit 0; fi
  ITER=0
  node _javascripts/prep-dates.js
  if [ ! -f _data/prepDates.yml ]; then exit 0; fi
  ITER=0
  for file in ./_configs/*; do
    if [[ -f $file ]] && [[ $(($ITER % $CIRCLE_NODE_TOTAL)) == $CIRCLE_NODE_INDEX ]]; then
      export KEY=$(echo $file | sed "s/^.\/_configs\/\(.*\).yml$/\1/")
      npm run jekyll-build-amp
      npm run optimize
      npm run css
      npm run jekyll-build
      npm run favicon
      if [ "${CIRCLE_BRANCH}" == "master" ]; then npm run sitemap; fi
      npm run jekyll-build
      npm run jekyll-build-amp
      npm run optimize
      if [ "${CIRCLE_BRANCH}" == "preview" ]; then npm run encrypt; fi
      npm run deploy
    fi
    ((ITER++))
  done
fi
