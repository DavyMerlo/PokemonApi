import {db} from "../src/utils/db.server";
import * as fs from 'fs/promises';
import path from 'path';
import mapPokemonToDB from "./db.mapper";
import {encodePassword} from '../src/utils/password.encoder';

const readPokemonJson = async (): Promise<any[]> => {
  try {
      const filePath = path.join(__dirname, '..', 'src', 'config', 'pokemons.json');
      const pokemonData = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(pokemonData);
  } catch (error) {
      console.error('Error reading pokemon.json:', error);
      throw new Error('Failed to read pokemon.json');
  };
};

async function createUser(): Promise<number> {
  const createdUser = await db.user.create({
    data: {
      name : 'Davy',
      email : 'davymerlo@live.be',
      password: await encodePassword('wisemen'),
    }
  });
  console.log('Demo-user created:', createdUser);
  return createdUser.id;
}

async function createTeamUser(teamId: number, userId: number): Promise<void> {
  await db.teamUser.create({
    data: {
      teamId: teamId,
      userId: userId
    }
  })
  console.log('TeamId ' + teamId + ' with userId ' + userId + ' created!')
}


async function createTeam(teamName: string): Promise<number> {
  const createdTeam = await db.team.create({
    data: {
      name: teamName,
    },
  });
  return createdTeam.id;
}

async function createPokemonTeam(teamId: number, pokemonIds: number[]): Promise<void> {
  const promises = pokemonIds.map(async (pokemonId) => {
    await db.pokemonTeam.create({
      data: {
        team: { connect: { id: teamId } },
        pokemon: { connect: { id: pokemonId } },
      },
    });
  });
  await Promise.all(promises);
}

async function createTeamUserAndAssociatePokemon(teamName: string, pokemonIds: number[]): Promise<void> {
  try {
    const teamId = await createTeam(teamName);
    console.log(`Team ${teamName} created with ID: ${teamId}`);
    await createPokemonTeam(teamId, pokemonIds);
    console.log(`Pokemons associated with the team ${teamName} successfully`);
    const userId =  await createUser();
    await createTeamUser(teamId,userId);
  } catch (error) {
    console.error('Error creating team and associating Pokemons:', error);
  }
}

const seedDatabase = async (): Promise<void> => {
  try {
      const pokemonData = await readPokemonJson();
      for (const pokemon of pokemonData) {
        await mapPokemonToDB(pokemon.name, pokemon);
      }
      const pokemonIds = [1, 2, 3];
      await createTeamUserAndAssociatePokemon('Fire Flames', pokemonIds);
      console.log('Database succesfully seeded!');
  } catch (error) {
      console.error('Error seeding database', error);
  }
};

seedDatabase();