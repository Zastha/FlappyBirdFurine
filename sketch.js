/*
  Nombre: Rene Zazueta Zazueta
  Fecha: 28/11/2023
  Proyecto: Flappy Bird Personalizado
  Wasabi: 2.0
*/

let imagenFondo
let imagenFondo1
let imagenFondo2
let imagenFondo3
let imagenFondo4
let imagenInicio
let imagenPersonaje
let imagenPared
let wallX = [600, 900]
let wallY = [400, 600]
let x = 0
let posY = 100
let velY = 3
let estado = 0
let puntaje = 0
let record = 0
let recordAnterior = 0
let musicaRecord
let musicaInicio
let musicaFondo
let imagenSalto
let reproduccionInicio=false;
let crearCorazon=false;
let elevacion=-5;
let posCorazon=0;
let fuente;


function preload() {
  //Precarga de archivos
  imagenFondo = loadImage('./images/mondstadt.jpg')
  imagenFondo1 = loadImage('./images/mondstadt.jpg')
  imagenFondo2 = loadImage('./images/liyue.jpg')
  imagenFondo3 = loadImage('./images/inazuma.jpg')
  imagenFondo4 = loadImage('./images/sumire.jpg')
  imagenInicio = loadImage('./images/inicio.jpeg')
  imagenPersonaje = loadImage('./images/furine.gif')
  imagenPared = loadImage('./images/pared.png')
  imagenSalto = loadImage('./images/hearts.gif')
  musicaFondo = loadSound('./sounds/Cry.mp3')
  musicaInicio = loadSound('./sounds/Fontaine.mp3')
  musicaRecord = loadSound('./sounds/Congrats.mp3')
  fuente = loadFont('./fonts/lafuente.otf')
}

function setup() {
  createCanvas(1200,800)
  textSize(60)
  textFont(fuente)
  
  
}

function draw() {
  
  //Dibujo cuando el juego esta en curso
  if (estado === 1) {
    
   
    background(255)
    
    imageMode(CORNER)

      //Dibujando y conectando los fondos
      image(imagenFondo,x,0)
      image(imagenFondo2,x+imagenFondo.width,0)
      image(imagenFondo3,x+(imagenFondo.width*2),0)
      image(imagenFondo4,x+(imagenFondo.width*3),0)
      image(imagenFondo,x+(imagenFondo.width*4),0)

   //Moviendo fondo
    x = x - 5

    //Moviendo al personaje
    velY = velY + 1
    posY = posY + velY

    //Crea paredes
    for (let i=0; i < wallX.length; i++) {
      imageMode(CENTER)
      image(imagenPared, wallX[i], wallY[i]-500)
      image(imagenPared, wallX[i], wallY[i]+500)

      if (wallX[i] < 0) {
        wallX[i] = width
        wallY[i] = random(200, 600)
      }
      
      if (wallX[i] ===300) {
        puntaje = puntaje + 1
        record = max(puntaje, record)
      }
    
    
      wallX[i] = wallX[i] - 5

      //Revisando si el personaje se sale de la pantalla
    //O si ha colisionado con una pared
    if (posY > height || posY < 0|| (abs(wallX[i]-300)<100 && abs(posY-wallY[i])>200) ) {
      estado = 0
      crearCorazon=false;
      musicaFondo.stop()
      cursor()
    }
    }

    if (x < (-imagenFondo.width*4)) {
      x = 0
      
    }

    //Tabula record
    image(imagenPersonaje,300,posY, 50,50)
    text("Puntaje: " + puntaje, width/2-60, 50)

    //Dibuja Corazon durante salto
    if(crearCorazon==true){
      
      image(imagenSalto,300,posCorazon, 50,50)
      posCorazon=posCorazon+elevacion;
    }

  } else { //Significa que estamos en la pantalla de inicio
    background(0)
    imageMode(CORNER)
    image(imagenInicio,0,0)

    //Comprobacion de record
    if (recordAnterior != record) {
      if (!musicaRecord.isPlaying()) {
        musicaRecord.play()
        musicaRecord.setVolume(0.1)
        reproduccionInicio=true;
      }
     
    }

    //Evita que se reproduzca la musica de inicio multiples veces
    if(reproduccionInicio==false){
      musicaInicio.loop()
      musicaInicio.setVolume(0.1)
      reproduccionInicio=true;
    }

    //Dibuja inicio
    textSize(100)
    fill(0)
    text("El viaje de Furine", 350, 200)
    
    
    textSize(60)
    fill(255)
    text("Record: " + record, 500, 750)
    
    
    

  }
}


//Acciones al presionar el mouse
function mousePressed() {
  if (estado === 0) {
    musicaInicio.stop()
    estado = 1
    x = 0
    velY = 3
    posY = 50
    wallX = [600, 900]
    wallY = [400, 600]
    puntaje = 0
    recordAnterior = record
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    reproduccionInicio=false;
    musicaFondo.loop()
    musicaFondo.setVolume(0.1)
    noCursor()

  } else {
  
    posCorazon=posY-100;
    velY = -15
    crearCorazon=true;
    
  }
}

//Acciones al presionar la pantalla tactil
function touchStarted(){
  if (estado === 0) {
    musicaInicio.stop()
    estado = 1
    x = 0
    velY = 3
    posY = 50
    wallX = [600, 900]
    wallY = [400, 600]
    puntaje = 0
    recordAnterior = record
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    reproduccionInicio=false;
    musicaFondo.loop()
    musicaFondo.setVolume(0.1)
    noCursor()

  } else {
    
    posCorazon=posY-100;
    velY = -15
    crearCorazon=true;
    
  }
}