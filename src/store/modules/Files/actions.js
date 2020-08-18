export function saveIdFile(id) {
  return {
    type: '@FILE/SAVE_ID',
    payload: { id },
  };
}
