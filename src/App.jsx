import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Routes, Route ,useRoutes} from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Manage from './pages/manage'
import Welcome from './pages/welcome';
import Login from './pages/login';
import NotFound from './pages/404notfound';
function App() {
  const isAdmin = localStorage.getItem('isAdmin') || false;
  return (
    <>
      <Header/>
      <Container className='p-3'>
        <Routes>
          <Route path='/' element={<Welcome/>}></Route>
          <Route path='/manage' element={<Manage isAdmin={isAdmin}/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default App
