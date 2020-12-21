import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUsers extends Component {
    
    constructor(props){
        super(props);

        this.state= {
            users : []

        }
        
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.contactForm1 = this.contactForm1.bind(this);
        this.contactForm2 = this.contactForm2.bind(this);
        this.contactForm3 = this.contactForm3.bind(this);
    }
    componentDidMount(){
        UserService.getUser().then((usr)=>{
            this.setState({users : usr.data});
        })
    }

    addUser(){
        this.props.history.push('/addUser');
    }
    deleteUser(userName){
        UserService.deleteUser(userName).then((usr)=>{
            this.setState({users : this.state.users.filter(user => user.name != userName)});
        })
        
    }
    contactForm1(){
        this.props.history.push('/form/1');
    }

    contactForm2(){
        this.props.history.push('/form/2');
    }
    contactForm3(){
        this.props.history.push('/form/3');
    }



    //history is a part of react router
    //router will pass history object in props
    render() {
        return (
            <div className="topPadding">         
                <div className="row">
                    <button className="btn btn-outline-success toolbar-btn" onClick= {this.addUser}>Add User</button>
                    <button className="btn btn-outline-info toolbar-btn" onClick= {this.contactForm1}>Contact from 1</button>
                    <button className="btn btn-outline-info toolbar-btn" onClick= {this.contactForm2}>Contact from 2</button>
                    <button className="btn btn-outline-info toolbar-btn" onClick= {this.contactForm3}>Contact from 3</button>
               
                </div>
                <div className="row topPadding">
                    <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(user =>
                                 <tr key = {user.name}> 
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.cities}</td>
                                <td><button onClick={()=>this.deleteUser(user.name)} className="btn-danger">
                                    Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}

export default ListUsers;