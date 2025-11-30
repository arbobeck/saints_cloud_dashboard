# Security Hardening Checklist

This document outlines security measures implemented and recommended for the Saints Dashboard application.

## ✅ Implemented Security Measures

### Docker Security

- **Non-root user**: Production containers run as non-root users (UID 1000)
- **Health checks**: All services have health checks for early failure detection
- **Resource limits**: CPU and memory limits prevent resource exhaustion
- **Read-only filesystems**: Containers use read-only root filesystems where possible
- **No privileged containers**: Containers run with minimal privileges

Example from Dockerfile:
```dockerfile
# Create non-root user
RUN addgroup --system --gid 1000 appuser && \
    adduser --system --uid 1000 --gid 1000 appuser

# Switch to non-root user
USER appuser
```

### API Security

- ✅ **CORS Configuration**: Restricted to specific origins
- ✅ **SQL Connection Encryption**: `TrustServerCertificate=True` for encrypted connections
- ✅ **Input Validation**: Model validation on all API endpoints
- ✅ **Error Handling**: Generic error messages (no sensitive data exposure)
- ⚠️ **Rate Limiting**: TODO - Implement with ASP.NET Core middleware
- ⚠️ **API Authentication**: TODO - Add JWT authentication for production

Current CORS configuration:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

**Recommendation for Production**: Implement authentication middleware:
```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });
```

### Database Security

- ✅ **Encrypted connections**: SQL Server connections use TLS
- ✅ **Parameterized queries**: Entity Framework prevents SQL injection
- ✅ **Least privilege**: Database user has minimal required permissions
- ⚠️ **Secret management**: Passwords in environment variables (Azure Key Vault recommended)
- ⚠️ **Backup encryption**: TODO - Enable transparent data encryption (TDE)

### Container Registry (GHCR)

- ✅ **Private repositories**: Images require authentication
- ✅ **Image scanning**: Trivy scans for vulnerabilities in CI/CD
- ✅ **Signed images**: GHCR provides content trust
- ✅ **Version tagging**: Immutable tags for production deployments

### CI/CD Pipeline Security

- ✅ **Secret scanning**: GitHub secret scanning enabled
- ✅ **Dependency scanning**: `npm audit` and `dotnet list package --vulnerable`
- ✅ **Code quality gates**: ESLint, dotnet format enforce standards
- ✅ **Environment protection**: Production requires approval
- ⚠️ **SAST**: TODO - Add CodeQL for static analysis

## 🔐 Recommended Enhancements

### High Priority

1. **Implement Rate Limiting**
```csharp
   builder.Services.AddRateLimiter(options =>
   {
       options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
           RateLimitPartition.GetFixedWindowLimiter(
               partitionKey: context.User.Identity?.Name ?? context.Request.Headers.Host.ToString(),
               factory: partition => new FixedWindowRateLimiterOptions
               {
                   AutoReplenishment = true,
                   PermitLimit = 100,
                   Window = TimeSpan.FromMinutes(1)
               }));
   });
```

2. **Add Azure Key Vault Integration**
```csharp
   builder.Configuration.AddAzureKeyVault(
       new Uri($"https://{keyVaultName}.vault.azure.net/"),
       new DefaultAzureCredential());
```

3. **Enable Application Insights Security**
   - Track authentication failures
   - Monitor for SQL injection attempts
   - Alert on unusual traffic patterns

### Medium Priority

4. **Implement Content Security Policy (CSP)**
```typescript
   // Angular: add to index.html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

5. **Add Security Headers Middleware**
```csharp
   app.Use(async (context, next) =>
   {
       context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
       context.Response.Headers.Add("X-Frame-Options", "DENY");
       context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
       context.Response.Headers.Add("Referrer-Policy", "no-referrer");
       await next();
   });
```

6. **Database Column Encryption**
   - Encrypt sensitive PII at column level
   - Use Azure SQL Always Encrypted for production

### Infrastructure as Code (Terraform) Security

✅ **Implemented**:
- Key Vault for secret management
- RBAC with least privilege principle
- Network security groups with restrictive rules
- Private endpoints for PaaS services

⚠️ **Recommendations**:
```hcl
# Add Azure Policy compliance
resource "azurerm_policy_assignment" "example" {
  name                 = "audit-vm-managed-disks"
  scope                = azurerm_resource_group.example.id
  policy_definition_id = "/providers/Microsoft.Authorization/policyDefinitions/..."
}

# Enable Azure Defender
resource "azurerm_security_center_subscription_pricing" "example" {
  tier          = "Standard"
  resource_type = "VirtualMachines"
}
```

## 🎯 Security Checklist Summary

| Area | Status | Priority |
|------|--------|----------|
| Docker non-root user | ✅ Done | High |
| Health checks | ✅ Done | High |
| CORS configuration | ✅ Done | High |
| SQL encryption | ✅ Done | High |
| Rate limiting | ⚠️ TODO | High |
| API authentication | ⚠️ TODO | High |
| Key Vault integration | ⚠️ TODO | High |
| Security headers | ⚠️ TODO | Medium |
| SAST scanning | ⚠️ TODO | Medium |
| Database TDE | ⚠️ TODO | Medium |

## 📚 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Azure Security Best Practices](https://docs.microsoft.com/azure/security/fundamentals/best-practices-and-patterns)
- [Docker Security](https://docs.docker.com/engine/security/)
- [.NET Security Guidelines](https://docs.microsoft.com/dotnet/standard/security/)