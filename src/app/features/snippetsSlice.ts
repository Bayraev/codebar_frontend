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
    snippets: [],
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

export const asyncDeleteSnippet = createAsyncThunk(
    'snippets/delete',
    async (_id: string) => {
        const response = await SnippetsService.asyncDeleteSnippet(_id)
        return response.data
    }
)

export const asyncUpdateSnippet = createAsyncThunk(
    'snippets/update',
    async (snippet: ISnippets)=> {
        console.log(snippet);
        
        const response = await SnippetsService.asyncUpdateSnippet(snippet)
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
            const filteredSnippets = state.snippets.filter(snippet => snippet._id !== action.payload)
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

            arr.map(snippet => {
                state.snippets.push(snippet)
            })

        })
        .addCase(asyncGetSnippets.rejected, (state, action) => {
            state.pending = false;
            state.error = action.error.message
            console.log(state.error);
            
        })

        // new Snippet
        .addCase(asyncNewSnippet.pending, (state) => {
            state.pending = true;
            state.error = null;
            state.isSentToDB = null;
        })
        .addCase(asyncNewSnippet.fulfilled, (state, action) => {
            state.pending = false;
            state.error = null;
            state.snippets.push(action.payload)
        })
        .addCase(asyncNewSnippet.rejected, (state) => {
            state.pending = false;
            state.error = true;
            state.isSentToDB = false
            setTimeout(() => {
                state.isSentToDB = null
            }, 5000);
        })

        // delete snippet



        // update snippet
        .addCase(asyncUpdateSnippet.pending, (state) => {
            state.pending = true;
            state.error = null;
        })
        .addCase(asyncUpdateSnippet.fulfilled, (state, action) => {
            state.pending = false;
            state.error = null;
            
            const snippetIndex = state.snippets.findIndex(snippet => action.payload._id === snippet._id); // getting index
            console.log(action.payload);
            
            if (snippetIndex !== -1) {
                state.snippets[snippetIndex] = action.payload;
            }
        })
        .addCase(asyncUpdateSnippet.rejected, (state, action) =>  {
            state.pending = false
            state.error = true
            
        })
    }
})

export const {createSnippet, updateSnippet, getSnippets, deleteSnippet} = snippetsSlice.actions
export default snippetsSlice.reducer