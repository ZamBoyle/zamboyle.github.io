#!/bin/bash
if [[ ! -f ~/EqlaExercices ]] 
then
    cd ~
    gh repo create EqlaExercices --public --clone
    if [[ -f EqlaExercices ]] 
    then
        cd EqlaExercices
        mkdir js java git github html accessibilite css db laravel intro

        curl -f -s https://zamboyle.github.io/Cours/2022/Git/Install/gitignore.txt -o .gitignore
        curl -f -s https://zamboyle.github.io/Cours/2022/Git/Install/update.cmd -o update.sh

        if [[  -f update.sh ]] 
        then
            chmod +x update.sh
            ./update.sh
        else
            echo problème pour télécharger le fichier update.sh
        fi
        rm ../ubuntu.sh
    fi
fi