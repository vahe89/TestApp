import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
import * as THREE from "three";
import logo from "./assets/img/logo.svg";
import close_icon from "./assets/img/close_icon.svg";
import phone from "./assets/img/phone.svg";
import logo1 from "./assets/img/logo1.png";
import cnn_logo from "./assets/img/cnn-logo.png";
import mtv_log from "./assets/img/mtv-logo-2010-2.png";
import cnbc from "./assets/img/cnbc.png";
import bet_logo from "./assets/img/bet-logo-1.png";
import time from "./assets/img/time.png";
import cbs from "./assets/img/cbs.png";
import lonely from "./assets/img/lonely.png";
import nationalG from "./assets/img/nationalG.png";
import product1 from "./assets/img/product1.png";
import product2 from "./assets/img/product2.png";
import product3 from "./assets/img/product3.png";
import iPhone12ProMax from "./assets/img/iPhone12ProMax.png";
import frame from "./assets/img/frame.png";
import video1 from "./assets/videos/1.mp4";
import video2 from "./assets/videos/2.mp4";
import video3 from "./assets/videos/3.mp4";
import video4 from "./assets/videos/4.mp4";
import video5 from "./assets/videos/5.mp4";
import video6 from "./assets/videos/6.mp4";

class App extends Component {
    constructor(props){
        super(props);

        this.headerFon = null;
        this.video = null;

        this.videos = {
            1:  video1,
            2: video2,
            3: video3,
            4: video4,
            5: video5,
            6: video6,
        }

        this.state = {
            activeVideoId: 1
        }

    }
    componentDidMount () {
        const script1 = document.createElement("script");
        script1.id = "snoise-function";
        script1.type = "x-shader/x-vertex";
        script1.text = `vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                -0.577350269189626,  // -1.0 + 2.0 * C.x
                                0.024390243902439); // 1.0 / 41.0
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i); // Avoid truncation effects in permutation
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));

            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }`;

        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");

        script2.id = "vertex-shader";
        script2.type = "x-shader/x-vertex";
        script2.text = `uniform float u_time;
        uniform vec2 u_randomisePosition;

        varying float vDistortion;
        varying float xDistortion;
        varying vec2 vUv;

        void main() {
            vUv = uv;
            vDistortion = snoise(vUv.xx * 3. - u_randomisePosition * 0.15);
            xDistortion = snoise(vUv.yy * 1. - u_randomisePosition * 0.05);
            vec3 pos = position;
            pos.z += (vDistortion * 35.);
            pos.x += (xDistortion * 25.);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }`;

        script2.async = true;
        document.body.appendChild(script2);

        const script3 = document.createElement("script");

        script3.id = "fragment-shader";
        script3.type = "x-shader/x-vertex";
        script3.text = `vec3 rgb(float r, float g, float b) {
            return vec3(r / 255., g / 255., b / 255.);
        }

        vec3 rgb(float c) {
            return vec3(c / 255., c / 255., c / 255.);
        }

        uniform vec3 u_bg;
        uniform vec3 u_bgMain;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        uniform float u_time;

        varying vec2 vUv;
        varying float vDistortion;

        void main() {
            vec3 bg = rgb(u_bg.r, u_bg.g, u_bg.b);
            vec3 c1 = rgb(u_color1.r, u_color1.g, u_color1.b);
            vec3 c2 = rgb(u_color2.r, u_color2.g, u_color2.b);
            vec3 bgMain = rgb(u_bgMain.r, u_bgMain.g, u_bgMain.b);

            float noise1 = snoise(vUv + u_time * 0.08);
            float noise2 = snoise(vUv * 2. + u_time * 0.1);

            vec3 color = bg;
            color = mix(color, c1, noise1 * 0.6);
            color = mix(color, c2, noise2 * .4);

            color = mix(color, mix(c1, c2, vUv.x), vDistortion);

            float border = smoothstep(0.1, 0.6, vUv.x);

            color = mix(color, bgMain, 1. -border);

            gl_FragColor = vec4(color, 1.0);
        }`;

        script3.async = true;
        document.body.appendChild(script3);


        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.headerFon.appendChild( renderer.domElement );

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        let vCheck = false;

        camera.position.z = 5;

        var randomisePosition = new THREE.Vector2(1, 2);

        var R = function(x, y, t) {
            return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
        }

        var G = function(x, y, t) {
            return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
        }

        var B = function(x, y, t) {
            return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
        }
        let sNoise = document.querySelector('#snoise-function').textContent
        let geometry = new THREE.PlaneGeometry(window.innerWidth / 2, 400, 100, 100);
        let material = new THREE.ShaderMaterial({
            uniforms: {
                u_bg: {type: 'v3', value: this.rgb(162, 138, 241)},
                u_bgMain: {type: 'v3', value: this.rgb(162, 138, 241)},
                u_color1: {type: 'v3', value: this.rgb(162, 138, 241)},
                u_color2: {type: 'v3', value: this.rgb(82, 31, 241)},
                u_time: {type: 'f', value: 30},
                u_randomisePosition: { type: 'v2', value: randomisePosition }
            },
            fragmentShader: sNoise + document.querySelector('#fragment-shader').textContent,
            vertexShader: sNoise + document.querySelector('#vertex-shader').textContent,
        });

        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-200, 270, -280);
        mesh.scale.multiplyScalar(3.5);
        mesh.rotationX = -1.0;
        mesh.rotationY = 0.0;
        mesh.rotationZ = 0.1;
        scene.add(mesh);

        renderer.render( scene, camera );

        let t = 0;
        let j = 0;
        let x = this.randomInteger(0, 32);
        let y = this.randomInteger(0, 32);
        const animate = function () {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
            mesh.material.uniforms.u_randomisePosition.value = new THREE.Vector2(j, j);

            mesh.material.uniforms.u_color1.value = new THREE.Vector3(R(x,y,t/2), G(x,y,t/2), B(x,y,t/2));

            mesh.material.uniforms.u_time.value = t;
            if(t % 0.1 === 0) {
                if(vCheck === false) {
                    x -= 1;
                    if(x <= 0) {
                        vCheck = true;
                    }
                } else {
                    x += 1;
                    if(x >= 32) {
                        vCheck = false;
                    }

                }
            }

            // Increase t by a certain value every frame
            j = j + 0.01;
            t = t + 0.05;
        };
        animate();
    }

     randomInteger =(min, max)=> {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
     rgb =(r, g, b)=> {
        return new THREE.Vector3(r, g, b);
    }

    render() {
         const {activeVideoId} = this.state
        return (
            <div  className="App">
                <header className="header">
                    <div id="headerFon" ref={ref => (this.headerFon = ref)}>
                        <div className="bg_fone"></div>
                    </div>
                    <nav className="nav-bar">
                        <a href="#"><img src={logo} alt="Logo"/></a>

                        <ul className="nav_list ">
                            <li className="nav_item"><a href="#" className="nav_link">The platform </a>
                            </li>
                            <li className="nav_item"><a href="#" className="nav_link">ITO</a></li>
                            <li className="nav_item"><a href="#" className="nav_link">SIZ token</a>
                            </li>
                            <li className="nav_item"><a href="#" className="nav_link">Sizzle app</a>
                            </li>
                            <li className="nav_item"><a href="#" className="nav_link">NFT
                                marketplace</a></li>
                            <li className="nav_item"><a href="#" className="nav_link">Team</a></li>
                            <li className="nav_item"><a href="#" className="nav_link">FAQ</a></li>
                            <li className="nav_item_btn">
                                <button className="btn btn_navigation">Become an early adopter</button>
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
                                    <img src={close_icon} alt=""/>
                                </span>
                            </div>

                        </div>
                    </nav>

                </header>
                <div className="content_header ">
                    <div className="container_fluid">
                        <div className="row">
                            <div className="col-lg-8 col-12">
                                <h1 className="header_title">Social media & blockchain combined</h1>
                                <p className="header_text">Join now. Earn tokens. No investment needed.</p>
                                <button className="btn btn_navigation d-lg-block d-none">Become an early adopter
                                </button>
                            </div>
                            <div className="col-lg-4 col-12 img_block">
                                <img src={phone} alt="Phone"/>
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
                                    <img src={logo1} alt="Logo"/>
                                    <img src={cnn_logo} alt="Logo"/>
                                    <img src={mtv_log} alt="Logo"/>
                                    <img src={cnbc} alt="Logo"/>
                                    <img src={bet_logo} alt="Logo"/>
                                    <img src={bet_logo} alt="Logo"/>
                                    <img src={time} alt="Logo"/>
                                    <img src={cbs} alt="Logo"/>
                                    <img src={lonely} alt="Logo"/>
                                    <img src={nationalG} alt="Logo"/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="main_content">
                    <div className="container_fluid">
                        <h2 className="main_title">The product</h2>
                        <div className="row">
                            <div className="col-lg-4 col-12" >
                                <div className="product" onClick={()=>this.setState({activeVideoId: 1})}>
                                    <h5>Endless videos</h5>
                                    <img className="img_content" src={product1} alt="Phone"/>
                                    <ul className="product_list">
                                        <li>Explore endless viral videos</li>
                                        <li>Edit your own videos with creative effects</li>
                                        <li>Enhance your content creator abilities</li>
                                    </ul>
                                </div>
                                <div className="product" onClick={()=>this.setState({activeVideoId: 2})}>
                                    <h5>Endless videos</h5>
                                    <img className="img_content" src={product2} alt="Phone"/>
                                    <ul className="product_list">
                                        <li>Explore endless viral videos</li>
                                        <li>Edit your own videos with creative effects</li>
                                        <li>Enhance your content creator abilities</li>
                                    </ul>
                                </div>
                                <div className="product" onClick={()=>this.setState({activeVideoId: 3})}>
                                    <h5>Endless videos</h5>
                                    <img className="img_content" src={product3} alt="Phone"/>
                                    <ul className="product_list">
                                        <li>Explore endless viral videos</li>
                                        <li>Edit your own videos with creative effects</li>
                                        <li>Enhance your content creator abilities</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-12 d-lg-block d-none text-center">
                                <div className="phone" onClick={()=>{this.video.play()}}>
                                    <video id="video" ref={(ref) => {this.video = ref}}>
                                        <source src={this.videos[activeVideoId]} type="video/mp4"/>
                                    </video>
                                    <img src={frame} alt=""/>
                                </div>
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="product" onClick={()=>this.setState({activeVideoId: 4})}>
                                    <h5>Endless videos</h5>
                                    <img className="img_content" src={product1} alt="Phone"/>
                                    <ul className="product_list">
                                        <li>Explore endless viral videos</li>
                                        <li>Edit your own videos with creative effects</li>
                                        <li>Enhance your content creator abilities</li>
                                    </ul>
                                </div>
                                <div className="product" onClick={()=>this.setState({activeVideoId: 5})}>
                                    <h5>Endless videos</h5>
                                    <img className="img_content" src={product2} alt="Phone"/>
                                    <ul className="product_list">
                                        <li>Explore endless viral videos</li>
                                        <li>Edit your own videos with creative effects</li>
                                        <li>Enhance your content creator abilities</li>
                                    </ul>
                                </div>
                                <div className="product" onClick={()=>this.setState({activeVideoId: 6})}>
                                    <h5>Endless videos</h5>
                                    <img className="img_content" src={product3} alt="Phone"/>
                                    <ul className="product_list">
                                        <li>Explore endless viral videos</li>
                                        <li>Edit your own videos with creative effects</li>
                                        <li>Enhance your content creator abilities</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
