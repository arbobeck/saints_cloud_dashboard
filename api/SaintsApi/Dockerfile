FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ["SaintsApi.csproj", "./"]
RUN dotnet restore "SaintsApi.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "SaintsApi.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "SaintsApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "SaintsApi.dll"]