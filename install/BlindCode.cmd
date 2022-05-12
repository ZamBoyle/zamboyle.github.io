@Echo off
SetLocal EnableDelayedExpansion


:Main
CALL :IsVSCodeInstalled

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

:IsVSCodeInstalled
set VSCODE_DEV=
set ELECTRON_RUN_AS_NODE=1
REM "%userprofile%\AppData\Local\Programs\Microsoft VS Code\bin\code.cmd" --version >nul 2>&1 && (
REM "%userprofile%\AppData\Local\Programs\Microsoft VS Code\Code.exe" "%userprofile%\AppData\Local\Programs\Microsoft VS Code\resources\app\out\cli.js" --ms-enable-electron-run-as-node --version >nul 2>&1 && (
IF EXIST "%userprofile%\AppData\Local\Programs\Microsoft VS Code\Code.exe" (
    EXIT /B 0
) ELSE (
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
for %%i in (ms-ceintl.vscode-language-pack-fr vscjava.vscode-java-pack onecentlin.laravel-extension-pack) do call "%userprofile%\AppData\Local\Programs\Microsoft VS Code\bin\code.cmd" --force --install-extension %%i
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

:EECreateRepositoryOLD
IF NOT EXIST %USERPROFILE%\Documents\EqlaExercices(
    Mkdir %USERPROFILE%\Documents\EqlaExercices
    cd %USERPROFILE%\Documents\EqlaExercices
) ELSE (
    IF NOT EXIST .git (

    )
)
EXIT /B 0

:CreateRepo
    if NOT EXIST %userprofile%\Documents\EqlaExercices (
        cd %userprofile%\Documents\

        gh repo delete EqlaExercices --confirm
        gh repo create EqlaExercices --public --clone

        if EXIST EqlaExercices (
            cd EqlaExercices
            rem mkdir js java git github html accessibilite css db laravel intro
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

:OpenJDK
REM curl -L https://aka.ms/download-jdk/microsoft-jdk-17.0.2.8.1-windows-x64.msi -o MSOpenJDK.msi
echo Telechargement d'OpenJDK
curl -L https://download.java.net/java/GA/jdk18.0.1.1/65ae32619e2f40f3a9af3af1851d6e19/2/GPL/openjdk-18.0.1.1_windows-x64_bin.zip -o openjdk.zip
rem culr -L https://aka.ms/download-jdk/microsoft-jdk-11.0.14.1_1-31205-windows-x64.msi -o ms-openjdk.msi
echo Fin du telechargement d'OpenJDK
echo Decompression d'openjdk
tar -zxvf openjdk.zip
echo Decompression terminee
move jdk-18.0.1.1 C:\PROGRA~1
REM setx /m PATH "%PATH%;C:\Progra~1\jdk-18.0.1.1\bin"
setx /m JAVA_HOME "C:\Progra~1\jdk-18.0.1.1"
set pathkey="HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment"
for /F "usebackq skip=2 tokens=2*" %%A IN (`reg query %pathkey% /v Path`) do (reg add %pathkey% /f /v Path /t REG_SZ /d "%%B;C:\Progra~1\jdk-18.0.1.1\bin")
rem msiexec ms-openjdk.msi /i ADDLOCAL=FeatureMain,FeatureEnvironment,FeatureJarFileRunWith,FeatureJavaHome INSTALLDIR="c:\Program Files\Microsoft\" /quiet

REM or set pathkey="HKEY_CURRENT_USER\Environment" for user path.
REM powershell -command "& {$md=\"[DllImport(`\"user32.dll\"\",SetLastError=true,CharSet=CharSet.Auto)]public static extern IntPtr SendMessageTimeout(IntPtr hWnd,uint Msg,UIntPtr wParam,string lParam,uint fuFlags,uint uTimeout,out UIntPtr lpdwResult);\"; $sm=Add-Type -MemberDefinition $md -Name NativeMethods -Namespace Win32 -PassThru;$result=[uintptr]::zero;$sm::SendMessageTimeout(0xffff,0x001A,[uintptr]::Zero,\"Environment\",2,5000,[ref]$result)}"
EXIT /B 0

:Menu
echo =========================
echo = BlindCode - Mons 2022 =
echo =========================

CALL :IsGitInstalled && ( echo 1. Installer Git : DEJA INSTALLE) || ( echo 1. Installer Git)
CALL :IsGhInstalled && ( echo 2. Installer Gh : DEJA INSTALLE) || ( echo 2. Installer Gh)
REM CALL :IsVSCodeInstalled && ( echo 3. Installer VSCode : DEJA INSTALLE) || ( echo 3. Installer VSCode)
REM echo 4. Installer VSCode Extensions: Java, Langue FR, Laravel Extension Pack
REM echo 5. Installer OpenJDK d'Oracle
REM echo 6. Installer NVDA
echo =========================================
CALL :IsGitConfigured && ( 
    echo 3. Configurer Git: Git est deja configure.
) || (
echo 3. Configurer Git
)

CALL :IsAuth && (    
    echo 4. Configurer Gh: Gh est deja configure.
) || (
    echo 4. Configurer Gh
)
echo =========================================
CALL :IsAuth && CALL :IsGitConfigured && (
    echo 5. Creer le depot EqlaExercice sur GitHub.    
) || (
    echo 5. Creer le depot EqlaExercice sur GitHub [Git et Gh doivent configures avant !]
)
echo =========================================
echo 6. Quitter
echo.
set /p choix=Votre choix ?
echo.

if %choix% LEQ  0 CALL :Menu
if %choix% GEQ 7 CALL :Menu

if %choix%  EQU 1 CALL :Git
if %choix%  EQU 2 CALL :Gh
REM if %choix%  EQU 3 CALL :VSCode
REM if %choix%  EQU 4 CALL :ExtensionsVSCode
REM if %choix%  EQU 5 CALL :OpenJDK
REM if %choix%  EQU 6 CALL :NVDA

if %choix%  EQU 3 CALL :ConfigureGit
if %choix%  EQU 4 CALL :ConfigureGh
if %choix%  EQU 5 CALL :CreateRepo
if %choix%  EQU 6 GOTO :End

GOTO :Menu

:End
echo.
echo Bonne journee !



