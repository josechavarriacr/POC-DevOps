#! /bin/bash
sudo apt-get update
# sudo apt-get install -y apache2
# sudo systemctl start apache2
# sudo systemctl enable apache2
# echo "This is Development" | sudo tee /var/www/html/index.html


sudo curl -sSL https://get.docker.com/ | sh
sudo systemctl start docker
sudo systemctl enable docker