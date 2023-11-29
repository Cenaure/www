import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import {Container} from 'react-bootstrap';
import "./css/components/container.css"
import { useMediaPredicate } from "react-media-hook";

function App() {
  const lessThan1000 = useMediaPredicate("(max-width: 1000px)");
  return (
    <BrowserRouter>
      <Navbar />
      <Container fluid>
        <AppRouter />
      </Container>
    </BrowserRouter>
  )
}

export default App
