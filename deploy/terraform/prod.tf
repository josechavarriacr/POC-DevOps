resource "digitalocean_droplet" "prod" {
    image  = "ubuntu-18-04-x64"
    name   = "prod"
    region = "nyc1"
    size   = "s-4vcpu-8gb"
    user_data = file("install-prod.sh")
    ssh_keys  = ["${digitalocean_ssh_key.macos_jose.fingerprint}"]
}

resource "digitalocean_record" "prod" {
    domain = digitalocean_domain.josechavarria.name
    type   = "A"
    name   = "prod"
    ttl    = "30"
    value  = "${digitalocean_droplet.prod.ipv4_address}"
}





