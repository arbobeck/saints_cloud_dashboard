# Byzantica

## Overview
A web app that displays information about saints, feast days, and Byzantine Catholicism.

**Technologies & Practices:**
- DevOps, Azure Security, CI/CD
- Infrastructure as Code
- Azure Key Vault integration
- Managed Identity
- Monitoring with Grafana

---

## Architecture
- **Frontend:** Angular 18  
- **Backend:** .NET 8 Web API  
- **Infrastructure:** Terraform + Azure App Services, SQL  
- **Security:** Azure Key Vault, RBAC, Managed Identity  
- **Monitoring:** Grafana, Azure Monitor  
- **CI/CD:** Azure DevOps Pipelines

---

## Project Structure
- api/ - .NET Web API
- ui/ - Angular frontend (hosted in Azure App Service)
- infra/ - Terraform scripts for infrastructure
- pipelines/ - Azure DevOps YAML pipelines
- docs/ - Documentation (also contains SQL seed file)

## Setup
1. **Database:** SQL Server (port 1433)  
2. **Backend:** .NET API (port 5000) – RESTful API with Swagger  
3. **Frontend:** Angular (port 4200)  

**After cloning the repository:**
```bash
cp .env.example .env
# Then edit .env with actual values
```
Running Dev

From the root directory (/saints_cloud_dashboard):
```bash
docker compose --profile dev up -d
```

Running Prod

From the root directory (/saints_cloud_dashboard):
```bash
docker compose --profile prod up -d
```

## Next Steps
1. Set up Single-Sign-On (SSO)
2. Add caching layer between server and database (Azure alternative to Redis)
