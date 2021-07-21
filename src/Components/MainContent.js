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
                    name: "Sell your videos",
                    img: "/assets/img/product2.png",
                    text_1: 'Convert your videos to NFT',
                    text_2: 'List your videos on Sizzle’s NFT marketplace',
                    text_3: 'Sell your NFTs to advertisers',
                },
                {
                    id: 3,
                    name: "Your own video broadcasting",
                    img: "/assets/img/product3.png",
                    text_1: 'Broadcast your own talents',
                    text_2: 'Invite friends & followers to the broadcas',
                    text_3: 'Earn more tokens from more viewers',
                },
            ],
            right: [
                {
                    id: 4,
                    name: "Group video streaming",
                    img: "/assets/img/product4.png",
                    text_1: 'Stream together with other influencers',
                    text_2: 'Monetize your popularity',
                    text_3: 'Earn tokens for sharing your fan base',
                },
                {
                    id: 5,
                    name: "Live audio rooms",
                    img: "/assets/img/product5.png",
                    text_1: 'Create audio rooms',
                    text_2: 'Invite friends & followers',
                    text_3: 'Broadcast to your audience',
                },
                {
                    id: 6,
                    name: "Messages",
                    img: "/assets/img/product3.png",
                    text_1: 'Stay in touch with your followers',
                    text_2: 'Send bulk messages to your audience',
                    text_3: 'Engage one-on-one with other influencers',
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
