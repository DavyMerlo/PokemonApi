import { AbilityResponse } from '../components/Ability';
import { StatResponse } from '../components/Stat';
import { VersionGroupDetailReponse } from '../components/VersionGroupDetail';
import { MoveResponse } from '../components/Move';
import { SpriteResponse } from '../components/Sprite';
import { PokemonDetailResponse } from '../components/PokemonDetail';
import Pokemon from '../components/Pokemon';
import Type from '../components/Type';
import {getPokemonFromDBbyId, getPokemonsFromDB, getPokemonsFromDBPaginated} from '../repositories/pokemon.repository';
import SortingOptions from '../enums/SortingOptions';


export async function listOfPokemons(sortParam: string | undefined) {
    try {
        const pokemonsFromDB = await getPokemonsFromDB(sortParam);
        let mappedPokemons: Pokemon[] = pokemonsFromDB.map(mapPokemon);
        if (sortParam) {
            if (sortParam === SortingOptions.NAME_DESC) {
                mappedPokemons.sort((a, b) => {
                    const comparison = a.name.localeCompare(b.name);
                    return SortingOptions.NAME_DESC ? -comparison : comparison;
                });
            }
            if (sortParam === SortingOptions.ID_DESC) {
                mappedPokemons.sort((a, b) => {
                    return SortingOptions.ID_DESC ? b.id - a.id : a.id - b.id;
                });
            }
        }
        return mappedPokemons;

    } catch (error) {
        throw new Error('Failed to fetch pokemons');
    }
}

export async function ListOfPokemonsPaginated(sort: string | undefined, 
    page: number, pageSize: number, 
    offset: number | undefined, limit: number | undefined) {
    try {
        const pokemonFromDB = await getPokemonsFromDBPaginated(sort, page, pageSize, offset, limit);
        let mappedPokemon: Pokemon[] = pokemonFromDB.map(mapPokemon);
        return mappedPokemon;

    } catch (error) {
        throw new Error('Failed to fetch pokemons');
    }
}


export async function pokemonById(pokemonById: number) {
    try {
        const pokemonFromDB = await getPokemonFromDBbyId(pokemonById);

        const abilities: AbilityResponse[] = mapAbilities(pokemonFromDB?.abilities || []);
        const stats: StatResponse[] = mapStats(pokemonFromDB?.stats || []);
        const moves: MoveResponse[] = mapMoves(pokemonFromDB?.moves || []);
        const types: Type[] = mapTypes(pokemonFromDB?.types || []);
        const sprite: SpriteResponse = mapSprites(pokemonFromDB?.sprite || []);

        const pokemonDetails: PokemonDetailResponse = {
            id: pokemonFromDB?.id || 0,
            name: pokemonFromDB?.name || 'Unknown',
            height: pokemonFromDB?.height || 0,
            weight: pokemonFromDB?.weight || 0,
            order: pokemonFromDB?.order || 0,
            species: pokemonFromDB?.species || 'Unknown',
            stats: stats,
            moves: moves,
            abilities: abilities,
            sprite: sprite,
            types: types,
        };
        return pokemonDetails;
    } catch (error) {
        throw new Error('Failed to fetch pokemon');
    }
}

// export async function searchPokemon (searchQuery: string, limit: number | undefined) {

//     const pokemons = await getPokemons();
//     let transformedPokemons: Pokemon[] = pokemons.map(transformPokemon);

//     if (searchQuery) {
//         const lowercaseQuery = searchQuery.toLowerCase();
//         transformedPokemons = transformedPokemons.filter(pokemon =>
//             pokemon.name.toLowerCase().includes(lowercaseQuery)
//         );
//     }

//     if (limit && transformedPokemons.length > limit) {
//         transformedPokemons = transformedPokemons.slice(0, limit);
//     }
// }

const mapPokemon = (pokemon: any): Pokemon => {
    const types: Type[] = Array.isArray(pokemon.types) && pokemon.types.length > 0
        ? pokemon.types.map((type: any) => ({
            name: type.name,
            slot: type.slot,
        }))
        : [];

    return {
        id: pokemon.id,
        name: pokemon.name,
        front_default: pokemon.sprite?.front_default,
        types,
    };
};

const mapAbilities = (abilities: any[]): AbilityResponse[] => {
    return abilities.map((ability: any) => ({
        ability: ability.abilityName,
        is_hidden: ability.isHidden,
        slot: ability.slot,
    }));
};

const mapStats = (stats: any[]): StatResponse[] => {
    return stats.map((stat: any) => ({
        stat: stat.statName,
        base_stat: stat.baseStat,
        effort: stat.effort,
    }));
};

const mapMoves = (moves: any[]): MoveResponse[] => {
    return moves.map((move: any) => ({
        move: move.move,
        version_group_details: mapVersionGroupDetails(move.versionGroupDetails),
    }));
};

const mapVersionGroupDetails = (details: any[] | undefined): VersionGroupDetailReponse[] => {
    if (!details || details.length === 0) {
        return [];
    }

    return details.map((detail: any) => ({
        move_learn_method: detail.moveLearnMethod,
        version_group: detail.versionGroup,
        level_learned_at: detail.levelLearnedAt, 
    }));
};

const mapTypes = (types: any[]): Type[] => {
    return types.map((type: any) => ({
        name: type.name,
        slot: type.slot,
    }));
};

const mapSprites = (sprite: any): SpriteResponse => {
    const spriteResponse: SpriteResponse = {
        front_default: sprite.frontDefault,
        front_female: sprite.frontShinyFemale,
        front_shiny: sprite.frontShiny,
        front_shiny_female: sprite.frontShinyFemale,
        back_default: sprite.backDefault,
        back_female: sprite.backFemale,
        back_shiny: sprite.backShiny,
        back_shiny_female: sprite.backShinyFemale,
    };
    return spriteResponse;
};