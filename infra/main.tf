resource "azurerm_resource_group" "saints_rg" {
    name = "saints-cloud-rg"
    location = "West Europe"
    
    app_settings = {
    "ASPNETCORE_ENVIRONMENT"     = var.environment
    "ConnectionStrings__SaintsDb" = "Server=${azurerm_sql_server.main.fully_qualified_domain_name};Database=${azurerm_sql_database.main.name};User Id=${var.sql_admin_user};Password=${var.sql_admin_password};Encrypt=true;"
    "DOCKER_REGISTRY_SERVER_URL" = "https://${azurerm_container_registry.acr.login_server}"
  }
}