import { AbilityResponse } from './Ability';
import { StatResponse } from './Stat';
import { MoveResponse } from './Move';
import { SpriteResponse } from './Sprite';
import Type from './Type';

export type PokemonDetailResponse = {
    id: number;
    name: string;
    sprite: SpriteResponse;
    types: Type[];
    height: number;
    weight: number;
    moves: MoveResponse[];
    order: number;
    species: string;
    stats: StatResponse[];
    abilities: AbilityResponse[];
};
