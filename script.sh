#!/bin/bash

directoryPath="./labimotion/schema"
# baseUrl="https://labimotion.github.io/schema/v1.0"
baseUrl="https://cllde8.github.io/labimotion/schema/v1.0"

for file in $(find $directoryPath -name "*.json")
do
  if jq -e '."$id"' $file > /dev/null; then
    filename=$(basename -- "$file") # gets the filename from the file path
    # filename="${filename#sch-}" # removes the sch- prefix
    newId="$baseUrl/$filename"
    jq --arg newId "$newId" '."$id" |= $newId' $file > temp.json && mv temp.json $file
    echo "Updated \$id in $file to $newId"
  fi
done

# chmod +x script.sh before running
# ./script.sh