#!/bin/bash
function createDirectoryRepo () {
    if [[ ! -f ~/EqlaExercices ]] 
    then
        cd ~
        gh repo create EqlaExercices --public --clone
        if [[ -d ~/EqlaExercices ]] 
        then
            cd EqlaExercices
            mkdir js java git github html accessibilite css db laravel intro

            curl -f -s https://zamboyle.github.io/install/gitignore.txt -o .gitignore
            curl -f -s https://zamboyle.github.io/install/update.txt -o update.sh

            if [[  -f update.sh ]] 
            then
                chmod +x update.sh
                ./update.sh
            else
                echo problème pour télécharger le fichier update.sh
            fi
        fi
    fi
}

function authOnGitHub () {
    while(!(gh auth status --hostname "github.com" > /dev/null 2>&1))
    do
        gh auth login -s delete_repo
    done
}

if (gh auth status --hostname "github.com" > /dev/null 2>&1); 
then
    createDirectoryRepo
else
    echo 'Vous devez être authentifié sur GitHub avec gh auparant.'
    authOnGitHub
    createDirectoryRepo
fi