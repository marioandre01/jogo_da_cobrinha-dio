let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d");
let box = 32;
let snake = []; //cria cobrinha como lista. Ela vai ser uma série de coordenadas, que quando pintadas criam os quadradinhos

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//Inicia a direção da cobrinha para a direita
let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//cria backgroud
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //Desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawnFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Quando um evento acontece, detecta e chama uma função
//O evento definido são a teclas do teclado
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){

    //fazer a cobrinha atravessar a tela no eixo x e eixo y (atravessa as paredes)
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //Se a cobrinha tocar nela mesma o jogo termina
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x &&  snake[0].y == snake[i].y){
            clearInterval(jogo); //para parar o jogo
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawnFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Quando passar pelo comida, faz a cobrinha crescer
    //A comida aparece em outro ponto aleátorio
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //unshift() adiciona um ou mais elementos no início de um array
    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

//setInterval - Executa um bloco específico repetidamente com um intervalo fixo entre cada chamada.
//Executa iniciarJogo a cada 100 milisegundo
let jogo = setInterval(iniciarJogo, 100);

