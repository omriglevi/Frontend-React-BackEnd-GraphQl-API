    import {   useContext } from 'react';
    import AuthContext from './context/auth-context';
    import {BrowserRouter, Route , Redirect , Switch} from 'react-router-dom'
     import AuthPage from './pages/AuthPage';
     import EventsPage from './pages/EventsPage';
     import BookingsPage from './pages/BookingsPage';
     import MainNavigation from './components/Navigation/navbarMain'
     
     export default function Layout(){
        const context = useContext(AuthContext);
        
        
          
        return (

     <BrowserRouter>
     <MainNavigation/>
     <main className="main-content">
     <Switch>
     {context.token && <Redirect from="/auth" to="/events" exact /> }
 
       {context.token && <Redirect from="/auth" to="/events" exact /> }
     {!context.token && <Redirect from="/" to="/auth" exact />}
     {!context.token && <Redirect from="/bookings" to="/auth" exact />}
     
    {!context.token && <Route path="/auth" component={AuthPage} />}
    <Route path="/events" component={EventsPage} />
    { <Route path="/bookings" component={BookingsPage} />}
 
 
 
       </Switch>
       </main>
       </BrowserRouter>
        )


     }
     
    