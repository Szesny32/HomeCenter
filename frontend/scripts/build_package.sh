#!/bin/bash
npm run build
sudo sudo cp -r ./../dist/* /var/www/html/
sudo systemctl restart nginx