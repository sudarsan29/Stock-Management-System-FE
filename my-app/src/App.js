import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Products from './pages/Products'
import AddPrdoucts from './pages/AddProducts'
import Profile from './pages/Profile'
import StockOverview from './pages/stockOverview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/addProducts' element={<AddPrdoucts />}></Route>
        <Route path='/stockOverview' element={<StockOverview />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
