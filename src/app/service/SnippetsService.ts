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
    // next static sents request to create new snippet in DB, sending snippet with interface ISnippetObj
    static async asyncNewSnippet(snippet: ISnippetObj): Promise<AxiosResponse<ISnippets>> {
        return $api.post<ISnippets>('/new_snippet', snippet)
    }
}