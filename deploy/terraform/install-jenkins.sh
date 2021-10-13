#! /bin/bash
sudo apt update
sudo apt install -y git
sudo curl -sSL https://get.docker.com/ | sh
sudo systemctl start docker
sudo systemctl enable docker
sudo apt install -y docker-compose
cd /home/ && sudo git clone https://github.com/josechavarriacr/POC-DevOps.git
cd /home/POC-DevOps/deploy/jenkins  && sudo docker-compose up --build -d

# sudo apt-get install -y apache2
# sudo systemctl start apache2
# sudo systemctl enable apache2
# echo "this is Jenkins" | sudo tee /var/www/html/index.html