export interface ITags {
    [index: number]: string; // its literally an onject, indexed by numbers. 
}
export interface IImages {
    [index: number]: string; // its literally an onject, indexed by numbers. 
}

// for obj

export interface ISnippets{
    __v?: number;
    _id?: string; 
    ownerId?: string;
    uniqId: string;
    title: string;
    snippet: string;
    description: string
    hidden?: boolean;
    tags?: ITags[];
    image?: IImages[];
}