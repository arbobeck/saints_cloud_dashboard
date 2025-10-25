#Multistage Dockerfile (STAGE 1: build using full SDK, STAGE 2: use only runtime to make final image lighter)

# 1: build app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# 2: copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# 3: copy the rest of the code + build
COPY . ./
RUN dotnet publish -c Release -o out

# 4: create runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# 5: expose the port
EXPOSE 5000

# 6: command to run app
ENTRYPOINT [ "dotnet", "SaintsApi.dll" ]