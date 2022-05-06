cd %userprofile%\Documents
gh repo create EqlaExercices --public --clone
IF EXIST EqlaExercices (
cd EqlaExercices
mkdir js java git github html accessibilite css db laravel Intro 2>NUL

curl -f -s https://zamboyle.github.io/Cours/2022/Git/Install/gitignore.txt -o .gitignore
curl -O -f -s https://zamboyle.github.io/Cours/2022/Git/Install/update.cmd

rd /s /q ..\win.cmd
IF NOT EXIST update.cmd (
   echo problème pour télécharger le fichier update.cmd
)
)