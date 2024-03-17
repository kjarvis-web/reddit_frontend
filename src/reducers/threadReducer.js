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

export const initializeThreads = (payload) => {
  return {
    type: 'INITIALIZE_THREADS',
    payload,
  };
};

export const updateThreads = (newThread) => {
  return { type: 'CREATE', payload: newThread };
};

export default threadReducer;
