

import React, { useContext  , useEffect , useState}  from 'react'
import { Row , Col , Container,  Spinner, Card} from 'react-bootstrap';
import AuthContext from '../context/auth-context';
import CreateEventModal from './Modal_for_creating_event/Modal'
import './EventPage.css' ;
import CardComponent from './ListComponentCards/CardComponent';


export default function EventsPage(props){
const [isLoading, setIsLoading] = useState(false);
const [triger, setTriger] = useState(false);
  
const [events, setEvents] = useState([]);
useEffect(() => {
  fetchEvents() ; 
  return () => {
   //
  }
}, [triger]) ;

const triggerHandler = ()=>{
  setTriger(!triger);
 

}

  
  const context=useContext(AuthContext);
    
    const fetchEvents=async()=>{
  setIsLoading(true) ;
     
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
          maxBookings
          bookings{
            _id
            user{
              email
            }

          }
       
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
    
    throw new Error("couldnt fetch events ");
    }
   
  setEvents(reqReturnedData ) ;
  setIsLoading(false) ;
 

} catch (error) {
  console.log(error) ;
  setIsLoading(false) ;

}

    }

    


 const eventList=events.map( event=>{
   const dateAndsTime=event.date.split("T") ; 
   const date=dateAndsTime[0];
   const timeWithSec=dateAndsTime[1]
   const time=timeWithSec.slice(0,5);
      return (
    <CardComponent maxBookings={event.maxBookings} eventId={event._id} bookings={event.bookings}  time={time} date={date} title={event.title}/>
   )
 }) ;




   
return (
 
<Container> 



  <Row>
  
    <Col>
    <Row>
        {
           context.token &&
          <CreateEventModal trigger={triggerHandler}></CreateEventModal>  
         }
    </Row>
    <section>

  {!isLoading? 
  <ul className='events_list'> {eventList} </ul>    :
  <Card style={{ width: '100%' , margin:'.5rem' , border:'none' }}>
    <Card.Body style={{  marginLeft:'auto' , marginRight:'auto'  }}>
<Spinner variant='primary' animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
</Card.Body>
</Card>
   }
  


    </section>
   

    
    </Col>
  </Row>

</Container>



)

}

