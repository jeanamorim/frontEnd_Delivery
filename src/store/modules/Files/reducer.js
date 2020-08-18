import producer from 'immer';

const INITIAL_STATE = [];

export default function file(state = INITIAL_STATE, action) {
  return producer(state, draft => {
    switch (action.type) {
      case '@FILE/SAVE_ID': {
        draft.push(action.payload.id);
        break;
      }

      default:
    }
  });
}
