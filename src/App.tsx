import './App.css';
import Main from './components/Main/Main.jsx';
import Header from './components/Header/Header.jsx';
import React from 'react';


function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <hr />
      <Main />
    </div>
)
}

export default App;

//? If we turn of strict: "true"; from tsconfig, we got this error Could not find a declaration file for module './components/Main/Main.jsx'. '../Codebar/codebar/src/components/Main/Main.jsx' implicitly has an 'any' type.
//? If we write import not relative, but from "name of module", we'll get at compilation: Module not found: Error: Can't resolve 'codebar/components/Main/Main.jsx' in 'C:\...\Codebar\codebar\src'