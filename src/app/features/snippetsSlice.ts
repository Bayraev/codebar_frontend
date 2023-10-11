import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISnippets, ITags } from "../models/ISnippet"
import { saveSnippetStateToLocalStorage } from "./localstorage";
import SnippetsService from "../service/SnippetsService";
import { RootState } from '../store'

export interface SliceState {
    snippets: ISnippets[];
    pending: boolean;
    error: any;
    isSentToDB?: boolean;
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
}],
    pending: null,
    error: null,
    isSentToDB: null,

}


export const asyncGetSnippets = createAsyncThunk(
    'snippets/get',
    async (credentials: {ownerId: string}) => {
        const response = await SnippetsService.asyncGetSnippets(credentials.ownerId)
        return response.data;
    }
)

export const asyncNewSnippet = createAsyncThunk(
    'snippets/post',
    async (snippet: ISnippets) => {
        const response = await SnippetsService.asyncNewSnippet(snippet)
        return response.data
    }
)


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
        createSnippet: (state, action: PayloadAction<ISnippets>) => {
            const snippet = action.payload // obj
            
            state.snippets.push(snippet)
            saveSnippetStateToLocalStorage(state )

            
        },
        updateSnippet: (state, action: PayloadAction<ISnippets>) => {
            
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
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(asyncGetSnippets.pending, (state) => {
            state.pending = true;
            state.error = null
        })
        .addCase(asyncGetSnippets.fulfilled, (state, action) => {
            state.pending = false;
            state.error = null;
            const arr = Object.values(action.payload); 
            state.snippets = arr
        })
        .addCase(asyncGetSnippets.rejected, (state, action) => {
            state.pending = false;
            state.error = action.error.message
            console.log(state.error);
            
        })

        // new Snippet
        .addCase(asyncNewSnippet.pending, (state, action) => {
            state.pending = true;
            state.error = null;
            state.isSentToDB = null;
        })
        .addCase(asyncNewSnippet.fulfilled, (state, action) => {
            state.pending = false;
            state.error = null;
            //! Im not sure we need it 
            // state.isSentToDB = true;                
            // console.log('Sent to bd');
            // setTimeout(() => {
            //     state.isSentToDB = null;
                
            // }, 3000);
        })
        .addCase(asyncNewSnippet.rejected, (state, action) => {
            state.pending = true;
            state.error = true;
            state.isSentToDB = false
        })
    }
})

export const {createSnippet, updateSnippet, getSnippets, deleteSnippet} = snippetsSlice.actions
export default snippetsSlice.reducer