import {db} from "../src/utils/db.server";

async function mapPokemonToDB(name: string, pokemonData: any): Promise<any> {

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
  }
  
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

    console.log(`Inserted data for Pokemon with Id: ${createdPokemon.id} and Name: ${createdPokemon.name}`);
    return createdPokemon;
  }

  export default mapPokemonToDB;