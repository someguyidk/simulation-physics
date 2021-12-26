let img;
let b1;
let b2;
let collitions = 0;
let collition = false;
let currsecs = 0;
let trctr = 0;
let clck;
let run = true;
let generboolean = true;
let massobj1 = parseInt(window.prompt("Please type in a positive integer",1));

function preload() {
  img = loadImage('Riven.png');
  clck = loadSound('clack.wav');
}

function setup() {
  createCanvas(windowWidth, 200);
  b1 = new sq(250,150,massobj1,-1,100); 
  b2 = new sq(100,150,1,0,50);
  
}

class sq {
  constructor(x,y,masa,veli,size){
    this.x = x;
    this.y = height - size;
    this.masa = masa;
    this.veli = veli;
    this.size = size;
    this.vel = veli;
  }
  create(){
    image(img,this.x,this.y,this.size+15,this.size);
  }
  update(obj2){
    if (!collition) {
      return this.veli;
    } else {
      let sumM = b1.masa + b2.masa;
      let newV = (this.masa - obj2.masa)/sumM * this.vel;
      newV += (2*obj2.masa)/sumM * obj2.vel;
      //print(newV);
      return newV;
    }    
  }
  updateX(){
    this.x += this.vel;
  }
}

function addT(vel1,vel2){
  let tb = document.getElementById('tb-1')
  let tr1 = document.createElement('tr');
  tr1.id = `tr-${trctr}`;
  //print(tr1);
  tb.appendChild(tr1);
  let td0 = document.createElement('td');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  td0.innerHTML = `${collitions}`;
  td1.innerHTML = parseFloat(str(vel1)).toFixed(4);
  td2.innerHTML = parseFloat(str(vel2)).toFixed(4);
  //tr1.appendChild(td0);
  tr1.appendChild(td1);
  tr1.appendChild(td2);
  trctr++;
}

function addxyy(vel1,vel2){
  let tb = document.getElementById('tb-2')
  let tr1 = document.createElement('tr');
  tr1.id = `2tr-${trctr}`;
  //print(tr1);
  tb.appendChild(tr1);
  let td0 = document.createElement('td');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  td0.innerHTML = `${collitions}`;
  td1.innerHTML = parseFloat(str(vel1)).toFixed(4) * Math.sqrt(b1.masa);
  td2.innerHTML = parseFloat(str(vel2)).toFixed(4) * Math.sqrt(b2.masa);
  //tr1.appendChild(td0);
  tr1.appendChild(td1);
  tr1.appendChild(td2);
}

function addConst(vel1,vel2){
  let tb = document.getElementById('tb-3')
  let tr1 = document.createElement('tr');
  tr1.id = `2tr-${trctr}`;
  //print(tr1);
  tb.appendChild(tr1);
  let td0 = document.createElement('td');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  td0.innerHTML = `${collitions}`;
  td1.innerHTML = (0.5)*((parseFloat(str(vel1)).toFixed(4) * Math.sqrt(b1.masa))**2 + (parseFloat(str(vel2)).toFixed(4) * Math.sqrt(b2.masa))**2);
  td2.innerHTML = (vel2*b2.masa)+(vel1*b1.masa);
  //tr1.appendChild(td0);
  tr1.appendChild(td1);
  tr1.appendChild(td2);
}

var tmr= setInterval(()=>{currsecs++;document.getElementById("h3-3").innerHTML= "Tiempo: \n"+str(currsecs)+"s";},1000);  



function draw() {
  background(200);
  line(0,200,400,200);

  b1.create();
  b2.create();
  
  document.getElementById('hd3-2').innerHTML ="v1: "+parseFloat(str(b1.vel)).toFixed(4)+"ms^-1"+", v2:"+parseFloat(str(b2.vel)).toFixed(4)+"ms^-1";
  if (generboolean){
      addT(b1.vel,b2.vel);
      addxyy(b1.vel,b2.vel);
      addConst(b1.vel,b2.vel);
      generboolean = false;
    }
  if (b1.x <= b2.x + b2.size+15 || b1.x + b1.size+15 <= b2.x){
      collitions += 1;
      collition = true; 
    
      let v2 = b2.update(b1);
      let v1 = b1.update(b2);
      b1.vel = v1;
      b2.vel = v2;

      b1.updateX();
      b2.updateX();
      collition = false;
      //print(collitions); 
    document.getElementById('hd3-1').innerHTML="Collitions: "+str(collitions);
    if (collitions != 0){
          addT(b1.vel,b2.vel);
          addxyy(b1.vel,b2.vel);
          addConst(b1.vel,b2.vel);
          }
    clck.play();
    } else if (b2.x < 0){
      //print("wall hit");
      collitions +=1;
      //print(collitions);
      document.getElementById('hd3-1').innerHTML="Collitions: "+str(collitions);
      b2.vel = 0 - b2.vel;
      b2.updateX();
      if (collitions != 0){
          addT(b1.vel,b2.vel);
          addxyy(b1.vel,b2.vel);
          addConst(b1.vel,b2.vel);
          }
        
      clck.play();
    }  else {
      document.getElementById('hd3-1').innerHTML ="Collitions: "+ str(collitions);
      b1.updateX();
      b2.updateX()
    }
  if (b2.vel > 0 && b1.vel>b2.vel ){
    document.getElementById("h3-4").innerHTML="\n Fin de coaliciones";
    
    clearInterval(tmr);

  }
  //print("vel1: "+ str(b1.vel));
  //print("vel2: "+ str(b2.vel));
}
