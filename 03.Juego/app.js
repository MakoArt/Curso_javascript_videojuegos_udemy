
//creando contexto de juego 
const canvas=document.querySelector('#lienzo')
const ctx=canvas.getContext('2d')

const anchoCasilla=100
const altoCasilla=100
const cielo='black'
let colisionEnemigo=false
let colisionNave=false


 
//array
 const planetasArray=[]
 const balasArray=[]
 const arrayEnemigos=[]
 

//medidas del canvas
canvas.width=1000 
canvas.height=500

canvas.style.border='1px solid black'

//creando escenario  

let escenario=[
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]
//funcion que dibuja el escenario 

function dibujaEscenario(){
       
         for(y=0;y<5;y++){
            for(x=0;x<10;x++){

             if(escenario[y][x]==0){
                 ctx.fillStyle=cielo
                 ctx.fillRect(x*anchoCasilla,y*altoCasilla,anchoCasilla,altoCasilla)

            }
            
    }
}

}


const planetas=function(posX,posY,radio,comienzoAngulo,finalAngulo,color,velocidad){
    this.posX=posX;
    this.posY=posY;
    this.radio=radio; 
    this.comienzoAngulo=comienzoAngulo;
    this.finalAngulo=finalAngulo;
    this.color=color
    this.velocidad=velocidad

    this.dibuja=function(){
        ctx.beginPath();
        ctx.arc(this.posX,this.posY,radio,comienzoAngulo,finalAngulo)
        ctx.fillStyle=color
        ctx.fill()
    }

    this.mover=function(){
        this.posX-=1 + this.velocidad
       if(this.posX<0){
          this.posX=1100
          this.posX=Math.random()*500 
       }
    }

}
//Instancias de planetas 

planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',0.5))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(32,28,97,0.5)',0.75))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(32,28,97,0.25)',1.5))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',1.75))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(32,98,97,0.5)',2))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',2.25))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(92,28,97,0.25)',2.50))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',1))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',0.7))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(92,28,97,0.25)',0.70))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',1.8))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',1.96))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(92,28,97,0.25)',1.45))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',2.6))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',2.45))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(92,28,97,0.25)',2.60))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',2.5))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',1.5))




const nave=function(posX,posY,ancho,alto,color,velocidad){
    this.posX=posX 
    this.posY=posY 
    this.ancho=ancho 
    this.alto=alto 
    this.color=color 
    this.velocidad=velocidad

 this.dibuja=function(){
    //  ctx.fillStyle='blue'
    //  ctx.fillRect(this.posX,this.posY,ancho,alto)
    
    if(colisionNave){
        let explota=new Image()
        explota.src='./img/ExplosionPropia.png'
         ctx.drawImage(explota,this.posX,this.posY,this.ancho,this.alto)
         setTimeout(()=>{colisionNave=false},1000)
    
     }else{
    
    let fotoNave=new Image()
    fotoNave.src='./img/naveTerminado.png'
    ctx.drawImage(fotoNave,this.posX,this.posY,this.ancho,this.alto)
    }
 }

 this.arriba=function(){
  if(this.posY>=3){
    this.posY-=10

    arrayBalasNave.map(balasNave=>{
        balasNave.posY-=10
    })
    

  }
 
 }
 
 this.abajo=function(){
      
     if(this.posY<500-50){
        this.posY+=10
        arrayBalasNave.map(balasNave=>{
            balasNave.posY+=10
        })
     }
}

this.derecha=function(){
    if(this.posX<=1000-55){
    this.posX+=10
    arrayBalasNave.map(balasNave=>{
        balasNave.posX+=10
    })
    }
}

this.izquierda=function(){
    if(this.posX>=3){
        this.posX-=10
        arrayBalasNave.map(balasNave=>{
            balasNave.posX-=10
        })
    }
}



}
 const naveInstancia=new nave(0,200,50,50)


 const proyectil=function(posX,posY,ancho,alto,color,velocidad){

  this.posX=posX;
  this.posY=posY; 
  this.ancho=ancho; 
  this.alto=alto; 
  this.color=color;
  this.velocidad=velocidad;

  this.dibuja=function(){
    // ctx.fillStyle=this.color
    // ctx.fillRect(this.posX,this.posY,this.ancho,this.alto)
    let proyectil=new Image()
    proyectil.src='./img/MiProyectil.png'
    ctx.drawImage(proyectil,this.posX,this.posY,this.ancho,this.alto)
  }

  this.dispara=function(){
      let disparo=setInterval(()=>{
          this.posX+=10
     },10)

     if(this.posX>1000){
         this.posX=naveInstancia.posX+22
         this.posY=naveInstancia.posY+22
         clearInterval(disparo)
     }
  }


 }
 const balaNave=new proyectil(naveInstancia.posX+22,naveInstancia.posY+20,10,10,'white',5)



 
 const proyectilArriba=function(posX,posY,ancho,alto,color,velocidad){

    this.posX=posX;
    this.posY=posY; 
    this.ancho=ancho; 
    this.alto=alto; 
    this.color=color;
    this.velocidad=velocidad;
  
    this.dibuja=function(){
    //   ctx.fillStyle=this.color
    //   ctx.fillRect(this.posX,this.posY,this.ancho,this.alto)
    let proyectil=new Image()
    proyectil.src='./img/MiProyectil.png'
    ctx.drawImage(proyectil,this.posX,this.posY,this.ancho,this.alto)
    }
  
    this.dispara=function(){
        let disparo=setInterval(()=>{
            this.posX+=10
            this.posY-=7
       },10)
  
       if(this.posX>1000 || this.posY<0){
           this.posX=naveInstancia.posX+22
           this.posY=naveInstancia.posY+22
           clearInterval(disparo)
       }
    }
  
  
   }
   const balaNaveArriba=new proyectilArriba(naveInstancia.posX+22,naveInstancia.posY+20,10,10,'white',5)
  
   
   
 const proyectilAbajo=function(posX,posY,ancho,alto,color,velocidad){

    this.posX=posX;
    this.posY=posY; 
    this.ancho=ancho; 
    this.alto=alto; 
    this.color=color;
    this.velocidad=velocidad;
  
    this.dibuja=function(){
    //   ctx.fillStyle=this.color
    //   ctx.fillRect(this.posX,this.posY,this.ancho,this.alto)
    let proyectilAbajo=new Image()
    proyectilAbajo.src='./img/MiProyectil.png'
    ctx.drawImage(proyectilAbajo,this.posX,this.posY,this.ancho,this.alto)
    }
  
    this.dispara=function(){
        let disparo=setInterval(()=>{
            this.posX+=10
            this.posY+=7
       },10)
  
       if(this.posX>1000 || this.posY>500){
           this.posX=naveInstancia.posX+22
           this.posY=naveInstancia.posY+22
           clearInterval(disparo)
       }
    }
  
  
   }
   const balaNaveAbajo=new proyectilAbajo(naveInstancia.posX+22,naveInstancia.posY+20,10,10,'white',5)
  
   const arrayBalasNave=[balaNave,balaNaveAbajo,balaNaveArriba]
 
const enemigos=function(posX,posY,ancho,alto,color,velocidad){
    this.posX=posX 
    this.posY=posY 
    this.ancho=ancho 
    this.alto=alto 
    this.color=color 
    this.velocidad=velocidad

 this.dibuja=function(){
   

    let enemigoImg=new Image()
    enemigoImg.src='./img/naveEnemiga.png'
    ctx.drawImage(enemigoImg,this.posX,this.posY,this.ancho,this.alto)
    
 }

 this.mover=function(){
     this.posX-=2+this.velocidad
     this.posY-=0.20
    if(this.posX<0 || this.posY<0){
        this.posX=1200
        this.posY=Math.random()*500
    }
 }

 

}
const enemy=new enemigos()

const proyectilEnemigo=function(posX,posY,ancho,alto,color,velocidad){
    this.posX=posX;
    this.posY=posY;
    this.ancho=ancho;
    this.alto=alto;
    this.color=color
    this.velocidad=velocidad

 this.dibuja=function(){
    // ctx.fillStyle=this.color
    // ctx.fillRect(this.posX,this.posY,ancho,alto)
    let enemigoProyectil=new Image()
   enemigoProyectil.src='./img/proyectilEnemigo.png'
    ctx.drawImage(enemigoProyectil,this.posX,this.posY,this.ancho,this.alto)
    
 }
 this.dispara=function(){
     this.posX-=20
     this.posY-=2
 }

}



let random1=Math.random()*500
let random2=Math.random()*500
let random3=Math.random()*500
let random4=Math.random()*500
let random5=Math.random()*500
let random6=Math.random()*500
let random7=Math.random()*500
let random8=Math.random()*500



arrayEnemigos.push(new enemigos(100,random1,50,50,'red',0.5))
arrayEnemigos.push(new enemigos(100,random2,50,50,'red',1))
arrayEnemigos.push(new enemigos(100,random3,50,50,'red',1.75))
arrayEnemigos.push(new enemigos(100,random4,50,50,'red',2.25))
arrayEnemigos.push(new enemigos(100,random5,50,50,'red',1.4))
arrayEnemigos.push(new enemigos(100,random6,50,50,'red',3.5))
arrayEnemigos.push(new enemigos(100,random7,50,50,'red',1.75))
arrayEnemigos.push(new enemigos(100,random8,50,50,'red',0.4))



balasArray.push(new proyectilEnemigo(100,random1+19,10,10,'white',0.5))
balasArray.push(new proyectilEnemigo(100,random2+19,10,10,'white',1))
balasArray.push(new proyectilEnemigo(100,random3+19,10,10,'white',1.75))
balasArray.push(new proyectilEnemigo(100,random4+19,10,10,'white',2.25))
balasArray.push(new proyectilEnemigo(100,random5+19,10,10,'white',1.4))
balasArray.push(new proyectilEnemigo(100,random6+19,10,10,'white',3.5))
balasArray.push(new proyectilEnemigo(100,random7+19,10,10,'white',1.75))
balasArray.push(new proyectilEnemigo(100,random8+19,10,10,'white',0.4))

 
//Marcador 

const puntuacion=document.querySelector('#puntuacion')
const vidas=document.querySelector('#vidas')
const record=document.querySelector('#record')

let puntuacionVariable=0
let vidaVariable=10
let recordVariable=0

puntuacion.textContent=puntuacionVariable
vidas.textContent=vidaVariable 
record.textContent=localStorage.getItem('record') 

//Colisiones 

 function colisiones(){
  
    arrayEnemigos.map(arrayEnemigo=>{
        balasArray.map(balaArray=>{

             //nuestros proyectiles chocan con los enemigos 
          //hacemos un mapeo del array que contiene mis 
          //proyectiles

           
            arrayBalasNave.map(arrayBalaNave=>{

                if(arrayBalaNave.posX+10>=arrayEnemigo.posX&& 
                  arrayBalaNave.posY>=arrayEnemigo.posY && 
                  arrayBalaNave.posY<=arrayEnemigo.posY+50 && 
                  arrayBalaNave.posX<=arrayEnemigo.posX+50){
        
                     arrayEnemigo.posX=1200
                     arrayBalaNave.posX=naveInstancia.posX+22
                  
                     colisionEnemigo=true
        
                     explosion.play()
        
                     puntuacion.textContent=puntuacionVariable +=1
                      
                     puntuacionVariable+=1

                    //  if(puntuacionVariable>50){
                    //      window.location.href='./nivel2/index.html'
                    //  }
              
                    
                  }
                
                
                })
            

     //colision nave con los enemigos
     
      if(naveInstancia.posX+50>=arrayEnemigo.posX && 
         naveInstancia.posY>=arrayEnemigo.posY && 
         naveInstancia.posY<=arrayEnemigo.posY+50){
            
         
            arrayEnemigo.posX=1200
            
            vidas.textContent=vidaVariable-=1
            colisionEnemigo=true
            colisionNave=true

            if(vidaVariable<=0){
                vidas.textContent=0
               window.location.href='./gameover.html'

                if(puntuacionVariable>recordValue){
                    localStorage.setItem('record',puntuacionVariable)
                   }
            }
            
        }

        
        //colisiones con balas enemigas 

       
        if(naveInstancia.posX+50>=balaArray.posX && 
            naveInstancia.posY>=balaArray.posY && 
            naveInstancia.posY<=balaArray.posY+10){
             
                vidas.textContent=vidaVariable-=1
        
                balaArray.posX=1200
                colisionNave=true
                nosColisionan.play()
              
             
            
                if(vidaVariable<=0){
                    vidas.textContent=0
                   window.location.href='./gameover.html'

                    
        if(puntuacionVariable>recordVariable){
            localStorage.setItem('record',puntuacionVariable)
        }

                }
             

            }

      
   
    
    
    })
    })



 }
 colisiones()

 //Eventos del juego (controles del jugador)

document.addEventListener('keydown',(e)=>{
    e.preventDefault()

  if(e.key==='w'){
      naveInstancia.arriba()
  }

  if(e.key==='s'){
      naveInstancia.abajo()
  }

  if(e.key==='d'){
      naveInstancia.derecha()
  }

  if(e.key==='a'){
      naveInstancia.izquierda()
  }

  if(e.key===' '){
      balaNave.dispara()
      disparo.play()
  }

  if(e.key==='e'){
      balaNaveArriba.dispara()
  }

  if(e.key==='q'){
      balaNaveAbajo.dispara()
  }


})

//Audios 

const disparo=new Audio()
disparo.src='./audio/disparo.mp3'

const explosion=new Audio()
explosion.src='./audio/explosionEnemigo.mp3'

const nosColisionan=new Audio()
nosColisionan.src='./audio/nosColisionan.mp3'
 








function borraCanvas(){
   
    canvas.width=1000 
    canvas.height=500

}


//funcion principal del juego 

function principal(){
    requestAnimationFrame(principal)
    borraCanvas()
   
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    colisiones()
    dibujaEscenario()


    balaNaveArriba.dibuja()
    balaNaveAbajo.dibuja()
    balaNave.dibuja()
    naveInstancia.dibuja()
  
   


  for(let i=0;i<planetasArray.length;i++){
      planetasArray[i].dibuja()
      planetasArray[i].mover()
  }

  
  for(let i=0;i<balasArray.length;i++){
      balasArray[i].dibuja()

      if(naveInstancia.posY>=arrayEnemigos[i].posY-50 &&
         naveInstancia.posY<=arrayEnemigos[i].posY +100
        ){
            balasArray[i].dispara()
        }else{
          
            balasArray[i].posX=arrayEnemigos[i].posX+22
            balasArray[i].posY=arrayEnemigos[i].posY+22

        }
      
 
  }

 
  for(let i=0;i<arrayEnemigos.length;i++){
    arrayEnemigos[i].dibuja()
    arrayEnemigos[i].mover()
   
}





}
principal()