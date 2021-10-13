
variable "jenkins_domain" {
    type    = string
    default = "jenkins.josechavarria.xyz"
}

resource "digitalocean_droplet" "jenkins" {
    image  = "ubuntu-18-04-x64"
    name   = "jenkins"
    region = "nyc1"
    size   = "s-2vcpu-2gb-intel"
    user_data = file("install-jenkins.sh")
    ssh_keys  = ["${digitalocean_ssh_key.macos_jose.fingerprint}"]
}

# resource "digitalocean_certificate" "cert" {
#     name    = "cert"
#     type    = "lets_encrypt"
#     domains = [var.jenkins_domain]

#     lifecycle {
#         create_before_destroy = true
#     }
# }

# resource "digitalocean_loadbalancer" "jenkins" {
#     name   = "jenkins"
#     region = "nyc1"

#     forwarding_rule {
#         entry_port     = 443
#         entry_protocol = "https"

#         target_port     = 80
#         target_protocol = "http"

#         certificate_name = digitalocean_certificate.cert.name
#     }

#     healthcheck {
#         port     = 22
#         protocol = "tcp"
#     }

#     droplet_ids = [digitalocean_droplet.jenkins.id]
# }


# resource "digitalocean_domain" "jenkins" {
#    name = var.jenkins_domain
#    ip_address = digitalocean_loadbalancer.jenkins.ip
# }

# output "digitalocean_loadbalancer_ip" {
#     value = digitalocean_loadbalancer.jenkins.ip
# }




