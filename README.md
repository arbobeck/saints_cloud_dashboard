Saints & Feast Days Cloud Dashboard

Overview:
A secure, cloud-hosted webapp built on Azure that display information about saints, feast days, and history + a quiz and a dashboard.

- DevOps, Azure Sec, CI/CD, Infrastructure as Code, Key Vault integration, Managed Identity, and monitoring with Grafana.

Architecture:
- Angular 18
- .NET 8 Web API
- Terraform + Azure App Services, SQL
- Azure Key Vault, RBAC, Managed Identity
- Grafana, Azure Monitor
- Azure DevOps Pipelines

Structure:
- api/ - .NET API
- ui/ - Angular (hosted in Azure App Service)
- infra/ - Terraform
- piplines/ - Azure DevOps YAML pipelines
- docs/ - documentation (also currently holds the sql seed file)

Setup:
SQL Server (port 1433)
.NET API (port 5000) - RESTful API with Swagger
Angular (port 4200)

Next steps:
- set up Single-Sign-On
- add caching layer between server + database (Azure alternative to Reddis)

Run:
1. navigate to root directory
2. run  docker compose build --no-cache                             
        docker compose up