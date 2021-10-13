resource "digitalocean_droplet" "jenkins" {
    image  = "ubuntu-18-04-x64"
    name   = "jenkins"
    region = "nyc1"
    size   = "s-4vcpu-8gb"
    user_data = file("install-jenkins.sh")
    ssh_keys  = ["${digitalocean_ssh_key.macos_jose.fingerprint}"]
}

# resource "digitalocean_certificate" "cert" {
#     name    = "cert"
#     type    = "lets_encrypt"
#     domains = [var.jenkins_domain, var.dev_domain]

#     # lifecycle {
#     #     create_before_destroy = true
#     # }
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


resource "digitalocean_record" "jenkins" {
    domain = digitalocean_domain.josechavarria.name
    type   = "A"
    name   = "jenkins"
    ttl    = "30"
    # value  = "${digitalocean_loadbalancer.jenkins.ip}"digitalocean_droplet
    value  = "${digitalocean_droplet.jenkins.ipv4_address}"
}





