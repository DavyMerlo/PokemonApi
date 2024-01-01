import {db} from "../src/utils/db.server";

async function mapPokemonToDB(name: string, pokemonData: any): Promise<any> {
  try {
    let frontDefaultImageBuffer: Buffer | null = null;
    if (pokemonData?.sprites?.front_default) {
      const frontDefaultImageUrl = pokemonData.sprites.front_default;
      frontDefaultImageBuffer = await fetchImage(frontDefaultImageUrl);
    }

    const spritesData = mapSpritesToDB(pokemonData.sprites, frontDefaultImageBuffer);
    const statsData = mapStatsToDB(pokemonData.stats);
    const abilitiesData = mapAbilitiesToDB(pokemonData.abilities);
    const movesData = mapMovesToDB(pokemonData.moves);
    const typesData = mapTypesToDB(pokemonData.types);

    const createdPokemon = await db.pokemon.create({
      data: {
        name: pokemonData.name,
        details: {
          create: {
            height: pokemonData.height,
            weight: pokemonData.weight,
            order: pokemonData.order,
            species: pokemonData.species.url,
            stats: { create: statsData },
            abilities: { create: abilitiesData },
            moves: { create: movesData },
            sprite: { create: spritesData },
            types: { create: typesData },
          },
        },
      },
      include: {
        details: {
          include: { pokemon: true },
        },
      },
    });

    console.log(`Inserted data for Pokemon with Id: ${createdPokemon.id} and Name: ${createdPokemon.name}`);
    return createdPokemon;
  } catch (error) {
    console.error(`Error mapping Pokemon to DB: ${error}`);
    throw error;
  }
}

async function fetchImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      return Buffer.from(buffer);
    }
    console.error(`Failed to fetch image from ${url}`);
  } catch (error) {
    console.error(`Error fetching image: ${error}`);
  }
  return null;
}

function mapSpritesToDB(sprites: any, imageBuffer: Buffer | null): any {
  return {
    frontDefault: sprites.front_default || null,
    frontFemale: sprites.front_female || null,
    frontShiny: sprites.front_shiny || null,
    frontShinyFemale: sprites.front_shiny_female || null,
    backDefault: sprites.back_default || null,
    backFemale: sprites.back_female || null,
    backShiny: sprites.back_shiny || null,
    backShinyFemale: sprites.back_shiny_female || null,
    image: imageBuffer || null,
  };
};

function mapStatsToDB(stats: any[]): any[] {
  return stats.map((stat: any) => ({
    statName: stat.stat.name,
    baseStat: stat.base_stat,
    effort: stat.effort,
  }));
};

function mapAbilitiesToDB(abilities: any[]): any[] {
  return abilities.map((ability: any) => ({
    abilityName: ability.ability.name,
    isHidden: ability.is_hidden,
    slot: ability.slot,
  }));
};

function mapMovesToDB(moves: any[]): any[] {
  return moves.map((move: any) => ({
    move: move.move.name,
    versionGroupDetails: {
      create: move.version_group_details.map((detail: any) => ({
        moveLearnMethod: detail.move_learn_method.name,
        versionGroup: detail.version_group.name,
        levelLearnedAt: detail.level_learned_at,
      })),
    },
  }));
};

function mapTypesToDB(types: any[]): any[] {
  return types.map((type: any) => ({
    name: type.type.name || null,
    slot: type.slot || null,
  }));
};

export default mapPokemonToDB;