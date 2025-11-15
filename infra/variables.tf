variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "sql_admin_user" {
  description = "SQL admin username"
  type        = string
  default     = "sa"
}

variable "sql_admin_password" {
  description = "SQL admin password"
  type        = string
  sensitive   = true
}

variable "api_image_tag" {
  description = "Docker image tag for API"
  type        = string
  default     = "latest"
}

variable "ui_image_tag" {
  description = "Docker image tag for Angular UI"
  type        = string
  default     = "latest"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "West Europe"
}
