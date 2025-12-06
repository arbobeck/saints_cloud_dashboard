FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["SaintsApi/SaintsApi.csproj", "SaintsApi/"]
RUN dotnet restore "SaintsApi/SaintsApi.csproj"

COPY SaintsApi/ SaintsApi/
WORKDIR "/src/SaintsApi"
RUN dotnet build "SaintsApi.csproj" -c Release -o /app/build
RUN dotnet publish "SaintsApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "SaintsApi.dll"]