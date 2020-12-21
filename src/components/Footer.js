import React, { Component } from 'react';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                <footer className="footer">
                    <span><p className="text-muted footer-text footerText" >All Rights Reserved 2020 @RohitMadhu</p></span>
                </footer>
            </div>
        );
    }
}

export default Footer;