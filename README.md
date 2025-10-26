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
- docs/ - documentation

Next steps:
- create the mvp: API + containerize
- Angular dashboard
- infra with Terraform + automate CI/CD
- set up Single-Sign-On
- set up Docker-Compose
- add Entity Framework Core (EF Core) (ORM) to central server
- add caching layer between server + database (Azure alternative to Reddis)

Run locally (with Docker):
1. navigate to /saints_cloud_dashboard/api/SaintsApi
2. run 'docker build -t saintsapi .'
3. run 'docker run -p 5000:8080 saintsapi'
4. in the browser, go to: 'http://localhost:5000/api/saints'

Run locally (with Swagger):
1. run 'dotnet run'
1. in the browser, go to 'http://localhost:5259'