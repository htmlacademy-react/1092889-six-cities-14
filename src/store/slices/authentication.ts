import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AUTHORIZATION_STATUS, EMPTY_USER, REQUEST_STATUS} from '../../constants/constants.ts';
import {LoginCredentials, User} from '../../contracts/contaracts.ts';
import {ThunkApi} from '../store-types.ts';
import {saveToken} from '../../api/token.ts';

const checkAuth = createAsyncThunk<User, undefined, ThunkApi>(
  'checkAuth',
  async (_arg, {extra: api}) => {
    const response = await api.get<User>('/login');
    return response.data;
  }
);

const login = createAsyncThunk<User, LoginCredentials, ThunkApi>(
  'login',
  async (loginDetails, {extra: api}) => {
    const response = await api.post<User>('/login', loginDetails);
    saveToken(response.data.token);
    return response.data;
  }
);

const logout = createAsyncThunk<number, undefined, ThunkApi>(
  'logout',
  async (_arg, {extra: api}) => {
    const response = await api.delete('/logout');
    return response.status;
  }
);

interface AuthenticationState {
  status: AUTHORIZATION_STATUS;
  user: User;
  requestStatus: REQUEST_STATUS;
}

const initialState = {
  status: AUTHORIZATION_STATUS.UNKNOWN,
  user: EMPTY_USER,
  requestStatus: REQUEST_STATUS.IDLE
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.requestStatus = REQUEST_STATUS.FULFILLED;
      state.user = action.payload;
      state.status = AUTHORIZATION_STATUS.AUTHORIZED;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.REJECTED;
      state.user = EMPTY_USER;
      state.status = AUTHORIZATION_STATUS.UNAUTHORIZED;
    });
    builder.addCase(checkAuth.pending,(state) => {
      state.requestStatus = REQUEST_STATUS.PENDING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.requestStatus = REQUEST_STATUS.FULFILLED;
      state.user = action.payload;
      state.status = AUTHORIZATION_STATUS.AUTHORIZED;
    });
    builder.addCase(login.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.REJECTED;
      state.user = EMPTY_USER;
      state.status = AUTHORIZATION_STATUS.UNAUTHORIZED;
    });
    builder.addCase(login.pending,(state) => {
      state.requestStatus = REQUEST_STATUS.PENDING;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.requestStatus = REQUEST_STATUS.FULFILLED;
      state.user = EMPTY_USER;
      state.status = AUTHORIZATION_STATUS.UNAUTHORIZED;
    });
    builder.addCase(logout.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.REJECTED;
      state.user = EMPTY_USER;
      state.status = AUTHORIZATION_STATUS.UNAUTHORIZED;
    });
    builder.addCase(logout.pending,(state) => {
      state.requestStatus = REQUEST_STATUS.PENDING;
      state.user = EMPTY_USER;
      state.status = AUTHORIZATION_STATUS.UNAUTHORIZED;
    });
  }
});

export const authenticationReducer = authenticationSlice.reducer;

export {authenticationSlice, checkAuth, logout, login};
export type {AuthenticationState};
