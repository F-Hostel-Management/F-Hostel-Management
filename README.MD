dotnet ef database update --context ApplicationDbContext -p ./Persistence/Infrastructure.csproj -s ./Api/Api.csproj
dotnet ef migrations add name_migration --context ApplicationDbContext -p ./Persistence/Infrastructure.csproj -s ./Api/Api.csproj
