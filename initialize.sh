#!/bin/sh

#initializing database
cd server/config/
cat database.sql | sqlite3 database.db

#initializing server
cd ../
npm i
nohup nodemon server.js &

#initializing app
cd ../client/
npm i
npm run serve