import React from 'react';

import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import ListUsers from './components/ListUsers';
import Footer from './components/Footer';
import Header from './components/Header';
import AddUser from './components/AddUser'
import ContactFormStructure from './components/ContactFormStructure'


//Switch element will ensure that 1 element will be rendered at a time
function App() {
  return (
    <div>
      <Router>
        <div>
             <Header></Header>
                <div className="container">
                  <Switch>
                    <Route path="/" exact component={ListUsers}></Route>
                    <Route path="/users" component={ListUsers}></Route>
                    <Route path="/addUser" component={AddUser}></Route>
                    <Route path="/form/1" >
                    <ContactFormStructure formId={1}   />
                    </Route>
                    <Route path="/form/2" >
                    <ContactFormStructure formId={2}/>
                    </Route>
                    <Route path="/form/3" >
                    <ContactFormStructure formId={3}/>
                    </Route>
                   


                      
                  </Switch>
                </div>
             <Footer></Footer>
        </div>
      </Router>

    </div>
  );
}

export default App;
