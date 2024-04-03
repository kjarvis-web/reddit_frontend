import { createSlice } from '@reduxjs/toolkit';
import threadService from '../services/threads';

const initialState = {
  threads: [],
  loading: false,
  comments: [],
};

//toolkit
const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    appendThread(state, action) {
      return { ...state, threads: [...state.threads, action.payload] };
    },
    initializeThreads(state, action) {
      return { ...state, threads: action.payload };
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    appendComment(state, action) {
      const findThread = state.threads.find((t) => t.id === action.payload.parentId);
      const newThread = { ...findThread, comments: [...findThread.comments, action.payload] };
      const newThreads = state.threads.filter((t) => t.id !== action.payload.parentId);
      return {
        ...state,
        threads: [...newThreads, newThread],
        comments: [...state.comments, action.payload],
      };
    },
    initializeComments(state, action) {
      return { ...state, comments: action.payload };
    },
    appendReply(state, action) {
      return { ...state, comments: [...state.comments, action.payload] };
    },
    appendUpVotes(state, action) {
      const findThread = state.threads.find((t) => t.id === action.payload.id);
      const upVoted = findThread.upVotes.find((user) => user === action.payload.user);
      const downVoted = findThread.downVotes.find((user) => user === action.payload.user);
      const newThreads = state.threads.filter((t) => t.id !== action.payload.id);
      if (upVoted) {
        return { ...state };
      }
      if (downVoted) {
        const removeDownVote = findThread.downVotes.filter(
          (userId) => userId !== action.payload.user
        );
        const newThread = {
          ...findThread,
          likes: action.payload.likes,
          downVotes: removeDownVote,
        };

        return { ...state, threads: [...newThreads, newThread] };
      }
      const newThread = {
        ...findThread,
        likes: action.payload.likes,
        upVotes: action.payload.upVotes,
      };

      return { ...state, threads: [...newThreads, newThread] };
    },
    appendDownVotes(state, action) {
      const findThread = state.threads.find((t) => t.id === action.payload.id);
      const upVoted = findThread.upVotes.find((user) => user === action.payload.user);
      const downVoted = findThread.downVotes.find((user) => user === action.payload.user);
      const newThreads = state.threads.filter((t) => t.id !== action.payload.id);
      if (downVoted) {
        console.log('test');
        return { ...state };
      }
      if (upVoted) {
        console.log('here');
        const removeUpvote = findThread.upVotes.filter((userId) => userId !== action.payload.user);
        console.log(removeUpvote);
        const newThread = {
          ...findThread,
          likes: action.payload.likes,
          upVotes: removeUpvote,
        };

        return { ...state, threads: [...newThreads, newThread] };
      }
      const newThread = {
        ...findThread,
        likes: action.payload.likes,
        downVotes: action.payload.downVotes,
      };

      return { ...state, threads: [...newThreads, newThread] };
    },
    appendUpVoteComment(state, action) {
      const findComment = state.comments.find((comment) => comment.id === action.payload.id);
      const upVoted = findComment.upVotes.find((user) => user === action.payload.user);

      const downVoted = findComment.downVotes.find((user) => user === action.payload.user);
      const newComments = state.comments.filter((c) => c.id !== action.payload.id);

      if (upVoted) {
        return state;
      }
      if (downVoted) {
        const removeDownVote = findComment.downVotes.filter((c) => c !== action.payload.user);
        const newComment = {
          ...findComment,
          likes: action.payload.likes,
          downVotes: removeDownVote,
        };

        return { ...state, comments: [...newComments, newComment] };
      }
      const newComment = {
        ...findComment,
        likes: action.payload.likes,
        upVotes: action.payload.upVotes,
      };

      return { ...state, comments: [...newComments, newComment] };
    },
    appendDownVoteComment(state, action) {
      const findComment = state.comments.find((comment) => comment.id === action.payload.id);
      const upVoted = findComment.upVotes.find((user) => user === action.payload.user);
      const downVoted = findComment.downVotes.find((user) => user === action.payload.user.id);
      const newComments = state.comments.filter((c) => c.id !== action.payload.id);
      console.log(downVoted);

      if (downVoted) {
        return state;
      }
      if (upVoted) {
        const removeUpVote = findComment.upVotes.filter((c) => c !== action.payload.user);
        const newComment = {
          ...findComment,
          likes: action.payload.likes,
          upVotes: removeUpVote,
        };

        return { ...state, comments: [...newComments, newComment] };
      }
      const newComment = {
        ...findComment,
        likes: action.payload.likes,
        downVotes: action.payload.downVotes,
      };
      return { ...state, comments: [...newComments, newComment] };
    },
  },
});

export const {
  appendThread,
  initializeThreads,
  initializeComments,
  setLoading,
  appendComment,
  replyToComment,
  initializeThread,
  appendReply,
  appendUpVotes,
  appendDownVotes,
  appendUpVoteComment,
  appendDownVoteComment,
} = threadSlice.actions;

export const createThread = (object) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const newThread = await threadService.create(object);
    dispatch(appendThread(newThread));
    dispatch(setLoading(false));
  };
};

export const getThreads = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const threads = await threadService.getAll();
    dispatch(initializeThreads(threads));
    dispatch(setLoading(false));
  };
};

export const getComments = () => {
  return async (dispatch) => {
    const comments = await threadService.getComments();
    dispatch(initializeComments(comments));
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await threadService.addComment(id, comment);
    console.log('addcomment', newComment);
    dispatch(appendComment(newComment));
  };
};

export const addReply = (id, comment) => {
  return async (dispatch) => {
    const newReply = await threadService.addReply(id, comment);
    console.log('reply', newReply);
    dispatch(appendReply(newReply));
  };
};

export const upVote = (newObj) => {
  return async (dispatch) => {
    const newPost = await threadService.upVote(newObj);
    console.log(newPost);
    dispatch(appendUpVotes(newPost));
  };
};

export const downVote = (newObj) => {
  return async (dispatch) => {
    const newPost = await threadService.downVote(newObj);
    console.log(newPost);
    dispatch(appendDownVotes(newPost));
  };
};

export const upVoteComment = (newObj) => {
  return async (dispatch) => {
    const newComment = await threadService.upVoteComment(newObj);
    console.log(newComment);
    dispatch(appendUpVoteComment(newComment));
  };
};

export const downVoteComment = (newObj) => {
  return async (dispatch) => {
    const newComment = await threadService.downVoteComment(newObj);
    console.log(newComment);
    dispatch(appendDownVoteComment(newComment));
  };
};

export default threadSlice.reducer;
