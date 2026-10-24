import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import ViewEmployee from './pages/ViewEmployee'
import CreateEmployee from './pages/CreateEmployee'
import EditEmployee from './pages/EditEmployee'
import DispplayEmployee from './pages/DispplayEmployee'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ViewEmployee/>} />
          <Route path="/createemp" element={<CreateEmployee/>}/>
          <Route path="/editemp/:eid" element={<EditEmployee/>}/>
          <Route path="/displayemp/:eid" element={<DispplayEmployee/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
