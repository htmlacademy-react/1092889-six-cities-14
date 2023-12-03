import {getComments} from '../../mocks/offersMocks.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Comment} from '../../contracts/contaracts.ts';

interface CommentsStore {
  comments: Comment[];
}

const initialState: CommentsStore = {
  comments: getComments(),
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state , action: PayloadAction<Comment>){
      state.comments.push(action.payload);
    }
  }
});

export const commentsReducer = commentsSlice.reducer;
export const commentsActions = commentsSlice.actions;
export {commentsSlice};
