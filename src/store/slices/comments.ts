import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Comment, Offer, SendCommentPayload} from '../../contracts/contaracts.ts';
import {RequestStatus, ServerRoutes} from '../../constants/constants.ts';
import {ThunkApi} from '../store-types.ts';

interface CommentsState {
  comments: Comment[];
  requestStatus: RequestStatus;
}

const initialState: CommentsState = {
  comments: [],
  requestStatus: RequestStatus.Idle
};

const fetchComments = createAsyncThunk<Comment[], Offer['id'], ThunkApi>(
  'fetchComments',
  async (offerId, {extra: api}) => {
    const response = await api.get<Comment[]>(`${ServerRoutes.comments}${offerId}`);
    return response.data;
  }
);

const sendComment = createAsyncThunk<Comment, SendCommentPayload, ThunkApi>(
  'sendComment',
  async ({offerId,comment}, {extra: api}) => {
    const response = await api.post<Comment>(`${ServerRoutes.comments}${offerId}`,comment);
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state: CommentsState, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      state.requestStatus = RequestStatus.Fulfilled;
    });
    builder.addCase(fetchComments.rejected, (state: CommentsState) => {
      state.requestStatus = RequestStatus.Rejected;
    });
    builder.addCase(fetchComments.pending, (state: CommentsState) => {
      state.comments = [];
      state.requestStatus = RequestStatus.Pending;

    });
    builder.addCase(sendComment.fulfilled, (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
      state.requestStatus = RequestStatus.Fulfilled;
    });
    builder.addCase(sendComment.rejected, (state) => {
      state.requestStatus = RequestStatus.Rejected;
    });
    builder.addCase(sendComment.pending, (state) => {
      state.requestStatus = RequestStatus.Pending;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;
export {commentsSlice, fetchComments, sendComment};

export type {CommentsState};
