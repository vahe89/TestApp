import React, {Component} from 'react';
import {makeAction} from "../makeAction";
import {connect} from "react-redux";

class ContentHeader extends Component {

    constructor(props){
        super(props);

        this.mainImg = null;
        this.index = 0;
        this.interval = null;

    }

    componentDidMount () {
        this.interval = setInterval(()=>{this.change()} , 50)
    }

    change =()=> {
        this.mainImg.src = `/assets/imgphone/000${this.index < 10 ? '0' + this.index : this.index}.png`;
        this.index++;
        if (this.index >= 75) {
            clearInterval(this.interval)
        }
    };
    render() {
        const {showMenu} = this.props;
        return (
            <div className={`content_header ${showMenu ? 'hidden_block' : ''}`}>
                <div className="container_fluid">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <h1 className="header_title">Social media & blockchain combined</h1>
                            <p className="header_text">Join now. Earn tokens. No investment needed.</p>
                            <button className="btn_navigation d-lg-block d-none">Become an early adopter
                            </button>
                        </div>
                        <div className="col-lg-4 col-12 img_block">
                            <img id="main_img" className="main_img" src="/assets/imgphone/00000.png" alt="Phone" ref={(ref) => {this.mainImg = ref}}/>
                            <button className="btn btn_navigation d-lg-none d-block">Become an early adopter
                            </button>
                        </div>
                    </div>
                    <div className="row clients_block">
                        <div className="col-12">
                            <p className="clients_block_title">Sizzle founders have startups featured in:</p>
                        </div>
                        <div className="col-12">
                            <div className="clients_logo">
                                <img src='/assets/img/logo1.png' alt="Logo"/>
                                <img src="/assets/img/cnn-logo.png" alt="Logo"/>
                                <img src='/assets/img/mtv-logo-2010-2.png' alt="Logo"/>
                                <img src="/assets/img/cnbc.png" alt="Logo"/>
                                <img src="/assets/img/bet-logo-1.png" alt="Logo"/>
                                <img src="/assets/img/bet-logo-1.png" alt="Logo"/>
                                <img src="/assets/img/time.png" alt="Logo"/>
                                <img src="/assets/img/cbs.png" alt="Logo"/>
                                <img src="/assets/img/lonely.png" alt="Logo"/>
                                <img src="/assets/img/nationalG.png" alt="Logo"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
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
)(ContentHeader)

