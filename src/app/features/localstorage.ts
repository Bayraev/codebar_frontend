import { useSelector } from "react-redux";
import { SliceState } from "./snippetsSlice";
import { RootState } from "../store";

const isAuth: boolean = useSelector((state: RootState) => state.authorization.isAuth);

// it accepts whole all snippet state to localstorage state under "snippetsState" key
export const saveSnippetStateToLocalStorage = (state: SliceState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('snippetsState', serializedState);
    // console.log(JSON.parse(localStorage.getItem('snippetsState'))); //* эта тема парсит восстановленный из лс строку в жс объект, потом логирует
    
    
  } catch (error) {
    // Обработка ошибок при сохранении состояния
    console.error('Error saving state to localStorage: ', error);
  }
};

export const saveFromLStoDB = () => {
  
}

export const clearLocalStorage = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error at localstorage clear: ', error);
  }
}
