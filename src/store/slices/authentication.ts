import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, EMPTY_USER, RequestStatus} from '../../constants/constants.ts';
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
  requestStatus: RequestStatus;
}

const initialState: AuthenticationState = {
  status: AuthorizationStatus.Unknown,
  user: EMPTY_USER,
  requestStatus: RequestStatus.Idle
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.Fulfilled;
      state.user = action.payload;
      state.status = AuthorizationStatus.Authorized;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.requestStatus = RequestStatus.Rejected;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
    builder.addCase(checkAuth.pending,(state) => {
      state.requestStatus = RequestStatus.Pending;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.Fulfilled;
      state.user = action.payload;
      state.status = AuthorizationStatus.Authorized;
    });
    builder.addCase(login.rejected, (state) => {
      state.requestStatus = RequestStatus.Rejected;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
    builder.addCase(login.pending,(state) => {
      state.requestStatus = RequestStatus.Pending;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.requestStatus = RequestStatus.Fulfilled;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
    builder.addCase(logout.rejected, (state) => {
      state.requestStatus = RequestStatus.Rejected;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
    builder.addCase(logout.pending,(state) => {
      state.requestStatus = RequestStatus.Pending;
      state.user = EMPTY_USER;
      state.status = AuthorizationStatus.Unauthorized;
    });
  }
});

export const authenticationReducer = authenticationSlice.reducer;

export {authenticationSlice, checkAuth, logout, login};
export type {AuthenticationState};
