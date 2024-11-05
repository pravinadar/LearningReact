1. created vite-react project


2. installed the following
    npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form


3. made the .env file and the .env.sample file
The .env file stores environment variables like API keys, database URLs, and other sensitive information required by the application. It's kept private and is usually added to .gitignore so it doesn't get uploaded to version control, keeping sensitive data secure.
The .env.sample file, on the other hand, is a non-sensitive template of the .env file. It contains placeholder keys but no sensitive information. This allows other developers to know what variables are needed and configure their own .env files without exposing any private data.
Important points
    1. whenever we change any environment variable, we need to restart the whole app again in many cases
    2. every framework has its own way of declaring and accessing environment variables i.e. react will have a different way of declaring environment variables and vite will have its own way so read documentation for each


4. edited .env file
    VITE_APPWRITE_URL="test" and logged it to check if it works

5. checkout .env file

6. then made the conf (config) folder in which we have the conf.js file
    this is a good practice which should be followed because, sometimes problems can occur while parsing the environment variables so we make a different conf file and have all our important id's already parsed to strings before and then use them in our .env file
    checkout the file



