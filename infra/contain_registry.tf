resource "azurerm_container_registry" "acr" {
  name                = "saintsacr${random_integer.suffix.result}"
  resource_group_name = azurerm_resource_group.saints_rg.name
  location            = azurerm_resource_group.saints_rg.location
  sku                 = "Basic"
  admin_enabled       = true
}