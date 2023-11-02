// authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../service/AuthService';
import { AuthResponse } from '../models/response/AuthResponse';
import { IUser } from '../models/IUser';
import axios from 'axios';
import { API_URL } from '../http/http';

interface AuthState {
  loading: boolean;
  error: string | null;
  user: IUser;
  isAuth: boolean;
  authWindowOpened: boolean;
}

const initialState: AuthState = {
  loading: false, 
  error: null,
  user: {
    id: null,
    email: null,
    isActivated: null
  },
  isAuth: false,
  authWindowOpened: false
};


// Action creator for user registration
export const registration = createAsyncThunk(
  'auth/registration', // Unique identifier for this action
  async (credentials: { email: string; password: string }) => { // credetials contains that object
    const response = await AuthService.registration(credentials.email.toLowerCase(), credentials.password);
    return response.data; // Return the data from the API response
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await AuthService.login(credentials.email.toLowerCase(), credentials.password);
    return response.data; // accessToken, refreshToken, user 
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async() =>{
  const response = await AuthService.logout();
  return response
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async() => {
    // here we dont use our interceptors cuz we have not big deal with it.
    // using 'withCredentials' to send cookies automatically to back
    // PUT IT IN AuthService 
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
    return response.data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchAuthWindowOpened: (state) => {
      state.authWindowOpened = !state.authWindowOpened
    }
  },
  extraReducers: (builder) => {
    builder
    // registration
      .addCase(registration.pending, (state, payload) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuth = true;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken)
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred.';
        
      })

    // login
      .addCase(login.pending, (state, payload) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        //! re-useful snippet
        state.isAuth = true;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred.';
        
      })

    // logout
      .addCase(logout.pending, (state, action) => {
        state.loading = true
        state.error = null

      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuth = false;
        state.user = {} as IUser;
        localStorage.removeItem('token')
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred.';
        
      })

      // refresh
      .addCase(checkAuth.fulfilled, (state, action) => {

        state.isAuth = true;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken)
      })

  },
});

export const {switchAuthWindowOpened} = authSlice.actions
export default authSlice.reducer;
