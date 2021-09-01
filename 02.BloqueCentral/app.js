const canvas=document.querySelector('#lienzo')
const ctx=canvas.getContext('2d');
const vidas=document.querySelector('#vidas')
let casillaHorizontal=50
let casillaVertical=50

let ogroArray=[]

let vidasVariable=5

vidas.textContent=vidasVariable

canvas.width=500
canvas.height=500

canvas.style.border='5px solid black'
canvas.style.backgroundColor='orangered'

let escenario=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],

]

for(y=0;y<10;y++){
   for(x=0;x<10;x++){
    
    if(escenario[y][x]==0){
        ctx.fillStyle='orangered'
        ctx.fillRect(x*casillaHorizontal,y*casillaVertical,casillaHorizontal,casillaVertical)
    }



   }



}


const protagonista=function(posX,posY,ancho,alto,color,velocidad){
    this.posX=posX 
    this.posY=posY 
    this.ancho=ancho 
    this.alto=alto 
    this.color=color 
    this.velocidad=velocidad

    this.dibuja=function(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.posX,this.posY,this.ancho,this.alto,this.color,this.velocidad)
    }
    this.subir=function(){
        if(this.posY>=2){
            this.posY-=5
        }
       
    }
    this.bajar=function(){
        if(this.posY<=500-50){
            this.posY+=5
        }
      
    }
    this.derecha=function(){
        if(this.posX<=500-50){
            this.posX+=5
        }
        
    }
    this.izquierda=function(){
        if(this.posX>=2)
        this.posX-=5
    }

}

const prota=new protagonista(225,450,50,50,'blue',2)


const enemigo=function(posX,posY,ancho,alto,color,velocidad,derecha){
    this.posX=posX 
    this.posY=posY 
    this.ancho=ancho 
    this.alto=alto 
    this.color=color 
    this.velocidad=velocidad
    this.derecha=true;

    this.dibuja=function(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.posX,this.posY,this.ancho,this.alto,this.color,this.velocidad)
    }
    this.mover=function(){
        
        if(this.derecha==true){
            if(this.posX<500-50)
               this.posX+=5
               else{
                   this.derecha=false
               }
        }
        else{
            if(this.posX>10)
            this.posX-=5
            else{
                this.derecha=true
            }
        }

    }

}

const malo=new enemigo(225,200,50,50,'red',2)



const ogro=function(posX,posY,ancho,alto,color,velocidad){
    this.posX=posX 
    this.posY=posY 
    this.ancho=ancho 
    this.alto=alto 
    this.color=color 
    this.velocidad=velocidad


    this.dibuja=function(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.posX,this.posY,this.ancho,this.alto,this.color,this.velocidad)
    }

    this.abajo=function(){
        this.posY+=1 + this.velocidad
        if(this.posY>500){
           this.posY=-50
        }
        
    }
    
}

ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',1))
ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',1.5))
ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',1))
ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',1.7))
ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',2))
ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',1))
ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',1))
ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',1.8))
ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',1.4))
ogroArray.push(new ogro(Math.random()*500,Math.random()*100,50,50,'green',1.9))



//Colisiones 

function colisiones(){

    if(prota.posY<malo.posY+60){
         this.posY+=0
         this.posY=360
        vidas.textContent=vidasVariable - 1
    }

    if(prota.posX+50>malo.posX &&
       prota.posY>=malo.posY && 
       prota.posY<=malo.posY+50 ){
       malo.posX=prota.posX+50
     vidas.textContent=vidasVariable - 1
    }

}
colisiones()

//Eventos de jugador (teclado)

window.addEventListener('keydown',(e)=>{
    e.preventDefault()
     
    if(e.key==='w' || e.key==='W'){
       prota.subir()
    }

        
    if(e.key==='s' || e.key==='S'){
        prota.bajar()
     }


     if(e.key==='d' || e.key==='D'){
        prota.derecha()
     }

     if(e.key==='a' || e.key==='A'){
        prota.izquierda()
     }

})




//Borrar o actualizar canvas  

function borraCanvas(){
    
    canvas.width=500
    canvas.height=500


}


//Bucle principal 

function principal(){
  requestAnimationFrame(principal)
  borraCanvas()
  colisiones()



  prota.dibuja()
  malo.dibuja()
  malo.mover()

 
  for(let i=0;i<ogroArray.length;i++){
      ogroArray[i].dibuja()
      ogroArray[i].abajo()
  }

}
principal()