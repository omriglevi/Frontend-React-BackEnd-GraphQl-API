import React , {useContext} from 'react' ;
import './navBarMain.css'
import logo from './logo.jpg'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../context/auth-context';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const { Navbar, Nav, Button, Row, Col } = require("react-bootstrap");





export default function MainNavBar (props) {


    const context = useContext(AuthContext) ;
   







    return (<Navbar collapseOnSelect expand="sm" >
    <Navbar.Brand href="/">  <img
        src={logo}
        width="150"
        height="50"
        className="d-inline-block align-top"
        alt=" logo"
      />   </Navbar.Brand>
      


    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      { !context.token && <Nav.Link  href="/auth"> <AccountCircleIcon/> Authenticate</Nav.Link>  }
      <Nav.Link href="/events"> Events</Nav.Link>
      { context.token &&   <Nav.Link to="/bookings"> Bookings</Nav.Link> }

       
      </Nav>
 
       
       
       
   
    </Navbar.Collapse>
    { context.token && <Row> 
      <Nav> <Nav.Link href='/userinfo'> <Button>   <FaceIcon/>   </Button> </Nav.Link> </Nav>
       
   
    <Nav>  <Nav.Link  href='/' onClick={context.logout} > <Button> <ExitToAppIcon/></Button>  </Nav.Link> 
             </Nav>
           
    </Row>  
         }
  </Navbar>)
}
