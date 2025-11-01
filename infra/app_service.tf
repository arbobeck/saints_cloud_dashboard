# create hosting env: app service plan - Linux

resource "azurerm_service_plan" "saints_plan" {
    name        = "saints-plan"
    location    = azurerm_resource_group.saints_rg.location
    resource_group_name = azurerm_resource_group.saints_rg.name
    os_type     = "Linux"
    sku_name    = "B1"
}

# app services for the API

resource "azurerm_linux_web_app" "saints_api" {
    name        = "saints-api-1112025"
    location    = azurerm_resource_group.saints_rg.location
    resource_group_name = azurerm_resource_group.saints_rg.name
    service_plan_id = azurerm_service_plan.saints_plan.id

    site_config {
        app_command_line = ""
    }

    app_settings = {
        "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
        "ASPNETCORE_ENVIRONMENT" = "Production"
    }
}

# app services for the UI

resource "azurerm_linux_web_app" "saints_ui" {
    name        = "saints-ui-1112025"
    location    = azurerm_resource_group.saints_rg.location
    resource_group_name = azurerm_resource_group.saints_rg.name
    service_plan_id = azurerm_service_plan.saints_plan.id

    site_config {
        app_command_line = ""
    }

    app_settings = {
        "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    }
}