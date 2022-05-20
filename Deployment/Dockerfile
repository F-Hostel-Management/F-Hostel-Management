FROM mcr.microsoft.com/dotnet/aspnet:6.0

ARG PORT
ENV PORT=$PORT

COPY . /app
WORKDIR /app

RUN ls -R

ENTRYPOINT ["dotnet", "Api.dll"]