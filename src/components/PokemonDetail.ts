import Ability from './Ability';
import Stat from './Stat';
import Move from './Move';
import Sprite from './Sprite';
import Type from './Type';

type PokemonDetail = {
    id: number;
    name: string;
    sprite: Sprite;
    types: Type[];
    height: number;
    weight: number;
    moves: Move[];
    order: number;
    species: string;
    stats: Stat[];
    abilities: Ability[];
};

export default PokemonDetail;
