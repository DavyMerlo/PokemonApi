import Ability from '../components/Ability';
import Stat from '../components/Stat';
import Move from '../components/Move';
import Sprite from '../components/Sprite';
import PokemonDetail from '../components/PokemonDetail';
import Pokemon from '../components/Pokemon';
import Type from '../components/Type';
import * as PokemonRepository from '../repositories/pokemon.repository';
import {Mapper} from '../helpers/Mapper';
import CustomError from '../components/CustomError';


export async function listOfPokemons(
    sortParam: string | undefined) {
    const pokemonsFromDB = await PokemonRepository.getPokemonsFromDB(sortParam);
    if (!pokemonsFromDB || pokemonsFromDB.length === 0) {
        throw new CustomError(404, 'Not Found', 'No pokemons found');
    };
    return pokemonsFromDB.map(Mapper.mapPokemon);
};

export async function ListOfPokemonsPaginated(
    sort: string | undefined, 
    page: number, 
    pageSize: number, 
    offset: number | undefined, 
    limit: number | undefined,
    baseUrl: string) {
        const pokemonsFromDB = await PokemonRepository.getPokemonsPaginatedFromDB(
            sort, page, pageSize, offset, limit);
        if (!pokemonsFromDB || pokemonsFromDB.length === 0) {
            throw new CustomError(404, 'Not Found', 'No pokemons found');
        };
        const mappedPokemon: Pokemon[] = pokemonsFromDB.map(Mapper.mapPokemon);
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
};

export async function pokemonById(
    pokemonId: number) {
        const pokemonExists = await PokemonRepository.pokemonExistsInDB(pokemonId);
        if (!pokemonExists) {
            throw new CustomError(404, 'Pokemon not found', 'Pokemon with Id ' + pokemonId + ' does not exist');
        }
        const pokemonFromDB = await PokemonRepository.getPokemonByIdFromDB(pokemonId);
        const abilities: Ability[] = Mapper.mapAbilities(pokemonFromDB?.abilities || []);
        const stats: Stat[] = Mapper.mapStats(pokemonFromDB?.stats || []);
        const moves: Move[] = Mapper.mapMoves(pokemonFromDB?.moves || []);
        const types: Type[] = Mapper.mapTypes(pokemonFromDB?.types || []);
        const sprite: Sprite = Mapper.mapSprites(pokemonFromDB?.sprite || []);

        const pokemonDetails: PokemonDetail = {
            id: pokemonFromDB?.id || 0,
            name: pokemonFromDB?.pokemon.name || '',
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
};

export async function pokemonImageById(pokemonId: number) {
    const pokemonExists = await PokemonRepository.pokemonExistsInDB(pokemonId);
    if (!pokemonExists) {
        throw new CustomError(404, 'Pokemon not found', 'Pokemon with Id ' + pokemonId + ' does not exist');
    }
    const pokemonImageFromDB = await PokemonRepository.getPokemonImageByIdFromDB(pokemonId);
    const imageBuffer = pokemonImageFromDB?.sprite?.image;
    return imageBuffer;
};

export async function searchPokemons(
    query: string, 
    limit: string | undefined) {
    const pokemonsFromDB = await PokemonRepository.searchPokemonsFromDB(query, limit);
    if (!pokemonsFromDB || pokemonsFromDB.length === 0) {
        throw new CustomError(404, 'Not Found', 'No pokemons found');
    };
    return pokemonsFromDB.map(Mapper.mapPokemon);
};

export async function checkPokemonExists(pokemonId: number) {
    return await PokemonRepository.pokemonExistsInDB(pokemonId);
};