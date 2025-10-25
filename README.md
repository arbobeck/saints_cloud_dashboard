Saints & Feast Days Cloud Dashboard

Overview:
A secure, cloud-hosted webapp built on Azure that display information about saints, feast days, and history + a quiz and a dashboard.

- DevOps, Azure Sec, CI/CD, Infrastructure as Code, Key Vault integration, Managed Identity, and monitoring with Grafana.

Architecture:
- Angular 18
- .NET 8 Web API
- Terraform + Azure App Services, SQL
- Azure Key Vault, RBAC, Managed Identity,
- Grafana, Azure Monitor
- Azure DevOps Pipelines

Structure:
- api/ - .NET API
- ui/ - Angular
- infra/ - Terraform
- piplines/ - Azure DevOps YAML pipelines
- docs/ - documentation

Next steps:
- create the mvp: API + containerize
- Angular dashboard
- infra with Terraform + automate CI/CD
