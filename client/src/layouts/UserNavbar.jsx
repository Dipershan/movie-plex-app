
import {Button ,
  
   Container ,
   ButtonToolbar,
   Nav ,
   ButtonGroup,
   Navbar,
   } from 'react-bootstrap';
   import { AiOutlineLogin } from "react-icons/ai";
   import { BiCartDownload } from "react-icons/bi";
   import Logo from "../assets/logo.png"
   import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#"><img src={Logo} width={60} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Link className="nav-link"  to="/">Home</Link>
          <Nav.Link href="nav-link" to="/contact">Contact</Nav.Link>
          </Nav>
         
          <div className ="d-flex">
          <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2">
        
          <Link className='nav-link' to="/cart">
          <span className="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
           <BiCartDownload size="1.5rem" color='gold'/>
              &nbsp;0
           </span>
           </Link>
          </ButtonGroup>

          <ButtonGroup className="me-2" >
          <Link className='nav-link' to="/register">
          <Button className='btn btn-danger'><AiOutlineLogin /></Button> 
          </Link>
          </ButtonGroup>
        
          </ButtonToolbar>
            
          </div>
        
        
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default UserNavbar