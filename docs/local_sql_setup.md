
## create local Docker SQL server with dummy password

# create the volume
docker volume create saints-sql-data

# run the SQL server with the volume
docker run -e "ACCEPT_EULA=Y" \
           -e "SA_PASSWORD=YourPassword123" \
           -p 1433:1433 \
           --name saints-sql \
           -v saints-sql-data:/var/opt/mssql \
           -d mcr.microsoft.com/mssql/server:2022-latest

# open Azure Data Studio 
Create a connection:
Server: localhost,1433
Auth type: SQL Login
Username: SA
Password: YourPassword123