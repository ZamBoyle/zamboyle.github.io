cd EqlaExercices
mkdir js
mkdir java
mkdir git
mkdir github
mkdir html
mkdir css
mkdir db
mkdir laravel
echo update.bat > .gitignore
echo # Compiled class file >> .gitignore
echo *.class >> .gitignore
echo # Log file >> .gitignore
echo *.log >> .gitignore
echo # BlueJ files >> .gitignore
echo *.ctxt >> .gitignore
echo # Mobile Tools for Java (J2ME) >> .gitignore
echo .mtj.tmp/ >> .gitignore
echo # Package Files # >> .gitignore
echo *.jar >> .gitignore
echo *.war >> .gitignore
echo *.nar >> .gitignore
echo *.ear >> .gitignore
echo *.zip >> .gitignore
echo *.tar.gz >> .gitignore
echo *.rar >> .gitignore
echo # virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml >> .gitignore
echo hs_err_pid* >> .gitignore
echo replay_pid* >> .gitignore

echo git add . > update.bat
echo git commit -m "updates" >> update.bat