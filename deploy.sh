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
      if [[ "${KEY}" == "austincodingacademy.com" ]] && [[ "${CIRCLE_BRANCH}" == "master" ]]; then
        node _javascripts/aca.stedwards.js
        echo "aca.stedwards.edu" >> _site/locations/st-edwards/CNAME
        npx gh-pages -d _site/locations/st-edwards/ -r git@github.com:CircleEducation/aca.stedwards.edu.git
      fi
    fi
    ((ITER++))
  done
fi
