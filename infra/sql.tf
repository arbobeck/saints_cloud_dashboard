resource "azurerm_mssql_server" "main" {
  name                         = "saintssql${random_integer.suffix.result}"
  resource_group_name          = azurerm_resource_group.saints_rg.name
  location                     = azurerm_resource_group.saints_rg.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_user
  administrator_login_password = var.sql_admin_password
}

resource "azurerm_mssql_database" "main" {
  name      = "SaintsDB"
  server_id = azurerm_mssql_server.main.id
  sku_name  = "Basic"
}
