export interface ITags {
    [index: number]: string; // its literally an onject, indexed by numbers. 
}
export interface IImages {
    [index: number]: string; // its literally an onject, indexed by numbers. 
}

// for obj
export interface ISnippetObj {
    ownerId?: string;
    uniqId: string;
    title: string;
    snippet: string;
    description: string
    hidden?: boolean;
    tags?: ITags[];
    image?: IImages[];
}

// for arr
export interface ISnippetsArr{
    ownerId?: string;
    uniqId: string;
    title: string;
    snippet: string;
    description: string
    hidden?: boolean;
    tags?: ITags[];
    image?: IImages[];
}