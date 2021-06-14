@echo off
set dist_build=%CD%
echo @echo off>> %dist_build%deploy.bat
echo npm run build>> %dist_build%deploy.bat
call %dist_build%deploy.bat
echo build done, publish...
cd dist
@az webapp up --location westeurope --name clientorganizer --html
pause