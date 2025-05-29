import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Routes, Route ,useRoutes} from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Test from './pages/test'
import Welcome from './pages/welcome';
import Login from './pages/login';

function App() {

  return (
    <>
      <Header/>
      <Container className='p-3'>
        <Routes>
          <Route path='/' element={<Welcome/>}></Route>
          <Route path='/admin' element={<Test/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default App
