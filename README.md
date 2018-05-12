# image-processing

This is sample node application which allows you to connect with google custom search engine. You can search millions of images just typing phrases or keywords. On backend, node server will download first 9 images and compress it also it will change the grey scale of image. One can download image just by clickin on image.

# Table of Contents
Installation & Usage


# Installation & Usage

* Make sure Latest Node version is installed on your machine. If not then please follow this link ---> https://nodejs.org/en/ 
1. Clone this repositery into your local machine. git clone https://github.com/Hardik-Vibe/image-processing.git
2. You need to create Google Custom Search Engine. Please follow this link --> https://cse.google.co.in/cse/create/new. You will get one search engine id. You need to paste this id into app.constant.js file.
3. You need to create Google API key. Please follow this link --> https://console.developers.google.com/. Paste this API key into app.constant.js file.
2. Now run npm install from root directory of the project.
3. Now run npm start command. Your node server will run at port 5000. If you want to change port then use this command PORT = 3000 node index.js

You can access webpage at http://localhost:5000

