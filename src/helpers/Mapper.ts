import Ability from "../components/Ability";
import Move from "../components/Move";
import Pokemon from "../components/Pokemon";
import Sprite from "../components/Sprite";
import Stat from "../components/Stat";
import Team from "../components/Team";
import Type from "../components/Type";
import VersionGroupDetail from "../components/VersionGroupDetail";

export const Mapper = {

     mapPokemon : (pokemonDetails: any): Pokemon => {
        const types: Type[] = Array.isArray(pokemonDetails.types) && pokemonDetails.types.length > 0
            ? pokemonDetails.types.map((type: any) => ({
                name: type.name,
                slot: type.slot,
            }))
            : [];
    
        return {
            id: pokemonDetails.id,
            name: pokemonDetails.pokemon.name,
            sprite: {
                front_default: pokemonDetails.sprite.frontDefault
            },
            types,
        };
    },
    
    mapAbilities : (abilities: any[]): Ability[] => {
        return abilities.map((ability: any) => ({
            ability: ability?.abilityName ?? '',
            is_hidden: !!ability?.isHidden,
            slot: ability?.slot || 0,
        }));
    },
    
    mapStats : (stats: any[]): Stat[] => {
        return stats.map((stat: any) => ({
            stat: stat?.statName ?? '',
            base_stat: stat?.baseStat || 0,
            effort: stat?.effort || 0,
        }));
    },
    
    mapMoves: (moves: any[]): Move[] => {
        const mapVersionGroupDetails = (details: any[] | undefined): VersionGroupDetail[] => {
            if (!details || details.length === 0) {
                return [];
            }
            return details.map((detail: any) => ({
                move_learn_method: detail?.moveLearnMethod ?? '',
                version_group: detail?.versionGroup ?? '',
                level_learned_at: detail?.levelLearnedAt || 0,
            }));
        };
        return moves.map((move: any) => ({
            move: move?.move ?? '',
            version_group_details: mapVersionGroupDetails(move?.versionGroupDetails),
        }));
    },
    
    mapTypes: (types: any[]): Type[] => {
        return types.map((type: any) => ({
            name: type?.name ?? '',
            slot: type?.slot || 0,
        }));
    },
    
    mapSprites: (sprite: any): Sprite => {
        return {
            front_default: sprite?.frontDefault ?? '',
            front_female: sprite?.frontShinyFemale ?? '',
            front_shiny: sprite?.frontShiny ?? '',
            front_shiny_female: sprite?.frontShinyFemale ?? '',
            back_default: sprite?.backDefault ?? '',
            back_female: sprite?.backFemale ?? '',
            back_shiny: sprite?.backShiny ?? '',
            back_shiny_female: sprite?.backShinyFemale ?? '',
        };
    },
    
    mapTeam(team: Team | null): Team {
        const pokemons: number[] = team?.pokemons?.map((pokemon: any) => pokemon?.pokemonId ?? []) || [];
        return {
            id: team?.id || 0,
            name: team?.name || '',
            pokemons: pokemons,
        };
    },
};