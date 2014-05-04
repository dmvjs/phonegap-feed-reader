phonegap-feed-reader
====================

To use:

# make sure cordova is installed, I recommend 3.4.1 or greater
npm install cordova

# where folderName is the name of the new folder to create
git clone git@github.com:dmvjs/phonegap-feed-reader.git folderName

# enter the directory (change folderName to folder in step #1 if you changed it)
cd folderName

cordova platform add ios

cordova build ios

# if you make changes to files within www folder, cd to www/js and run these commands:

browserify index.js -o app.js

cordova build ios

# to add start screens





