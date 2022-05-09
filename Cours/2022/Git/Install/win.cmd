:createDirectoryRepo 
    if NOT EXISTS %userprofile%\Documents\EqlaExercices (
        cd %userprofile%\Documents\
        gh repo create EqlaExercices --public --clone

        if EXIST EqlaExercices (
            cd EqlaExercices
            mkdir js java git github html accessibilite css db laravel intro

            curl -f -s https://zamboyle.github.io/Cours/2022/Git/Install/gitignore.txt -o .gitignore
            curl -O -f -s https://zamboyle.github.io/Cours/2022/Git/Install/update.txt

            IF EXIST update.cmd (
                echo pause >> update.cmd
                update.cmd            
            ) ELSE (
                echo problème pour télécharger le fichier update.cmd
            )
        )
    )
EXIT /B 0


:authOnGitHub
EXIT /B 0




IF NOT EXISTS %userprofile%\Documents\EqlaExercices (
    cd %userprofile%\Documents\
    gh repo create EqlaExercices --public --clone
    IF EXIST EqlaExercices (
        cd EqlaExercices
        mkdir js java git github html accessibilite css db laravel intro

        curl -f -s https://zamboyle.github.io/Cours/2022/Git/Install/gitignore.txt -o .gitignore
        curl -O -f -s https://zamboyle.github.io/Cours/2022/Git/Install/update.cmd
        
        update.cmd
        IF NOT EXIST update.cmd (
            echo problème pour télécharger le fichier update.cmd
        )

        del /q ..\win.cmd
    )
)