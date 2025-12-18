#!/bin/bash
sudo systemctl daemon-reload
sudo systemctl start homecenter
sudo systemctl enable homecenter   # start przy uruchomieniu system
sudo systemctl status homecenter