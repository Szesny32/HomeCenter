#!/bin/bash
sudo systemctl stop homecenter
sudo systemctl disable homecenter
sudo rm /etc/systemd/system/homecenter.service
sudo systemctl daemon-reload
