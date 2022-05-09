@Echo off

:Main
IF NOT EXIST %userProfile%\tmp\ (
    mkdir %userProfile%\tmp\
) 
cd %userProfile%\tmp\
CALL :Menu
EXIT /B 0


:IsAuth
gh auth status --hostname "github.com" > NULL 2>&1 && (
    EXIT /B 0
) || (
    EXIT /B 1
)

:IsGitConfigured
git config --global --list | findstr  "user.mail user.name" > NULL 2>&1 && (
    EXIT /B 0
) || (
    EXIT /B 1
)

:git
echo Telechargement de Git
curl -L https://github.com/git-for-windows/git/releases/download/v2.36.0.windows.1/Git-2.36.0-64-bit.exe -o gitinstall.exe
echo Telechargement du fichier de reponse pour l'installation de Git: gitunattended.txt
curl -O -f -s https://zamboyle.github.io/Cours/2022/Git/Install/gitunattended.txt
echo Installation de Git. Veuillez patienter.
gitinstall.exe  /VERYSILENT /LOADINF="gitunattended.txt"
echo Installation de Git terminee
echo.
EXIT /B O

:Gh
echo Telechargement de Gh (Github CLI)
curl -L https://github.com/cli/cli/releases/download/v2.9.0/gh_2.9.0_windows_amd64.msi -o gh.msi
echo Installation de Gh. Veuillez patienter.
gh.msi /qn /norestart
echo Installation de Gh terminee
echo.
EXIT /B O

:VSCode
echo Telechargement de VSCode
curl -L "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" -o vscode.exe
echo Installation de VSCode. Veuillez patienter.
vscode /VERYSILENT /NORESTART /MERGETASKS=!runcode
echo Installation de VSCode terminee
echo.
EXIT /B O

:NVDA
echo Telechargement de NVDA
curl -L https://www.nvda-fr.org/r?p=nvda -o nvda.exe
echo Installation de NVDA. Veuillez patienter.
nvda --minimal --install-silent
echo Installation de NVDA terminee
echo.
EXIT /B O


:ExtensionsVSCode
echo Installation des extensions VSCode
for %%i in (ms-ceintl.vscode-language-pack-fr vscjava.vscode-java-pack) do call code --force --install-extension %%i
echo Fin d'installation des extensions VSCode
echo.
EXIT /B O


:ConfigureGit
git config --global --unset-all user.name
git config --global --unset-all user.email
set /p gitname=Comment t'appelles-tu (Prenom + Nom) ?
set /p gitemail=Quelle est tron adresse email ?
git config --global user.name "%gitname%"
git config --global user.email "%gitemail%"
EXIT /B O

:ConfigureGh
gh auth login -s delete_repo
EXIT /B O

:CreateRepository
IF NOT EXIST %USERPROFILE%\Documents\EqlaExercices(
    Mkdir %USERPROFILE%\Documents\EqlaExercices
    cd %USERPROFILE%\Documents\EqlaExercices
) ELSE (
    IF NOT EXIST .git (

    )
)
EXIT /B O

:Menu
echo =========================
echo = BlindCode - Mons 2022 =
echo =========================
echo 1. Installer Git
echo 2. Installer Gh - GitHub CLI
echo 3. Installer VSCode
echo 4. Installer OpenJDK d'Oracle
echo 5. Installer Extensions Java pour VSCode
echo 6. Installer NVDA
echo =========================================
CALL :IsGitConfigured && ( 
    echo 7. Configurer Git: Git est deja configure.
) || (
echo 7. Configurer Git
)

CALL :IsAuth && (    
    echo 8. Configurer Gh: Gh est deja configure.
) || (
    echo 8. Configurer Gh
)
echo =========================================
CALL :IsAuth && CALL :IsGitConfigured && (
    echo 9. Creer le depot EqlaExercice sur GitHub.    
) || (
    echo 9. Creer le depot EqlaExercice sur GitHub [Git et Gh doivent configures avant !]
)
echo =========================================
echo 10. Quitter
echo.
set /p choix=Votre choix ?
echo.

if %choix% LEQ  0 CALL :Menu
if %choix% GEQ 11 CALL :Menu

if %choix%  EQU 1 CALL :Git
if %choix%  EQU 2 CALL :Gh
if %choix%  EQU 3 CALL :VSCode
if %choix%  EQU 4 CALL :OpenJDK
if %choix%  EQU 5 CALL :ExtensionsVSCode
if %choix%  EQU 6 CALL :NVDA

if %choix%  EQU 7 CALL :ConfigureGit
if %choix%  EQU 8 CALL :ConfigureGh
if %choix%  EQU 9 CALL :CreateRepository
if %choix%  EQU 10 GOTO :End

GOTO :Menu



:End
echo.
echo Bonne journee !



