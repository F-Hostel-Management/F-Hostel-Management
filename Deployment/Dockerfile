FROM mcr.microsoft.com/dotnet/aspnet:6.0

ARG PORT
ENV PORT=$PORT

ARG ASPNETCORE_ENVIRONMENT
ENV ASPNETCORE_ENVIRONMENT=$ASPNETCORE_ENVIRONMENT

COPY . /app
WORKDIR /app

RUN ls -R -a

ENTRYPOINT ["dotnet", "Api.dll"]