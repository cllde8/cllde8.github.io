#!/bin/bash

targetVersion="v1.0" # change this to the version you want to update to

mainPath="./labimotion/schema"
sourcePath="./labimotion/src"
baseUrl="https://cllde8.github.io/labimotion/schema/$targetVersion"

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

targetDirectory="$mainPath/$targetVersion"
latestDirectory="$mainPath/latest"

# Create the target directory if it doesn't exist
mkdir -p "$targetDirectory"
mkdir -p "$latestDirectory"

# Copy the source directory to the target directory
cp -r "$sourcePath"/* "$targetDirectory"
cp -r "$sourcePath"/* "$latestDirectory"
