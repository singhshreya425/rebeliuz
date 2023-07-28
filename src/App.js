
import React from 'react'
import MyForm from './form'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<MyForm/>}/>
        </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App



