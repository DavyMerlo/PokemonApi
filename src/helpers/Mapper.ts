import Ability from "../components/Ability";
import Move from "../components/Move";
import Pokemon from "../components/Pokemon";
import Sprite from "../components/Sprite";
import Stat from "../components/Stat";
import Team from "../components/Team";
import Type from "../components/Type";
import VersionGroupDetail from "../components/VersionGroupDetail";

export const mapPokemon = (pokemon: any): Pokemon => {
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

export const mapAbilities = (abilities: any[]): Ability[] => {
    return abilities.map((ability: any) => ({
        ability: ability.abilityName,
        is_hidden: ability.isHidden,
        slot: ability.slot,
    }));
};

export const mapStats = (stats: any[]): Stat[] => {
    return stats.map((stat: any) => ({
        stat: stat.statName,
        base_stat: stat.baseStat,
        effort: stat.effort,
    }));
};

export const mapMoves = (moves: any[]): Move[] => {
    return moves.map((move: any) => ({
        move: move.move,
        version_group_details: mapVersionGroupDetails(move.versionGroupDetails),
    }));
};

export const mapVersionGroupDetails = (details: any[] | undefined): VersionGroupDetail[] => {
    if (!details || details.length === 0) {
        return [];
    }

    return details.map((detail: any) => ({
        move_learn_method: detail.moveLearnMethod,
        version_group: detail.versionGroup,
        level_learned_at: detail.levelLearnedAt, 
    }));
};

export const mapTypes = (types: any[]): Type[] => {
    return types.map((type: any) => ({
        name: type.name,
        slot: type.slot,
    }));
};

export const mapSprites = (sprite: any): Sprite => {
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

export async function mapTeam(team: Team | null): Promise<Team> {
    const pokemons: number[] = team?.pokemons ? team.pokemons.map((pokemon: any) => pokemon.pokemonId) : [];
    return {
        id: team?.id || 0,
        name: team?.name || '',
        pokemons: pokemons,
    };
}