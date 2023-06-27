import $api from "../http/http";
import { AxiosResponse } from "axios";
import { ISnippet } from "../models/ISnippet";

interface ISnippets {
    snippets: ISnippet[]
}
export default class SnippetsService {
    static async asyncGetSnippets(ownerId: string): Promise<AxiosResponse<ISnippets>> {
        return $api.get<ISnippets>(`/snippets/`+ownerId)
    }
}