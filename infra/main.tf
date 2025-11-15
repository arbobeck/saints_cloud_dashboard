provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}

resource "azurerm_resource_group" "saints_rg" {
  name     = "saints-cloud-rg"
  location = var.location
}

resource "azurerm_container_registry" "acr" {
  name                     = "saintsacr${random_integer.suffix.result}"
  resource_group_name      = azurerm_resource_group.saints_rg.name
  location                 = azurerm_resource_group.saints_rg.location
  sku                      = "Basic"
  admin_enabled            = true
}

resource "random_integer" "suffix" {
  min = 1000
  max = 9999
}
