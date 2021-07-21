import React, {Component} from 'react';
import Header from "../Components/Header";
import ContentHeader from "../Components/ContentHeader";
import MainContent from "../Components/MainContent";

class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <ContentHeader/>
                <MainContent/>
            </div>
        );
    }
}

export default Home;
