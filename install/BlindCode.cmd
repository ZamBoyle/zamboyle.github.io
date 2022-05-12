@Echo off
SetLocal EnableDelayedExpansion

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

CALL :IsGitInstalled && (
    git config --global --list | findstr  "user.mail user.name" > NULL 2>&1 && (
        EXIT /B 0
    ) || (
        EXIT /B 1
    )
) || (
    EXIT /B 1
)

:IsGitInstalled
git --version >nul 2>&1 && (
    EXIT /B 0
) || (
    EXIT /B 1
)

:IsGhInstalled
gh --version >nul 2>&1 && (
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
git config --global core.safecrlf false
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

:CreateRepo
    if NOT EXIST %userprofile%\Documents\EqlaExercices (
        cd %userprofile%\Documents\

        gh repo delete EqlaExercices --confirm
        gh repo create EqlaExercices --public --clone

        if EXIST EqlaExercices (
            cd EqlaExercices
            for %%i in (js java git github html accessibilite css db laravel intro) do mkdir %%i && type NUL > %%i\.gitkeep && attrib +h %%i\.gitkeep

            echo @echo off >> EqlaUpdate.cmd

            curl -f -s https://zamboyle.github.io/install/gitignore.txt -o .gitignore
            curl -f -s https://zamboyle.github.io/install/update.txt >> EqlaUpdate.cmd

            IF EXIST EqlaUpdate.cmd (
                echo. >> EqlaUpdate.cmd
                echo pause >> EqlaUpdate.cmd
                git add .
                git commit -m "Initial Commit"
                git config --global --add safe.directory %userprofile%\Documents\EqlaExercices                
                git push --set-upstream origin master
            ) ELSE (
                echo probleme pour telecharger le fichier update.cmd
            )
        )
        cd %userProfile%\tmp\
    )
EXIT /B 0

:Menu
echo =========================
echo = BlindCode - Mons 2022 =
echo =========================

CALL :IsGitInstalled && ( echo 1. Reinstaller Git.) || ( echo 1. Installer Git)
CALL :IsGhInstalled && ( echo 2. Reinstaller Gh.) || ( echo 2. Installer Gh)
CALL :IsGitInstalled && (
    CALL :IsGitConfigured && ( 
        echo 3. Configurer Git: DEJA CONFIGURE.
    ) || (
        echo 3. Configurer Git
    )
)

CALL :IsGhInstalled && (
    CALL :IsAuth && (    
        echo 4. Configurer Gh: DEJA CONFIGURE.
    ) || (
        echo 4. Configurer Gh
    )
)

CALL :IsAuth && CALL :IsGitConfigured && (
    echo 5. Creer le depot EqlaExercice sur GitHub.    
)

echo =========================
echo 6. Quitter
echo.
set /p choix=Votre choix ?
echo.

if %choix% LEQ  0 CALL :Menu
if %choix% GEQ 7 CALL :Menu

if %choix%  EQU 1 CALL :Git
if %choix%  EQU 2 CALL :Gh
if %choix%  EQU 3 CALL :ConfigureGit
if %choix%  EQU 4 CALL :ConfigureGh
if %choix%  EQU 5 CALL :CreateRepo
if %choix%  EQU 6 GOTO :End

GOTO :Menu

:End
echo.
echo Bonne journee !



