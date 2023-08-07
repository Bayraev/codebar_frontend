import $api from "../http/http";
import { AxiosResponse } from "axios";
import { ISnippetObj, ISnippetsArr } from "../models/ISnippet";

interface ISnippets {
    snippets: ISnippetsArr[]
}
export default class SnippetsService {
    static async asyncGetSnippets(ownerId: string): Promise<AxiosResponse<ISnippets>> {
        return $api.get<ISnippets>(`/snippets/`+ownerId)
    }
    // static async asyncNewSnippet(snippet: ISnippetObj): Promise<AxiosResponse<ISnippets>> {
    //     return $api.post<ISnippets>('/new_snippet')
    // }
}