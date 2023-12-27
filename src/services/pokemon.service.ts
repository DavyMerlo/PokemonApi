import Ability from '../components/Ability';
import Stat from '../components/Stat';
import Move from '../components/Move';
import Sprite from '../components/Sprite';
import PokemonDetail from '../components/PokemonDetail';
import Pokemon from '../components/Pokemon';
import Type from '../components/Type';
import * as PokemonRepository from '../repositories/pokemon.repository';
import SortingOptions from '../enums/SortingOptions';
import * as mappingservice from '../helpers/Mappers';
import * as Handler from '../helpers/ErrorGenerator';


export async function listOfPokemons(
    sortParam: string | undefined) {
        const pokemonsFromDB = await PokemonRepository.getPokemonsFromDB(sortParam);
        let mappedPokemons: Pokemon[] = pokemonsFromDB.map(mappingservice.mapPokemon);
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
}

export async function ListOfPokemonsPaginated(
    sort: string | undefined, 
    page: number, 
    pageSize: number, 
    offset: number | undefined, 
    limit: number | undefined,
    baseUrl: string) {
        const pokemonFromDB = await PokemonRepository.getPokemonsFromDBPaginated(
            sort, page, pageSize, offset, limit);

        let mappedPokemon: Pokemon[] = pokemonFromDB.map(mappingservice.mapPokemon);
        const countPokemon = (await PokemonRepository.getPokemonsFromDB(undefined)).length;
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
}


export async function pokemonById(
    pokemonById: number) {
        const pokemonFromDB = await PokemonRepository.getPokemonFromDBbyId(pokemonById);
        const abilities: Ability[] = mappingservice.mapAbilities(pokemonFromDB?.abilities || []);
        const stats: Stat[] = mappingservice.mapStats(pokemonFromDB?.stats || []);
        const moves: Move[] = mappingservice.mapMoves(pokemonFromDB?.moves || []);
        const types: Type[] = mappingservice.mapTypes(pokemonFromDB?.types || []);
        const sprite: Sprite = mappingservice.mapSprites(pokemonFromDB?.sprite || []);

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
}

export async function searchPokemons(
    query: string, 
    limit: string | undefined) {
        const pokemonsFromDB = await PokemonRepository.searchPokemonsFromDB(query, limit);
        let mappedPokemons: Pokemon[] = pokemonsFromDB.map(mappingservice.mapPokemon);
        return mappedPokemons;
}

export async function checkPokemonExists(pokemonId: number) {
    const pokemonExists = await PokemonRepository.checkPokemonExistsInDB(pokemonId);
    return pokemonExists;
}