import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {makeAction} from "../makeAction";
import {connect} from "react-redux";
import {HIDE_MENU, SHOW_MENU} from "../actionsTypes";

class NavBar extends Component {

    showMenu = () => {
        this.props.makeAction(SHOW_MENU)
    };
    closeMenu =()=>{
        this.props.makeAction(HIDE_MENU)
    };

    render() {
        const {showMenu} = this.props;
        return (
            <nav className="nav-bar">
                <Link to="#"><img src="/assets/img/logo.svg" alt="Logo"/></Link>

                <ul className={`nav_list ${showMenu ? 'nav_mobile_bar' : ''}`}>
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
                    {
                        !showMenu ?
                            <div className="show_btn" onClick={this.showMenu}>
                                <span className="mt-0"></span>
                                <span></span>
                                <span></span>
                            </div>
                            :null
                    }

                    {
                        showMenu ?
                            <div className="close_btn" onClick={this.closeMenu}>
                                <span>
                                    <img src="/assets/img/close_icon.svg" alt=""/>
                                </span>
                            </div>
                            : null
                    }


                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    showMenu: state.mainReducer.showMenu,
});

const mapDispatchToProps = {
    makeAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)
