#!/bin/sh

set -e
maxwidth="1680"  # in pixels, the widest image you want to allow.
FOLDER="./assets/uploads"

find "${FOLDER}" \( -name "*.png" \) -print | while read FILE
do
    if [ -f "${FILE}" ]; then
        echo "${FILE}"
        # if grep --exclude-dir={./node_modules,./_site,./assets/uploads,./vendor,./.git,./.forestry,./assets/fonts} -riq "${FILE##*/}" .
        # then
            # echo "Image Found"
            imgwidth=`sips --getProperty pixelWidth "${FILE}" | awk '/pixelWidth/ {print $2}'`
        # else
        #     rm "${FILE}"
        #     continue
        # fi

    else
        echo "Oops, "${FILE}" does not exist."
        exit
    fi

    if [ $imgwidth -gt $maxwidth ]; then
        echo " - Image too big. Resizing..."
        sips --resampleWidth $maxwidth "${FILE}" > /dev/null 2>&1  # to hide sips' ugly output
        npx imagemin "${FILE}" --plugin=pngquant --out-dir=assets/uploads/
        imgwidth=`sips --getProperty pixelWidth "${FILE}" | awk '/pixelWidth/ {print $2}'`
        imgheight=`sips --getProperty pixelHeight "${FILE}" | awk '/pixelHeight/ {print $2}'`
        echo " - Resized "${FILE}" to $imgwidth""px wide by $imgheight""px tall";
    fi
done

find "${FOLDER}" \( -name "*.jpg" -o -name "*.jpeg" \) -print | while read FILE
do
    if [ -f "${FILE}" ]; then
        echo "${FILE}"
        # if grep --exclude-dir={./node_modules,./_site,./assets/uploads,./vendor,./.git,./.forestry,./assets/fonts} -riq "${FILE##*/}" .
        # then
        #     echo "Image Found"
            imgwidth=`sips --getProperty pixelWidth "${FILE}" | awk '/pixelWidth/ {print $2}'`
        # else
        #     rm "${FILE}"
        #     continue
        # fi
    else
        echo "Oops, "${FILE}" does not exist."
        exit
    fi

    if [ $imgwidth -gt $maxwidth ]; then
        echo " - Image too big. Resizing..."
        sips --resampleWidth $maxwidth "${FILE}" > /dev/null 2>&1  # to hide sips' ugly output
        npx imagemin "${FILE}" --plugin=mozjpeg --out-dir=assets/uploads/
        imgwidth=`sips --getProperty pixelWidth "${FILE}" | awk '/pixelWidth/ {print $2}'`
        imgheight=`sips --getProperty pixelHeight "${FILE}" | awk '/pixelHeight/ {print $2}'`
        echo " - Resized "${FILE}" to $imgwidth""px wide by $imgheight""px tall";
    fi
done
