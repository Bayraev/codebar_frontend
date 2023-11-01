import $api from "../http/http";
import { AxiosResponse } from "axios";
import { ISnippets } from "../models/ISnippet";


export default class SnippetsService {
    static async asyncGetSnippets(ownerId: string): Promise<AxiosResponse<ISnippets>> {
        const random = Math.random()
        console.log(random);
        
        return $api.get<ISnippets>(`/snippets/`+ownerId+`?random=${random}`)
    }
    // next static sents request to create new snippet in DB, sending snippet with interface ISnippetObj
    static async asyncNewSnippet(snippet: ISnippets): Promise<AxiosResponse<ISnippets>> {
        return $api.post<ISnippets>('/new_snippet', snippet)
    }

    static async asyncDeleteSnippet(_id: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/snippet/delete/${_id}`)
    }

    static async asyncUpdateSnippet(snippet: ISnippets): Promise<AxiosResponse<ISnippets>> {
        console.log(snippet._id);
        
        return $api.patch(`/snippet/patch/${snippet._id}`, snippet)
    }
}