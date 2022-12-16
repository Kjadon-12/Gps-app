
import './App.css';
import Login from './components/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './components/Register';
import GpsData from './components/GpsData';
import GpsDetail from './components/GpsDetail';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login btn="Login"/>}/>
      <Route path='/register' element={<Register btn="Register"/>}/>
      <Route path='/gps/data' element={<GpsData></GpsData>}/>
      <Route path='/gps/detail' element={<GpsDetail></GpsDetail>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
