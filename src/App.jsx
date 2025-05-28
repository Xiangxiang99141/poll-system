import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Routes, Route ,useRoutes} from 'react-router-dom'
import './App.css'
import Test from './pages/test'
import Welcome from './pages/welcome';


function App() {

  return (
    <Container fluid>
      <Routes>
        <Route path='/' element={<Welcome/>}></Route>
        <Route path='/admin' element={<Test/>}></Route>
      </Routes>
    </Container>
  )
}

export default App
