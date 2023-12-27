import SortingOption from "../enums/SortingOption";

const SortingOptionsGenerator = (sortParam: string | undefined) => {
    const orderByOptions: Record<string, any> = {
        [SortingOption.NAME_ASC]: { name: 'asc' },
        [SortingOption.NAME_DESC]: { name: 'desc' },
        [SortingOption.ID_ASC]: { id: 'asc' },
        [SortingOption.ID_DESC]: { id: 'desc' },
    };
    if (!sortParam) {
        return orderByOptions[SortingOption.ID_ASC];
    }
    return orderByOptions[sortParam];
};

export default SortingOptionsGenerator;