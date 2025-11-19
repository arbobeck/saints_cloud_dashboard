resource "random_integer" "suffix" {
  min = 1000
  max = 9999
}

resource "azurerm_mssql_server" "main" {
  name                         = "saints-sql-server-${random_integer.suffix.result}"
  resource_group_name          = azurerm_resource_group.saints_rg.name
  location                     = azurerm_resource_group.saints_rg.location
  version                      = "12.0"
  administrator_login          = "sqladmin"
  administrator_login_password = var.sql_admin_password
  minimum_tls_version          = "1.2"
  public_network_access_enabled = true
}

resource "azurerm_mssql_database" "main" {
  name      = "SaintsDB"
  server_id = azurerm_mssql_server.main.id
  sku_name  = "Basic"
}

resource "azurerm_mssql_firewall_rule" "allow_azure" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}