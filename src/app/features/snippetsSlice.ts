import { createSlice } from "@reduxjs/toolkit";
import { ISnippet } from "../models/ISnippet"

interface SliceState {
    snippets: ISnippet[];
}
const initialState: SliceState = {
    snippets: [{
    "ownerId": null,
    "uniqId": 'owjd238hdhn298dn2i39ubfn3',
    "title": "text",
    "snippet": "<h> Hello World!</h>",
    "description": "Little description",
    "tags": ["Js", "HTML", "tag"],
    "hidden": false
}]
}

const snippetsSlice = createSlice({
    name: 'snippets',
    initialState,
    reducers: {
        addSnippet: (state, action) => {
            const snippet = action.payload // obj
            state.snippets.push(snippet) 
        }
    }
})

export const {addSnippet} = snippetsSlice.actions
export default snippetsSlice.reducer