# e-commerce-client
<img width="960" alt="image" src="https://github.com/huynamboz/e-commerce-client/assets/38585889/a2f66248-3a4d-4d2b-adbc-500806b6f7f0">
[![ASP.NET](https://img.shields.io/badge/Made%20with-ASP.NET-blueviolet)](https://dotnet.microsoft.com/en-us/apps/aspnet/apis) 


A project in the PBL3 (Project Based Learning #3) course, Da Nang University of Science Technology.


## Features 

- Product management for sellers 
- Calculate shipping fee price 
- Order processing for buyers 
- Compare price to other e-commerce platforms

## Run server Locally

Clone the project

```bash
  git clone https://github.com/huynamboz/e-commerce-server.git
```

Checkout to branch "develop"

```bash
  git checkout develop
```

Run database migrations and seeds

```bash
  dotnet ef database update
```

Start the server

```bash
  dotnet run
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Read .env.example for more information.

##----------------------------------------------

## Run Front-end Locally

Clone the project

```bash
  git clone https://github.com/huynamboz/e-commerce-client.git
```

Checkout to branch "develop"

```bash
  git checkout develop
```

Install yarn or npm (search google please :>)

Install package
```bash
  npm i
```
or 
```bash
  yarn
```

Start the code

```bash
  yarn dev
```
or
```bash
  npm dev
```
create file .env in folder e-commerce-client, write BASE_URL_API = link backend (example : http://localhost:5000 ) if you run backend in local

## Authors

- [@phamhongphuc1403](https://github.com/phamhongphuc1403)
- [@huynamboz](https://github.com/huynamboz)
- [@redhoes](https://github.com/redhoes)

