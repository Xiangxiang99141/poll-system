import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Test from './pages/test'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

function App() {

  return (
    <Container fluid>
      <Test/>
    </Container>
  )
}

export default App
