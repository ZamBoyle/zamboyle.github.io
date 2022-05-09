@Echo off

:Main
IF NOT EXIST %userProfile%\tmp\ (
    mkdir %userProfile%\tmp\
)
cd %userProfile%\tmp\
cls
CALL :Menu
EXIT /B 0

:Menu
echo BlindCode - Mons 2022
echo =====================
echo 1. Installer Git
echo 2. Installer Gh (GitHub CLI)
echo 3. Installer VSCode
echo 4. Installer Extensions Java pour VSCode
echo 5. Creer le depot EqlaExercice
echo 6. Quitter
echo.
set /p choix=Votre choix ?
echo.

if %choix% LEQ  0 CALL :Menu
if %choix% GEQ 7 CALL :Menu

if %choix%  EQU 1 CALL :Git
if %choix%  EQU 2 CALL :Gh
if %choix%  EQU 3 CALL :VSCode
if %choix%  EQU 4 CALL :ExtensionsVSCode
if %choix%  EQU 6 GOTO :End

GOTO :Menu

:git
echo Telechargement de Git
curl -L https://github.com/git-for-windows/git/releases/download/v2.36.0.windows.1/Git-2.36.0-64-bit.exe -o git.exe
echo Telechargement du fichier de reponse pour l'installation de Git: gitunattended.txt
curl -O -f -s https://zamboyle.github.io/Cours/2022/Git/Install/gitunattended.txt
echo Installation de Git. Veuillez patienter.
git  /VERYSILENT /LOADINF="gitunattended.txt"
Echo Installation de Git terminee
echo.
EXIT /B O

:Gh
echo Telechargement de Gh (Github CLI)
curl -L https://github.com/cli/cli/releases/download/v2.9.0/gh_2.9.0_windows_amd64.msi -o gh.msi
echo Installation de Gh. Veuillez patienter.
gh.msi /qn /norestart
Echo Installation de Gh terminee
EXIT /B O

:VSCode
echo Telechargement de VSCode
curl -L "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" -o vscode.exe
Echo Installation de VSCode. Veuillez patienter.
vscode /VERYSILENT /NORESTART /MERGETASKS=!runcode
Echo Installation de VSCode terminee

EXIT /B O

:ExtensionsVSCode
echo Installation des extensions VSCode
for %%i in (ms-ceintl.vscode-language-pack-fr vscjava.vscode-java-pack) do call code --force --install-extension %%i
echo Fin d'installation des extensions VSCode
echo.
EXIT /B O

:End
echo.
echo Bonne journee !



