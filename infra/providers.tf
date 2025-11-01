terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.51"
    }
  }
  required_version = ">= 1.9.0"
}

provider "azurerm" {
  features {}
  subscription_id = "f1e6688f-eabd-4395-9133-77386b59c705"
}

data "azurerm_client_config" "current" {}
