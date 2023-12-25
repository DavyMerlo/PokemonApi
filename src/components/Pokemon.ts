import Type from './Type';

type Pokemon = {
    id: number;
    name: string;
    front_default?: string | null;
    types: Type[];
};

export default Pokemon;
