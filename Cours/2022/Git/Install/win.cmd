REM gh repo create EqlaExercices --public --clone
REM @echo off
cls
rd /s /q .
mkdir EqlaExercices
IF EXIST EqlaExercices (
cd EqlaExercices

mkdir js
mkdir java
mkdir git
mkdir github
mkdir html
mkdir css
mkdir db
mkdir laravel

curl -f -s https://zamboyle.github.io/Cours/2022/Git/Install/.gitignore.txt -o .gitignore
curl -O -f -s https://zamboyle.github.io/Cours/2022/Git/Install/update.cmd
IF NOT EXIST update.cmd (
   echo problème pour télécharger le fichier update.cmd
)