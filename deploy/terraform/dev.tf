resource "digitalocean_droplet" "dev" {
    image  = "ubuntu-18-04-x64"
    name   = "dev"
    region = "nyc1"
    size   = "s-4vcpu-8gb"
    user_data = file("install-dev.sh")
    ssh_keys  = ["${digitalocean_ssh_key.macos_jose.fingerprint}"]
}

resource "digitalocean_record" "dev" {
    domain = digitalocean_domain.josechavarria.name
    type   = "A"
    name   = "dev"
    ttl    = "30"
    value  = "${digitalocean_droplet.dev.ipv4_address}"
}





