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
        createSnippet: (state, action: PayloadAction<ISnippet>) => {
            const snippet = action.payload // obj
            
            state.snippets.push(snippet) 
            saveSnippetStateToLocalStorage(state )
        },
        updateSnippet: (state, action: PayloadAction<ISnippet>) => {
            
            const snippetIndex = state.snippets.findIndex(snippet => action.payload.uniqId === snippet.uniqId); // getting index
            
            if (snippetIndex !== -1) {
                state.snippets[snippetIndex] = action.payload;
            }
        },
        deleteSnippet: (state, action: PayloadAction<string>) => {
            // const snippetIndex = state.snippets.findIndex(snippet => action.payload === snippet.uniqId);
            console.log(action.payload);
            
            const filteredSnippets = state.snippets.filter(snippet => snippet.uniqId !== action.payload)
            state.snippets = filteredSnippets

        }
        
    }
})

export const {createSnippet, updateSnippet, getSnippets, deleteSnippet} = snippetsSlice.actions
export default snippetsSlice.reducer