import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, EMPTY_USER, REQUEST_STATUS} from '../../constants/constants.ts';
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
  status: AuthorizationStatus;
  user: User;
  requestStatus: REQUEST_STATUS;
}

const initialState = {
  status: AuthorizationStatus.Unknown,
  user: EMPTY_USER,
  requestStatus: REQUEST_STATUS.IDLE
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.requestStatus = REQUEST_STATUS.FULFILLED;
      state.user = action.payload;
      state.status = AuthorizationStatus.Authorized;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.REJECTED;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
    builder.addCase(checkAuth.pending,(state) => {
      state.requestStatus = REQUEST_STATUS.PENDING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.requestStatus = REQUEST_STATUS.FULFILLED;
      state.user = action.payload;
      state.status = AuthorizationStatus.Authorized;
    });
    builder.addCase(login.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.REJECTED;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
    builder.addCase(login.pending,(state) => {
      state.requestStatus = REQUEST_STATUS.PENDING;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.requestStatus = REQUEST_STATUS.FULFILLED;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
    builder.addCase(logout.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.REJECTED;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
    builder.addCase(logout.pending,(state) => {
      state.requestStatus = REQUEST_STATUS.PENDING;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
  }
});

export const authenticationReducer = authenticationSlice.reducer;
export const authenticationAction = authenticationSlice.actions;

export {authenticationSlice, checkAuth, logout, login};
export type {AuthenticationState};
