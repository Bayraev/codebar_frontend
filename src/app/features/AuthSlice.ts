// authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../service/AuthService';
import { AuthResponse } from '../models/response/AuthResponse';
import { IUser } from '../models/IUser';

interface AuthState {
  loading: boolean;
  error: string | null;
  user: IUser;
  isAuth: boolean;
}

const initialState: AuthState = {
  loading: false, 
  error: null,
  user: null,
  isAuth: false,
};


export const registration = createAsyncThunk(
  'auth/registration',
  async (credentials : { email: string; password: string }) => {
    const response = await AuthService.registration(credentials.email, credentials.password)
    return response.data;
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await AuthService.login(credentials.email, credentials.password);
    return response.data; // accessToken, refreshToken, user 
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async() =>{
  const response = await AuthService.logout();
  }

)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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

  },
});

export default authSlice.reducer;
