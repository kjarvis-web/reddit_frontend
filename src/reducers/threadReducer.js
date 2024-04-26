import { createSlice } from '@reduxjs/toolkit';
import threadService from '../services/threads';

const initialState = {
  threads: [],
  loading: false,
  comments: [],
  post: null,
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
      const downVoted = findThread.downVotes.find((user) => user === action.payload.user);
      const newThreads = state.threads.filter((t) => t.id !== action.payload.id);

      if (downVoted) {
        const removeDownVote = findThread.downVotes.filter(
          (userId) => userId !== action.payload.user
        );
        const newThread = {
          ...findThread,
          likes: action.payload.likes,
          downVotes: removeDownVote,
          author: action.payload.author,
        };

        return { ...state, threads: [...newThreads, newThread] };
      }

      const newThread = {
        ...findThread,
        likes: action.payload.likes,
        upVotes: action.payload.upVotes,
        user: action.payload.user,
        author: action.payload.author,
      };

      return { ...state, threads: [...newThreads, newThread] };
    },
    appendDownVotes(state, action) {
      const findThread = state.threads.find((t) => t.id === action.payload.id);
      const upVoted = findThread.upVotes.find((user) => user === action.payload.user);
      const newThreads = state.threads.filter((t) => t.id !== action.payload.id);

      if (upVoted) {
        const removeUpvote = findThread.upVotes.filter((userId) => userId !== action.payload.user);
        const newThread = {
          ...findThread,
          likes: action.payload.likes,
          upVotes: removeUpvote,
          user: action.payload.user,
          author: action.payload.author,
        };

        return { ...state, threads: [...newThreads, newThread] };
      }
      const newThread = {
        ...findThread,
        likes: action.payload.likes,
        downVotes: findThread.downVotes.concat(action.payload.downVotes),
        author: action.payload.author,
      };

      return { ...state, threads: [...newThreads, newThread] };
    },
    appendUpVoteComment(state, action) {
      const findComment = state.comments.find((comment) => comment.id === action.payload.id);

      const downVoted = findComment.downVotes.find((user) => user === action.payload.user);
      const newComments = state.comments.filter((c) => c.id !== action.payload.id);

      if (downVoted) {
        const removeDownVote = findComment.downVotes.filter((c) => c !== action.payload.user);
        const newComment = {
          ...findComment,
          likes: action.payload.likes,
          downVotes: removeDownVote,
          author: action.payload.author,
        };

        return { ...state, comments: [...newComments, newComment] };
      }
      const newComment = {
        ...findComment,
        likes: action.payload.likes,
        upVotes: action.payload.upVotes,
        author: action.payload.author,
      };

      return { ...state, comments: [...newComments, newComment] };
    },
    appendDownVoteComment(state, action) {
      const findComment = state.comments.find((comment) => comment.id === action.payload.id);
      const upVoted = findComment.upVotes.find((user) => user === action.payload.user);
      const newComments = state.comments.filter((c) => c.id !== action.payload.id);

      if (upVoted) {
        const removeUpVote = findComment.upVotes.filter((c) => c !== action.payload.user);
        const newComment = {
          ...findComment,
          likes: action.payload.likes,
          upVotes: removeUpVote,
          author: action.payload.author,
        };

        return { ...state, comments: [...newComments, newComment] };
      }

      const newComment = {
        ...findComment,
        likes: action.payload.likes,
        downVotes: action.payload.downVotes,
        author: action.payload.author,
      };

      return { ...state, comments: [...newComments, newComment] };
    },
    deletePost(state) {
      return state;
    },
    editPost(state, action) {
      return { ...state, post: action.payload };
    },
    editComment(state, action) {
      const newComments = state.comments.filter((comment) => comment.id !== action.payload.id);
      return { ...state, comments: [...newComments, action.payload] };
    },
    setPost(state, action) {
      return { ...state, post: action.payload };
    },
    resetPost(state) {
      return { ...state, post: null };
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
  deletePost,
  editPost,
  deleteComment,
  editComment,
  setPost,
  resetPost,
} = threadSlice.actions;

export const createThread = (object) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newThread = await threadService.create(object);
      dispatch(appendThread(newThread));
      dispatch(setLoading(false));
      return newThread;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getThreads = (page) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const threads = await threadService.getPage(page);
    dispatch(initializeThreads(threads));
    dispatch(setLoading(false));
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    const post = await threadService.getThread(id);
    dispatch(setPost(post));
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

    dispatch(appendComment(newComment));
  };
};

export const addReply = (id, comment) => {
  return async (dispatch) => {
    const newReply = await threadService.addReply(id, comment);

    dispatch(appendReply(newReply));
  };
};

export const upVote = (newObj) => {
  return async (dispatch) => {
    const newPost = await threadService.upVote(newObj);

    dispatch(appendUpVotes(newPost));
  };
};

export const downVote = (newObj) => {
  return async (dispatch) => {
    const newPost = await threadService.downVote(newObj);

    dispatch(appendDownVotes(newPost));
  };
};

export const upVoteComment = (newObj) => {
  return async (dispatch) => {
    const newComment = await threadService.upVoteComment(newObj);

    dispatch(appendUpVoteComment(newComment));
  };
};

export const downVoteComment = (newObj) => {
  return async (dispatch) => {
    const newComment = await threadService.downVoteComment(newObj);

    dispatch(appendDownVoteComment(newComment));
  };
};

export const removePost = (id) => {
  return async (dispatch) => {
    const newThreads = await threadService.remove(id);

    dispatch(deletePost(newThreads));
  };
};

export const updatePost = (editedPost) => {
  return async (dispatch) => {
    const thread = await threadService.update(editedPost);

    dispatch(editPost(thread));
  };
};

export const updateComment = (newComment) => {
  return async (dispatch) => {
    const comment = await threadService.updateComment(newComment);
    dispatch(editComment(comment));
  };
};

export default threadSlice.reducer;
