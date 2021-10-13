variable "public_key" {}
variable "domain" {
    type    = string
    default = "josechavarria.xyz"
}
resource "digitalocean_ssh_key" "macos_jose" {
    name = "macos_jose"
    public_key = file(var.public_key)
}

resource "digitalocean_domain" "josechavarria" {
    name = var.domain
}