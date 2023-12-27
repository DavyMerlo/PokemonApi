import Ability from '../components/Ability';
import Stat from '../components/Stat';
import Move from '../components/Move';
import Sprite from '../components/Sprite';
import PokemonDetail from '../components/PokemonDetail';
import Pokemon from '../components/Pokemon';
import Type from '../components/Type';
import * as PokemonRepository from '../repositories/pokemon.repository';
import * as mappingservice from '../helpers/Mapper';
import CustomError from '../components/CustomError';


export async function listOfPokemons(
    sortParam: string | undefined) {
        const pokemonsFromDB = await PokemonRepository.getPokemonsFromDB(sortParam);
        return pokemonsFromDB.map(mappingservice.mapPokemon);
}

export async function ListOfPokemonsPaginated(
    sort: string | undefined, 
    page: number, 
    pageSize: number, 
    offset: number | undefined, 
    limit: number | undefined,
    baseUrl: string) {
        const pokemonFromDB = await PokemonRepository.getPokemonsPaginatedFromDB(
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
    pokemonId: number) {
        const pokemonExists = await PokemonRepository.pokemonExistsInDB(pokemonId);
        if (!pokemonExists) {
            throw new CustomError(404, 'Pokemon not found', 'Pokemon with ' + pokemonId + ' does not exist');
        }
        const pokemonFromDB = await PokemonRepository.getPokemonByIdFromDB(pokemonId);
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
        return pokemonsFromDB.map(mappingservice.mapPokemon);
}

export async function checkPokemonExists(pokemonId: number) {
    return await PokemonRepository.pokemonExistsInDB(pokemonId);
}