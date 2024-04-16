import './style.css';
// using cdn so don't need import
// import p5 from 'p5';
import { portsSketch } from './sketches/sketch';
import { goldMinesSketch } from './sketches/sketch2';
import { lighthouseSketch } from './sketches/sketch3';

new p5(portsSketch);
new p5(goldMinesSketch);
new p5(lighthouseSketch);
