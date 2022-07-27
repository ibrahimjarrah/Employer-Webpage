import './App.css';
import React from 'react';
import Table from './Components/Table';
import Signup from './Components/Signup';
import EditUser from './Components/EditUser';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too
function App() {

  

  
  return (
    <BrowserRouter>
    <Routes>
      <Route  exact path="/" element={<Table/>}/>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/edit' element={<EditUser/>}></Route>

    </Routes>
  </BrowserRouter>
  );
}

export default App;
