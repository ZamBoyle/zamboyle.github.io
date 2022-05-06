REM gh repo create EqlaExercices --public --clone
REM @echo off
cls
cd %userprofile%\Documents
mkdir EqlaExercices
IF EXIST EqlaExercices (
cd EqlaExercices
mkdir js java git github html css db laravel 2>NUL

curl -f -s https://zamboyle.github.io/Cours/2022/Git/Install/gitignore.txt -o .gitignore
curl -O -f -s https://zamboyle.github.io/Cours/2022/Git/Install/update.cmd
IF NOT EXIST update.cmd (
   echo problème pour télécharger le fichier update.cmd
)
)