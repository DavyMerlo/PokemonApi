import {db} from "../src/utils/db.server";
import * as fs from 'fs/promises';
import path from 'path';

const readPokemonJson = async (): Promise<any[]> => {
  try {
      const filePath = path.join(__dirname, '..', 'src', 'config', 'pokemons.json');
      const pokemonData = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(pokemonData);
  } catch (error) {
      console.error('Error reading pokemon.json:', error);
      throw new Error('Failed to read pokemon.json');
  }
};

async function createUser(): Promise<number> {
  const createdUser = await db.user.create({
    data: {
      name : 'Davy',
      email : 'demo@live.be',
      password: 'demo123',
    }
  });
  console.log('Demo-user created:', createdUser);
  return createdUser.id;
}

async function createTeamUser(teamId: number, userId: number): Promise<void> {
  const teamUser = await db.teamUser.create({
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
    createTeamUser(teamId,userId);
  } catch (error) {
    console.error('Error creating team and associating Pokemons:', error);
  }
}

async function createPokemon(name: string, pokemonData: any) : Promise<any> {

  let spritesData: any = {};
  if (pokemonData && pokemonData.sprites) {
  const sprites = pokemonData.sprites;

  spritesData = {
    frontDefault: sprites.front_default || null,
    frontFemale: sprites.front_female || null,
    frontShiny: sprites.front_shiny || null,
    frontShinyFemale: sprites.front_shiny_female || null,
    backDefault: sprites.back_default || null,
    backFemale: sprites.back_female || null,
    backShiny: sprites.back_shiny || null,
    backShinyFemale: sprites.back_shiny_female || null,
  };

    const createdPokemon = await db.pokemon.create({
      data: {
        name,
        details: {
          create: {
            name: pokemonData.name,
            height: pokemonData.height,
            weight: pokemonData.weight,
            order: pokemonData.order,
            species: pokemonData.species.url,
            stats: {
              create: pokemonData.stats.map((stat: any) => ({
                statName: stat.stat.name,
                baseStat: stat.base_stat,
                effort: stat.effort,
              })),
            },
            abilities: {
              create: pokemonData.abilities.map((ability: any) => ({
                abilityName: ability.ability.name,
                isHidden: ability.is_hidden,
                slot: ability.slot,
              })),
            },
            moves: {
              create: pokemonData.moves.map((move: any) => ({
                move: move.move.name,
                versionGroupDetails: {
                  create: move.version_group_details.map((detail: any) => ({
                    moveLearnMethod: detail.move_learn_method.name,
                    versionGroup: detail.version_group.name,
                    levelLearnedAt: detail.level_learned_at,
                  })),
                },
              })),
            },
            sprite: {
              create: spritesData,
            },
            types: {
              create: pokemonData.types.map((type: any) => ({
                name: type.type.name || null,
                slot: type.slot || null,
              })),
            }
          },
        },
      },
      include: {
        details: {
          include: {
            pokemons: true,
          },
        },
      },
    });
    return createdPokemon;
  }
}

const seedDatabase = async (): Promise<void> => {
  try {
      const pokemonData = await readPokemonJson();
      for (const pokemon of pokemonData) {
          const created = await createPokemon(pokemon.name, pokemon);
          console.log(`Inserted data for Pokemon with ID: ${created.id}`);
      }
      const pokemonIds = [1, 2, 3];
      await createTeamUserAndAssociatePokemon('Fire Flames', pokemonIds);
      console.log('Database succesfully seeded!');
  } catch (error) {
      console.error('Error seeding database', error);
  }
};

seedDatabase();

// async function fetchPokemonData(pokemonId: number): Promise<any> {
//   const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
//   if (!pokemonResponse.ok) {
//     throw new Error(`Failed to fetch data for Pokemon with pokemonID: ${pokemonId}`);
//   }
//   return pokemonResponse.json();
// }

// async function createPokemon(name: string, pokemonData: any): Promise<any> {

//   let spritesData: any = {};
//   if (pokemonData && pokemonData.sprites) {
//   const sprites = pokemonData.sprites;

//   spritesData = {
//     front_default: sprites.front_default || null,
//     front_female: sprites.front_female || null,
//     front_shiny: sprites.front_shiny || null,
//     front_shiny_female: sprites.front_shiny_female || null,
//     back_default: sprites.back_default || null,
//     back_female: sprites.back_female || null,
//     back_shiny: sprites.back_shiny || null,
//     back_shiny_female: sprites.back_shiny_female || null,
//   };
// }

//   const createdPokemon = await db.pokemon.create({
//     data: {
//       name,
//       details: {
//         create: {
//           name: pokemonData.name,
//           height: pokemonData.height,
//           weight: pokemonData.weight,
//           order: pokemonData.order,
//           species: pokemonData.species.url,
//           stats: {
//             create: pokemonData.stats.map((stat: any) => ({
//               statName: stat.stat.name,
//               baseStat: stat.base_stat,
//               effort: stat.effort,
//             })),
//           },
//           abilities: {
//             create: pokemonData.abilities.map((ability: any) => ({
//               abilityName: ability.ability.name,
//               isHidden: ability.is_hidden,
//               slot: ability.slot,
//             })),
//           },
//           moves: {
//             create: pokemonData.moves.map((move: any) => ({
//               move: move.move.name,
//               versionGroupDetails: {
//                 create: move.version_group_details.map((detail: any) => ({
//                   moveLearnMethod: detail.move_learn_method.name,
//                   versionGroup: detail.version_group.name,
//                   levelLearnedAt: detail.level_learned_at,
//                 })),
//               },
//             })),
//           },
//           sprite: {
//             create: spritesData,
//           },
//           types: {
//             create: pokemonData.types.map((type: any) => ({
//               name: type.type.name || null,
//               slot: type.slot || null,
//             })),
//           }
//         },
//       },
//     },
//     include: {
//       details: {
//         include: {
//           pokemons: true,
//         },
//       },
//     },
//   });
//   return createdPokemon;
// }

// async function seedDatabase(): Promise<void> {
//   try {
//     const limit = 150;
//     for (let i = 1; i <= limit; i++) {
//       const pokemonData = await fetchPokemonData(i);
//       const {name} = pokemonData;
//       const createdPokemon = await createPokemon(name, pokemonData);
//       console.log(`Inserted data for Pokemon with pokemonID: ${i}`);
//     }
//     console.log('Database populated with Pokemon data from PokeAPI :)');
//   } catch (error) {
//     console.error('Error populating database with PokeAPI data:', error);
//   } finally {
//     await db.$disconnect();
//   }
// }

// seedDatabase();