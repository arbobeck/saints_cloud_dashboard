data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "saints_rg" {
  name     = "saints-cloud-rg"
  location = "westeurope"
}

resource "azurerm_service_plan" "saints_plan" {
  name                = "saints-plan"
  resource_group_name = azurerm_resource_group.saints_rg.name
  location            = azurerm_resource_group.saints_rg.location
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "saints_api" {
  name                = "saints-api-1112025"
  resource_group_name = azurerm_resource_group.saints_rg.name
  location            = azurerm_service_plan.saints_plan.location
  service_plan_id     = azurerm_service_plan.saints_plan.id

  site_config {
    always_on = true
    application_stack {
      dotnet_version = "8.0"
    }
  }

  app_settings = {
    "ASPNETCORE_ENVIRONMENT"              = "Production"
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
  }
}

resource "azurerm_linux_web_app" "saints_ui" {
  name                = "saints-ui-1112025"
  resource_group_name = azurerm_resource_group.saints_rg.name
  location            = azurerm_service_plan.saints_plan.location
  service_plan_id     = azurerm_service_plan.saints_plan.id

  site_config {
    always_on = true
    application_stack {
      node_version = "18-lts"
    }
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
  }
}