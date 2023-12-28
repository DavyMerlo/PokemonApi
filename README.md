This is the backend(api) of a pokedex.
For this project i used ExpressJs with Typescript.
Further more i used Prisma to create,seed and doing CRUD call to the database.
For testing i used Jest and Supertest(testing HTTP endpoints).


Steps u need to follow in order to run this api server:
=> Type in terminal 'npx prisma db push' to create the database.
=> Type in terminal 'npx prisma db seed' to seed the database with the 151 original pokemons, team and a demo-user.
=> Type in terminal 'npm run dev' to run the server. If everything goes fine 'Listening on port 3000' will appear.

Now you can use it in Postman or Swagger ('http://localhost:3000/api-docs/'),...;
