@echo off
set dist_build=%CD%
echo @echo off>> %dist_build%\deploy-temp.bat
echo npm run build>> %dist_build%\deploy-temp.bat
call %dist_build%\deploy-temp.bat
echo build done, publish...
erase deploy-temp.bat
cd dist
@az webapp up --location westeurope --name clientorganizer --html
pause
@echo off
