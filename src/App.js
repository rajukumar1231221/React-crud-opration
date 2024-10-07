// import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header.jsx';
import UserData from './Components/Dashboard/UserData.jsx'
import UserForm from './Components/Creating-Data/UserForm.jsx';
import Edit from './Components/Updation/Edit.jsx';
function App() {
  return (
   <> 
 
 <BrowserRouter>
    <Header/>
    <Routes>
       <Route path='User-data' element={<UserData/>}/>
     <Route path='create_user' element={<UserForm/>}/>
     <Route path='edit/:id' element={<Edit/>}/>
    </Routes>
    </BrowserRouter>
    <div className=' text-center ' style={{fontSize:"100px",fontWeight:"600",marginTop:"50px"}}>
    Crud Opration
    </div>
   </>
  );
}

export default App;
