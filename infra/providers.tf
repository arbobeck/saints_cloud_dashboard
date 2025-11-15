terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.51"
    }
  }
  required_version = ">= 1.9.0"
}

data "azurerm_client_config" "current" {}
