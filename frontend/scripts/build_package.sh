#!/bin/bash
npm run build
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx