
variable "jenkins_domain" {
    type    = string
    default = "jenkins.josechavarria.xyz"
}
variable "dev_domain" {
    type    = string
    default = "dev.josechavarria.xyz"
}


resource "digitalocean_droplet" "jenkins" {
    image  = "ubuntu-18-04-x64"
    name   = "jenkins"
    region = "nyc1"
    size   = "s-2vcpu-2gb-intel"
    user_data = file("install-jenkins.sh")
    ssh_keys  = ["${digitalocean_ssh_key.macos_jose.fingerprint}"]
}

resource "digitalocean_droplet" "dev" {
    image  = "ubuntu-18-04-x64"
    name   = "dev"
    region = "nyc1"
    size   = "s-2vcpu-2gb-intel"
    user_data = file("install-dev.sh")
    ssh_keys  = ["${digitalocean_ssh_key.macos_jose.fingerprint}"]
}

resource "digitalocean_certificate" "cert" {
    name    = "cert"
    type    = "lets_encrypt"
    domains = [var.jenkins_domain, var.dev_domain]

    lifecycle {
        create_before_destroy = true
    }
}

resource "digitalocean_loadbalancer" "loadbalancer" {
    name   = "loadbalancer"
    region = "nyc1"

    forwarding_rule {
        entry_port     = 443
        entry_protocol = "https"

        target_port     = 80
        target_protocol = "http"

        certificate_name = digitalocean_certificate.cert.name
    }

    healthcheck {
        port     = 22
        protocol = "tcp"
    }

    droplet_ids = [digitalocean_droplet.jenkins.id, digitalocean_droplet.dev.id]
}


resource "digitalocean_record" "www" {
    domain = digitalocean_domain.josechavarria.name
    type   = "A"
    name   = "jenkins"
    ttl    = "30"
    value = digitalocean_loadbalancer.loadbalancer.ip
}
resource "digitalocean_record" "dev" {
    domain = digitalocean_domain.josechavarria.name
    type   = "A"
    name   = "dev"
    ttl    = "30"
    value = digitalocean_loadbalancer.loadbalancer.ip
}

output "digitalocean_loadbalancer_ip" {
    value = digitalocean_loadbalancer.loadbalancer.ip
}




