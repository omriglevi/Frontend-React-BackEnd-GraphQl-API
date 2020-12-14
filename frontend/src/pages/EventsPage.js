

import React, { useContext  , useEffect , useState}  from 'react'
import { Row , Col , Container, Button } from 'react-bootstrap';
import AuthContext from '../context/auth-context';
import CreateEventModal from './Modal/Modal'
import './EventPage.css' ;
import CardComponent from './ListComponentCards/CardComponent';

export default function EventsPage(props){
const [events, setEvents] = useState([])
useEffect(() => {
  fetchEvents() ; 
  return () => {
   //
  }
}, []) ;


  
  const context=useContext(AuthContext);
    
    const fetchEvents=async()=>{
     
  const requestBody  ={
    query:
    ` query{
      events
      {
          _id
          title
          price
          date
          description
       
      }
  }`
}



try {
  const requestToGql = await fetch('http://localhost:3001/graphql' , {
    method:'POST' , 
    body:JSON.stringify(requestBody) ,
    headers:{
        'Content-Type': 'application/json' 
    }}) ;

    const prettyReq=await requestToGql.json();
    const reqReturnedData=await prettyReq.data.events;   //<- THIS IS AN ARRAY OF EVENTS
    
    // console.log(prettyReq);
    console.log(reqReturnedData);

  



    if(requestToGql.status!==200 && requestToGql.status!==201){
    throw new Error("couldnt fetch events ")
    }
   
  setEvents(reqReturnedData ) ;
 

} catch (error) {
  console.log(error)
}

    }

    


 const eventList=events.map(event=>{
   const dateAndsTime=event.date.split("T") ; 
   const date=dateAndsTime[0];
   const timeWithSec=dateAndsTime[1]
   const time=timeWithSec.slice(0,5);
   const eventParticipants=(bookingArr)=>{
    
    if (!bookingArr || Object.keys(bookingArr)===0 )
    {
      console.log(bookingArr)
      return "0" ;
    }
    return bookingArr.length()

   }
      return (
    <CardComponent bookings={eventParticipants(event.bookings)} time={time} date={date} title={event.title}/>
   )
  //  <li className="event_list-item"> 
  //  <Row>
  // <Col> Title : {event.title} 
  // Price :  {event.price}
  
  // </Col>
  
  // <Col> 
  // Date :  {date[0]} <br/>
  // Time:{date[1]} 
  // </Col> 
  
  // <Col>Description:  {event.description}  </Col> 
  // <Col> 
  // <Button variant='primary'> Book</Button> 
  // <Button variant='primary'> Participants</Button>
  //  </Col> 


  //  </Row> 
  //  </li>


   
 }) ;




   
return (
 
<Container> 
  <Row>
    <Col>
    <Row>
        {
           context.token &&
          <CreateEventModal></CreateEventModal>  
         }
    </Row>
    <section>
<ul className='events_list'>
  {eventList}
</ul>

    </section>
   

    
    </Col>
  </Row>

</Container>



)

}

