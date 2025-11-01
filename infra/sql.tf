

/*

# create sql server 

resource "azurerm_mssql_server" "saints_sql" {
    name        = "saints-sql-11120252"
    resource_group_name = azurerm_resource_group.saints_rg.name
    location    = azurerm_resource_group.saints_rg.location
    version     = "12.0"
    administrator_login = "sqladminuser"
    administrator_login_password = "Password123?"

    tags = {
        environment = "Dev"
    }
}

# create sql db

resource "azurerm_mssql_database" "saints_db" {
    name        = "saints-db-1112025"
    server_id = azurerm_mssql_server.saints_sql.id
    sku_name    = "Basic"
    max_size_gb = 2
}

*/