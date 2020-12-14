
import { Button, Card, ListGroup, ListGroupItem  } from "react-bootstrap";
import logo from './cardPicOfStudio.jpeg';
import InfoIcon from '@material-ui/icons/Info';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';

import LocationOnIcon from '@material-ui/icons/LocationOn';

export default function EventCards(props){


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
    <ListGroupItem>  { props.bookings}</ListGroupItem>
    <ListGroupItem><LocationOnIcon/>  Location</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Button variant='primary '> <EventAvailableIcon/> Book  </Button>
    <Button variant='info '> View <InfoIcon/> </Button>
  </Card.Body>
</Card>
    )

    
}