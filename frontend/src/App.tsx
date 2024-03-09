import React from 'react';
import UserForm from "./UserForm";
import DisplayUsers from "./DisplayUsers";
import WelcomePage from './Welcome';
import './App.css';



function App() {

    return (
    <div className="App">
        <DisplayUsers></DisplayUsers>
        <UserForm></UserForm>
        <WelcomePage></WelcomePage>
    </div>
  );
}

export default App;
