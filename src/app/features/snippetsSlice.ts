import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISnippet } from "../models/ISnippet"
import { saveSnippetStateToLocalStorage } from "./localstorage";

export interface SliceState {
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
        getSnippets: (state, action: PayloadAction<SliceState>) => {
            try {
                const gotState: SliceState = action.payload
                const snippets = gotState.snippets
                state.snippets = snippets
            } catch (error) {
                
            }
            
        },
        addSnippet: (state, action: PayloadAction<ISnippet>) => {
            const snippet = action.payload // obj
            
            state.snippets.push(snippet) 
            saveSnippetStateToLocalStorage(state )
        },
        updateSnippet: (state, action: PayloadAction<ISnippet>) => {
            
            const snippetIndex = state.snippets.findIndex(snippet => action.payload.uniqId === snippet.uniqId); // getting index
            
            if (snippetIndex !== -1) {
                state.snippets[snippetIndex] = action.payload;
            }
        }
    }
})

export const {addSnippet, updateSnippet, getSnippets} = snippetsSlice.actions
export default snippetsSlice.reducer