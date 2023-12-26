import Ability from '../components/Ability';
import Stat from '../components/Stat';
import VersionGroupDetail from '../components/VersionGroupDetail';
import Move from '../components/Move';
import Sprite from '../components/Sprite';
import PokemonDetail from '../components/PokemonDetail';
import Pokemon from '../components/Pokemon';
import Type from '../components/Type';
import {getPokemonFromDBbyId, getPokemonsFromDB, getPokemonsFromDBPaginated, searchPokemonsFromDB} from '../repositories/pokemon.repository';
import SortingOptions from '../enums/SortingOptions';


export async function listOfPokemons(
    sortParam: string | undefined) {
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

export async function ListOfPokemonsPaginated(
    sort: string | undefined, 
    page: number, 
    pageSize: number, 
    offset: number | undefined, 
    limit: number | undefined,
    baseUrl: string) {
        try {
            const pokemonFromDB = await getPokemonsFromDBPaginated(
                sort, page, pageSize, offset, limit);
            let mappedPokemon: Pokemon[] = pokemonFromDB.map(mapPokemon);
    
            const countPokemon = (await getPokemonsFromDB(undefined)).length;
            const pages: number = Math.ceil(countPokemon / pageSize);
    
            const nextUrl = page < pages ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}` : null;
            const previousUrl = page > 1 ? `${baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null;
            const metaData = {
                total: countPokemon,
                pages: pages,
                page: page,
                next: nextUrl,
                previous: previousUrl,
            };
    
            return { data: mappedPokemon, metadata: metaData };
        } catch (error) {
            throw new Error('Failed to fetch pokemons');
        }
}


export async function pokemonById(
    pokemonById: number) {
    try {
        const pokemonFromDB = await getPokemonFromDBbyId(pokemonById);

        const abilities: Ability[] = mapAbilities(pokemonFromDB?.abilities || []);
        const stats: Stat[] = mapStats(pokemonFromDB?.stats || []);
        const moves: Move[] = mapMoves(pokemonFromDB?.moves || []);
        const types: Type[] = mapTypes(pokemonFromDB?.types || []);
        const sprite: Sprite = mapSprites(pokemonFromDB?.sprite || []);

        const pokemonDetails: PokemonDetail = {
            id: pokemonFromDB?.id || 0,
            name: pokemonFromDB?.name || '',
            height: pokemonFromDB?.height || 0,
            weight: pokemonFromDB?.weight || 0,
            order: pokemonFromDB?.order || 0,
            species: pokemonFromDB?.species || '',
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

export async function searchPokemons(
    query: string, 
    limit: string | undefined) {
    try {
        const pokemonsFromDB = await searchPokemonsFromDB(query, limit);
        let mappedPokemons: Pokemon[] = pokemonsFromDB.map(mapPokemon);
        console.log(mappedPokemons);
        return mappedPokemons;

    } catch (error) {
        throw new Error('Failed to fetch pokemons');
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

const mapAbilities = (abilities: any[]): Ability[] => {
    return abilities.map((ability: any) => ({
        ability: ability.abilityName,
        is_hidden: ability.isHidden,
        slot: ability.slot,
    }));
};

const mapStats = (stats: any[]): Stat[] => {
    return stats.map((stat: any) => ({
        stat: stat.statName,
        base_stat: stat.baseStat,
        effort: stat.effort,
    }));
};

const mapMoves = (moves: any[]): Move[] => {
    return moves.map((move: any) => ({
        move: move.move,
        version_group_details: mapVersionGroupDetails(move.versionGroupDetails),
    }));
};

const mapVersionGroupDetails = (details: any[] | undefined): VersionGroupDetail[] => {
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

const mapSprites = (sprite: any): Sprite => {
    const mappedSprite: Sprite = {
        front_default: sprite.frontDefault,
        front_female: sprite.frontShinyFemale,
        front_shiny: sprite.frontShiny,
        front_shiny_female: sprite.frontShinyFemale,
        back_default: sprite.backDefault,
        back_female: sprite.backFemale,
        back_shiny: sprite.backShiny,
        back_shiny_female: sprite.backShinyFemale,
    };
    return mappedSprite;
};