#!/bin/bash

# Klonowanie repozytorium
git clone git@github.com:Szesny32/HomeCenter.git /home/szesny/repos/HomeCenter

# Kopiowanie pliku serwisu systemd
sudo cp homecenter_service.txt /etc/systemd/system/homecenter.service

# start
sudo mysql -u root -p <<EOF
CREATE DATABASE IF NOT EXISTS HOME_CENTER_DB;
CREATE USER IF NOT EXISTS 'HOME_CENTER_USER'@'localhost' IDENTIFIED BY 'HOME_CENTER_PASSWORD';
GRANT ALL PRIVILEGES ON HOME_CENTER_DB.* TO 'HOME_CENTER_USER'@'localhost';
FLUSH PRIVILEGES;
EOF