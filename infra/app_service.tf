resource "azurerm_app_service_plan" "plan" {
  name                = "saints-plan"
  location            = azurerm_resource_group.saints_rg.location
  resource_group_name = azurerm_resource_group.saints_rg.name
  kind                = "Linux"
  reserved            = true
  sku {
    tier = "Basic"
    size = "B1"
  }
}

# API App
resource "azurerm_app_service" "api" {
  name                = "saints-api"
  location            = azurerm_resource_group.saints_rg.location
  resource_group_name = azurerm_resource_group.saints_rg.name
  app_service_plan_id = azurerm_app_service_plan.plan.id

  site_config {
    linux_fx_version = "DOCKER|${azurerm_container_registry.acr.login_server}/saints-api:${var.api_image_tag}"
  }

  app_settings = {
    "ASPNETCORE_ENVIRONMENT"     = var.environment
    "ConnectionStrings__SaintsDb" = "Server=${azurerm_sql_server.main.fully_qualified_domain_name};Database=${azurerm_sql_database.main.name};User Id=${var.sql_admin_user};Password=${var.sql_admin_password};Encrypt=true;"
    "DOCKER_REGISTRY_SERVER_URL" = "https://${azurerm_container_registry.acr.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME" = azurerm_container_registry.acr.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD" = azurerm_container_registry.acr.admin_password
  }
}

# UI App
resource "azurerm_app_service" "ui" {
  name                = "saints-ui"
  location            = azurerm_resource_group.saints_rg.location
  resource_group_name = azurerm_resource_group.saints_rg.name
  app_service_plan_id = azurerm_app_service_plan.plan.id

  site_config {
    linux_fx_version = "DOCKER|${azurerm_container_registry.acr.login_server}/saints-ui:${var.ui_image_tag}"
  }

  app_settings = {
    "ASPNETCORE_ENVIRONMENT" = var.environment
    "DOCKER_REGISTRY_SERVER_URL" = "https://${azurerm_container_registry.acr.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME" = azurerm_container_registry.acr.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD" = azurerm_container_registry.acr.admin_password
  }
}
