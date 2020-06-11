#!/usr/bin/env bash

COLUMNS=20
PS3='Please enter your choice: '
options=("Start" "Start Home" "Provision" "Build" "Build with provision" "SSH" "Stop" "Destroy" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Start")
            echo "Start project VM"
            cd provision
            vagrant up --no-provision
            cd ..
            ;;
        "Start Home")
            echo "Start project VM when in home office (VPN)"
            cd provision
            USE_HOSTMANAGER=true vagrant up --no-provision
            cd ..
            ;;
        "Provision")
            echo "Start project provision"
            cd provision
            vagrant provision
            cd ..
            ;;
        "Build")
            echo "Start project build"
            cd build
            ansible-galaxy install -r requirements.yml --roles-path ~/.ansible/roles --force
            ansible-playbook build.yml -i ../env/dev/inventory.py --tags build --limit webservers -u vagrant --private-key=~/.vagrant.d/insecure_private_key --vault-password-file=../vault_pass
            cd ..
            ;;
        "Build with provision")
            echo "Start project build with provision"
            cd build
            ansible-galaxy install -r requirements.yml --roles-path ~/.ansible/roles --force
            ansible-playbook build.yml -i ../env/dev/inventory.py --tags build,provision --limit webservers -u vagrant --private-key=~/.vagrant.d/insecure_private_key --vault-password-file=../vault_pass
            cd ..
            ;;
        "SSH")
            echo "Enter VM"
            cd provision
            vagrant ssh
            cd ..
            break
            ;;
        "Stop")
            echo "Stop project VM"
            cd provision
            vagrant halt
            cd ..
            break
            ;;
        "Destroy")
            echo "Destroy project VM"
            cd provision
            USE_HOSTMANAGER=true vagrant destroy
            cd ..
            break
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
    REPLY=
done
