interface ITags {
    [index: number]: string; // its literally an onject, indexed by numbers. 
}
interface IImages {
    [index: number]: string; // its literally an onject, indexed by numbers. 
}

export interface ISnippet{
    ownerId?: string;
    uniqId: string;
    title: string;
    snippet: string;
    description: string
    hidden?: boolean;
    tags?: ITags[];
    image?: IImages[];
}