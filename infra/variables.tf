variable "sql_admin_password" {
  description = "SQL Server admin password"
  type        = string
  sensitive   = true
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "api_image_tag" {
  description = "Docker image tag for API"
  type        = string
  default     = "latest"
}