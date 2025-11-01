terraform {
  required_providers {
    azurerm = {
        source = "hashicorp/azurerm"
        version = "~> 4.0"
    }
  }    
    
  required_version = ">= 1.9.0"  
}

provider "azurerm" {
    features{}

    #get terraform to use azure cli credentials:
    use_cli = true
    subscription_id = "f1e6688f-eabd-4395-9133-77386b59c705"
}