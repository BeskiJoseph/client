import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './register';
import Deposit from './deposit';
import Cashback from './cashback';
import AllData from './alldata';
import Home from './Home';
import UserContext from './context';
import "./nav.css";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Navbar className="custom-navbar" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="navbar-brand"></Navbar.Brand>
          <Nav className="mx-auto"> {/* Centering the Navbar */}
            <Nav.Link href="#home" className="nav-item">Home</Nav.Link>
            <Nav.Link href="#register" className="nav-item">Register</Nav.Link>
            <Nav.Link href="#deposit" className="nav-item">Deposit</Nav.Link>
            <Nav.Link href="#cashback" className="nav-item">Withdraw</Nav.Link>
            <Nav.Link href="#alldata" className="nav-item">All Data</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <HashRouter>
        <UserContext.Provider value={{
          user: [{
            Name: "Beski",
            Email: "beski@gmail.com",
            Password: "xyzxyz",
            Amount: 1000
          }]
        }}>
          <Routes>
            {/* Default route that redirects to Home */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/cashback" element={<Cashback />} />
            <Route path="/alldata" element={<AllData />} />
            {/* Catch-all route for unknown paths */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </UserContext.Provider>
      </HashRouter>
      
      <Footer />
    </>
  );
}

export default App;
