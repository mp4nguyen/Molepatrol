export const ADD_TOAST = 'ADD_TOAST';
export function addToast(message) {
  return { type: ADD_TOAST, message: { ...message, duration: 1000 },
  };
}
