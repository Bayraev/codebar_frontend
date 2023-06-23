import { SliceState } from "./snippetsSlice";

// it accepts whole snippet state 
export const saveSnippetStateToLocalStorage = (state: SliceState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('snippetsState', serializedState);

    console.log(JSON.parse(localStorage.getItem('snippetsState')));
    
    
  } catch (error) {
    // Обработка ошибок при сохранении состояния
    console.error('Error saving state to localStorage: ', error);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error at localstorage clear: ', error);
  }
}
