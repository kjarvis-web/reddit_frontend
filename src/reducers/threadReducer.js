import threadService from '../services/threads';

const initialState = {
  threads: [],
  loading: false,
};

const threadReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE':
      return { ...state, threads: [...state.threads, action.payload] };
    case 'INITIALIZE_THREADS':
      return { ...state, threads: action.payload };
    default:
      return state;
  }
};

export const appendThread = (payload) => {
  return {
    type: 'CREATE',
    payload,
  };
};

export const initializeThreads = (payload) => {
  return {
    type: 'INITIALIZE_THREADS',
    payload,
  };
};

export const createThread = (object) => {
  return async (dispatch) => {
    const newThread = await threadService.create(object);
    dispatch(appendThread(newThread));
  };
};

export const initializeThunk = () => {
  return async (dispatch) => {
    const threads = await threadService.getAll();
    dispatch(initializeThreads(threads));
  };
};

export default threadReducer;
