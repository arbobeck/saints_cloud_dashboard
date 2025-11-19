output "resource_group_name" {
  value       = azurerm_resource_group.saints_rg.name
  description = "The name of the resource group"
}

output "api_url" {
  value       = "https://${azurerm_linux_web_app.saints_api.default_hostname}"
  description = "URL of the API"
}

output "ui_url" {
  value       = "https://${azurerm_linux_web_app.saints_ui.default_hostname}"
  description = "URL of the UI"
}

output "sql_server_fqdn" {
  value       = azurerm_mssql_server.main.fully_qualified_domain_name
  description = "Fully qualified domain name of the SQL server"
}

output "acr_login_server" {
  value       = azurerm_container_registry.acr.login_server
  description = "Login server of the Azure Container Registry"
}