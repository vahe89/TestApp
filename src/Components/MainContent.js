import React, {Component} from 'react';

class MainContent extends Component {
    constructor(props) {
        super(props);

        this.products = {
            left: [
                {
                    id: 1,
                    name: "Endless videos",
                    img: "/assets/img/product1.png",
                    text_1: 'Explore endless viral videos',
                    text_2: 'Edit your own videos with creative effects',
                    text_3: 'Enhance your content creator abilities',
                },
                {
                    id: 2,
                    name: "Endless videos",
                    img: "/assets/img/product2.png",
                    text_1: 'Explore endless viral videos',
                    text_2: 'Edit your own videos with creative effects',
                    text_3: 'Enhance your content creator abilities',
                },
                {
                    id: 3,
                    name: "Endless videos",
                    img: "/assets/img/product3.png",
                    text_1: 'Explore endless viral videos',
                    text_2: 'Edit your own videos with creative effects',
                    text_3: 'Enhance your content creator abilities',
                },
            ],
            right: [
                {
                    id: 4,
                    name: "Endless videos",
                    img: "/assets/img/product1.png",
                    text_1: 'Explore endless viral videos',
                    text_2: 'Edit your own videos with creative effects',
                    text_3: 'Enhance your content creator abilities',
                },
                {
                    id: 5,
                    name: "Endless videos",
                    img: "/assets/img/product2.png",
                    text_1: 'Explore endless viral videos',
                    text_2: 'Edit your own videos with creative effects',
                    text_3: 'Enhance your content creator abilities',
                },
                {
                    id: 6,
                    name: "Endless videos",
                    img: "/assets/img/product3.png",
                    text_1: 'Explore endless viral videos',
                    text_2: 'Edit your own videos with creative effects',
                    text_3: 'Enhance your content creator abilities',
                },
            ]
        };

        this.videos = {
          1:  '/assets/videos/1.mp4',
          2:  '/assets/videos/2.mp4',
          3:  '/assets/videos/3.mp4',
          4:  '/assets/videos/4.mp4',
          5:  '/assets/videos/5.mp4',
          6:  '/assets/videos/6.mp4',
        };

        this.state = {
            activeVideoId: 1
        }
    }

    componentDidMount(){
        this.video.src = this.videos[1]
    }

    chooseProduct =(id)=>{
        this.setState({activeVideoId: id});
        this.video.src = this.videos[id]
    };

    render() {
        const {activeVideoId} = this.state;
        return (
            <div className="main_content">
                <div className="container_fluid">
                    <h2 className="main_title">The product</h2>
                    <div className="row">
                        <div className="col-lg-4 col-12">
                            {
                                this.products.left.map((value)=>(
                                    <div className={`product ${activeVideoId === value.id ? 'active' : ''}`} onClick={() =>{this.chooseProduct(value.id)}} >
                                        <h5>{value.name}</h5>
                                        <img className="img_content" src={value.img} alt="Phone"/>
                                        <ul className="product_list">
                                            <li>{value.text_1}</li>
                                            <li>{value.text_2}</li>
                                            <li>{value.text_3}</li>
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-lg-4 col-12 d-lg-block d-none text-center">
                            <div className="phone" onClick={() => {
                                this.video.play()
                            }}>
                                <video id="video" ref={(ref) => {
                                    this.video = ref
                                }}>
                                    {/*<source src={this.videos[activeVideoId]} type="video/mp4"/>*/}
                                </video>
                                <img src="/assets/img/frame.png" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            {
                                this.products.right.map((value)=>(
                                    <div className={`product ${activeVideoId === value.id ? 'active' : ''}`} onClick={() =>{this.chooseProduct(value.id)}}>
                                        <h5>{value.name}</h5>
                                        <img className="img_content" src={value.img} alt="Phone"/>
                                        <ul className="product_list">
                                            <li>{value.text_1}</li>
                                            <li>{value.text_2}</li>
                                            <li>{value.text_3}</li>
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContent;
