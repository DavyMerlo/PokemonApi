import Sprite from './Sprite';
import Type from './Type';

type Pokemon = {
    id: number;
    name: string;
    sprite: Sprite;
    types: Type[];
};

export default Pokemon;
