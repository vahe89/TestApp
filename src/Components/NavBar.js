import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavBar extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <Link to="#"><img src="/assets/img/logo.svg" alt="Logo"/></Link>

                <ul className="nav_list ">
                    <li className="nav_item">
                        <Link to="#" className="nav_link">The platform </Link>
                    </li>
                    <li className="nav_item">
                        <Link to="#" className="nav_link">ITO</Link>
                    </li>
                    <li className="nav_item">
                        <Link to="#" className="nav_link">SIZ token</Link>
                    </li>
                    <li className="nav_item">
                        <Link to="#" className="nav_link">Sizzle app</Link>
                    </li>
                    <li className="nav_item">
                        <Link to="#" className="nav_link">NFT marketplace</Link>
                    </li>
                    <li className="nav_item">
                        <Link to="#" className="nav_link">Team</Link>
                    </li>
                    <li className="nav_item">
                        <Link to="#" className="nav_link">FAQ</Link>
                    </li>
                    <li className="nav_item_btn">
                        <button className="btn_navigation">Become an early adopter</button>
                    </li>
                </ul>

                <div className="show_bar">
                    <div className="show_btn">
                        <span className="mt-0"></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="close_btn d-none">
                                <span>
                                    <img src="/assets/img/close_icon.svg" alt=""/>
                                </span>
                    </div>

                </div>
            </nav>
        );
    }
}

export default NavBar;
