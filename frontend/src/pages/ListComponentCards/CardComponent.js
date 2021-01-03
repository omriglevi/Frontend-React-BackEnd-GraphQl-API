
import { Button, Card, ListGroup, ListGroupItem, Row  } from "react-bootstrap";
import logo from './cardPicOfStudio.jpeg';
import InfoIcon from '@material-ui/icons/Info';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AuthContext from '../../context/auth-context';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useContext, useState } from "react";



export default function EventCards(props){
const[ isClicledInfoBtn,  setIsClicledInfoBtn]=useState(false)


  const requestBody  ={
    query:
    `mutation
    {
      bookEvent(eventId:"${props.eventId}")
      {
        _id
      }
    
  }`
}







const eventParticipants=  props.bookings.map(booking=>{
  return <li> {booking.user.email} </li>
});
 

  
  









const context = useContext(AuthContext);
const token=context.token

  const bookEventHandler=async ()=>{
    try {
      const requestToGql = await fetch('http://localhost:3001/graphql' , {
      method:'POST' , 
      body:JSON.stringify(requestBody) ,
      headers:{
          'Content-Type': 'application/json' , 
          'Authorization': 'Bearer ' + token
      }}) ;
  
      const prettyReq=await requestToGql.json();
    } catch (error) {
      
      console.log(error);
    }
  }
  
  




    return (
        <Card style={{ width: '100%' , margin:'.5rem' }}>
  <Card.Img variant="top" src={logo} />
  <Card.Body>
    <Card.Title><FitnessCenterIcon/> {props.title}</Card.Title>
    <Card.Text>
     {props.description}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem><DateRangeIcon/> {props.date}</ListGroupItem>
    <ListGroupItem> <ScheduleIcon/> { props.time}</ListGroupItem>
    <ListGroupItem>  {props.bookings.length}/{props.maxBookings}</ListGroupItem>
    <ListGroupItem><LocationOnIcon/>  Location</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Button onClick={bookEventHandler} variant='primary '> <EventAvailableIcon/> Book  </Button>
    <Button onClick={()=>setIsClicledInfoBtn(!isClicledInfoBtn)} variant='info '> View <InfoIcon/> </Button>
   

    {isClicledInfoBtn && <ul> {eventParticipants}</ul> }
  </Card.Body>
 


</Card>
    )

    
}