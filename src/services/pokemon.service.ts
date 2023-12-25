import {db} from '../utils/db.server';
import { AbilityResponse } from '../components/Ability';
import { StatResponse } from '../components/Stat';
import { VersionGroupDetailReponse } from '../components/VersionGroupDetail';
import { MoveResponse } from '../components/Move';
import { SpriteResponse } from '../components/Sprite';
import { PokemonDetailResponse } from '../components/PokemonDetail';
import Pokemon from '../components/Pokemon';
import Type from '../components/Type';
import {getPokemons, getPokemonbyId} from '../repositories/pokemon.repository';


  const transformPokemon = (pokemon: any): Pokemon => {
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

export async function listOfPokemons() {
    try {
        const pokemons = await getPokemons();
        const transformedPokemons: Pokemon[] = pokemons.map(transformPokemon);
        return transformedPokemons;

    } catch (error) {
        console.error('Error fetching teams:', error);
        throw new Error('Failed to fetch teams');
    }
}

export async function pokemonById(pokemonById: number) {
    try {
        const pokemon = await getPokemonbyId(pokemonById);

        const abilities: AbilityResponse[] = mapAbilities(pokemon?.abilities || []);
        const stats: StatResponse[] = mapStats(pokemon?.stats || []);
        const moves: MoveResponse[] = mapMoves(pokemon?.moves || []);
        const types: Type[] = mapTypes(pokemon?.types || []);
        const sprite: SpriteResponse = mapSprites(pokemon?.sprite || []);

        const pokemonDetails: PokemonDetailResponse = {
            id: pokemon?.id || 0,
            name: pokemon?.name || 'Unknown',
            height: pokemon?.height || 0,
            weight: pokemon?.weight || 0,
            order: pokemon?.order || 0,
            species: pokemon?.species || 'Unknown',
            stats: stats,
            moves: moves,
            abilities: abilities,
            sprite: sprite,
            types: types,
        };
        return pokemonDetails;
    } catch (error) {
        console.error('Error fetching team:', error);
        throw new Error('Failed to fetch team');
    }
}

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
        front_default: sprite.front_default,
        front_female: sprite.front_shiny_female,
        front_shiny: sprite.front_shiny,
        front_shiny_female: sprite.front_shiny_female,
        back_default: sprite.back_default,
        back_female: sprite.back_female,
        back_shiny: sprite.back_shiny,
        back_shiny_female: sprite.back_shiny_female,
    };
    return spriteResponse;
};