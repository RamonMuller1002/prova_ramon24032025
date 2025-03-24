const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

let game_over = false;

const teclasPressionadas = {
    KeyW: false,
    KeyS: false,
    KeyD: false,
    KeyA: false
};
document.addEventListener('keydown', (e) => {
    for (let tecla in teclasPressionadas) {
        if (teclasPressionadas.hasOwnProperty(e.code)) {
            teclasPressionadas[tecla] = false;
        }
    }
    if (teclasPressionadas.hasOwnProperty(e.code)) {
        teclasPressionadas[e.code] = true;
    }
});



class Entidade {
    constructor(x, y, largura, altura) {
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.game_Over = false;
    }
    desenhar() {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}


class Cobra extends Entidade {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura)
    }
    atualizar() {
        if (teclasPressionadas.KeyW) {
            this.y -= 7
        } else if (teclasPressionadas.KeyS) {
            this.y += 7
        } else if (teclasPressionadas.KeyA) {
            this.x -= 7
        } else if (teclasPressionadas.KeyD) {
            this.x += 7
        }
    }
    desenhar(cor) {
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }

    verificarColisao(comida) {
        if (
            this.x < comida.x + comida.largura &&
            this.x + this.largura > comida.x &&
            this.y < comida.y + comida.altura &&
            this.y + this.altura > comida.y
        ) {
            this.#houveColisao(comida)
        }
    }
    #houveColisao(comida) {
        comida.x = Math.random() * canvas.width - 10
        comida.y = Math.random() * canvas.height - 10
    }
    colisao(){
        if (
            this.x < 0 || 
            this.y < 0 ||
            this.x + this.largura >= canvas.width || 
            this.y + this.altura >= canvas.height

        ) {
            game_over = true;
            this.gameOver()
        }    
    }
    gameOver() {
        console.log("Game Over");
            this.y = 0;
            this.x = 0;
            ctx.fillStyle = 'RED';
            ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100);
        
            ctx.fillStyle = 'black';
            ctx.font = "50px Arial";
            ctx.fillText("Game Over", (canvas.width / 2) - 150, canvas.height / 2);

            ctx.font = "20px Arial";
            ctx.fillText("f5 para reiniciar", (canvas.width / 2) - 120, (canvas.height / 2) + 30);
        }
}
class Comida extends Entidade {
    constructor() {
        super(Math.random() * canvas.width - 10, Math.random() * canvas.height - 10, 20, 20)
    }
}

const cobra = new Cobra(100, 200, 20, 20,)
const comida = new Comida()


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cobra.desenhar('purple')
    cobra.atualizar()
    comida.desenhar()
    cobra.verificarColisao(comida)
    cobra.colisao()
    if(game_over == false){
        requestAnimationFrame(loop)
    }
    
}
loop()
