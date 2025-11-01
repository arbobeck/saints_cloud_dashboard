# create key vault

resource "azurerm_key_vault" "saints_kv" {
    name        = "saints-kv-1112025"
    resource_group_name = azurerm_resource_group.saints_rg.name
    location    = azurerm_resource_group.saints_rg.location
    tenant_id   = data.azurerm_client_config.current.tenant_id
    sku_name    = "standard"
    purge_protection_enabled = false
    rbac_authorization_enabled = true


    network_acls {
        default_action = "Allow"
        bypass         = "AzureServices"
    }
}


# store SQL admin password as a secret

resource "azurerm_key_vault_secret" "sql_admin_password" {
    name        = "SqlAdminPassword"
    value       = "Password123?"
    key_vault_id = azurerm_key_vault.saints_kv.id
}