@echo off
cd Modules/Blazing/Blazing.Webpack
cls
set NODE_ENV=dev
npx ts-node app.ts --path ../../../Client