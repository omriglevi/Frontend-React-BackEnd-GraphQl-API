import React ,  {   useState , useContext  } from "react";
import AuthContext from '../../context/auth-context';
import './Modal.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BlockIcon from '@material-ui/icons/Block';
import SportsIcon from '@material-ui/icons/Sports';
import ClearIcon from '@material-ui/icons/Clear';
const  { Modal , Button, Col, Row, Container  } = require("react-bootstrap");



export default function CreateEventModal (props){
  const [isCreated , setIsCreated]=useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [maxBookings, setMaxBookings] = useState(3);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0)
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const context =  useContext(AuthContext);


    
    


const creatEventHandler=async (e)=>{
const event={title, price, date, description ,maxBookings } ;
const token = context.token;

  const requestBody  ={
    query:
    ` mutation{
      createEvent(eventInput:{title:"${event.title}" , date:"${event.date}" , price:${event.price} , description:"${event.description}" , maxBookings:${event.maxBookings} })
      {
          _id
          title
      }
  }`
}
  
try {
  const requestToGql = await fetch('http://localhost:3001/graphql' , {
    method:'POST' , 
    body:JSON.stringify(requestBody) ,
    headers:{
        'Content-Type': 'application/json' , 
        'Authorization': 'Bearer ' + token
    }}) ;

    const prettyReq=await requestToGql.json();
    const reqReturnedData=prettyReq.data.createEvent
    
    if(requestToGql.status===200 || requestToGql.status===201){
      props.trigger();
      handleClose();
    }


} catch (error) {
  console.log(error)
}

 
}





    return (
        <Container>
            <Button variant="primary" onClick={handleShow}>
        Create an Events
      </Button>

      <Modal  
      show={show} 
      onHide={handleClose}
      dialogClassName="modal-100w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create A New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                   
                   <form>
                       <Row>
 <Col xs={11}>
 <Row> 
 <label>
    Title:
  </label>
      <input type="text" name="name" onChange={(e)=>setTitle(e.target.value)}/>
      {title!==""?  <div><CheckCircleIcon color='primary'/> </div>: <div> <BlockIcon color='error'/></div> }
     </Row> 
     

 

<Row>

  <label>
  
    Price: 
    </label>

    <input value={price} type="text" name="name" onChange={e=>setPrice(e.target.value)} />
    {!isNaN(price) && price!==-1 ?  <div><CheckCircleIcon color='primary'/> </div>: <div> <BlockIcon color=''/></div> }
  
 </Row>
 

 <Row>
  <label>
    Date:
  </label>
<input id='DateAndTimeInput_Modal' type="datetime-local" name="name" onChange={e=>setDate(e.target.value)}/>
{date!=="" ?  <div><CheckCircleIcon color='primary'/> </div>: <div> <BlockIcon color='error'/></div> }

  </Row>




  <Row>
  <label>
    Maximum participators:
  </label>
<input value={ maxBookings} id='maxPpl' type="text" name="name" onChange={e=>setMaxBookings(e.target.value)}/>
{maxBookings>0 ?  <div><CheckCircleIcon color='primary'/> </div>: <div> <BlockIcon color='error'/></div> }

  </Row>



 <Row>
  <label>
    Description: <br/>
    <textarea type="text" name="name" onChange={e=>setDescription(e.target.value)} />
  </label>
  
</Row>



  </Col>
  </Row>
</form>
                    
                    


                 
                </Row>
            </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="error" onClick={handleClose}>
            {<ClearIcon fontSize='large' />}
          </Button>
          <Button disabled={(title==="" || date==="" || isNaN(price) || price<0)  ?true:false } variant="primary" onClick={creatEventHandler}>
           { <SportsIcon  fontSize='large'  />}
          </Button>
        </Modal.Footer>
      </Modal>

     
        </Container>
    )
}