import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import {Container} from 'react-bootstrap';
import "./css/components/container.css"
import SndNavbar from "./components/SndNavbar";
import { useMediaPredicate } from "react-media-hook";

function App() {
  const lessThan1000 = useMediaPredicate("(max-width: 1000px)");
  return (
    <BrowserRouter>
      <Container fluid>
        {!lessThan1000 && <Navbar />}
        <SndNavbar />
        <AppRouter />
      </Container>
    </BrowserRouter>
  );
}

export default App;