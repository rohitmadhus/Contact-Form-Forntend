import React, { Component } from 'react';

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark header">
                        <div className="navbar-brand "><span className="redTextColor">Contact Form Management</span></div>   
                    </nav>
                </header>
                
            </div>
        );
    }
}

export default Header;