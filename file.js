// Configurações iniciais
let move_speed = 3, grativy = 0.5;
let bird = document.querySelector('.bird');
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
bird.style.display = 'none';
message.classList.add('messageStyle');

// Listener de tecla Enter (configurado apenas uma vez)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && game_state !== 'Play') {
        // Remove tubos antigos
        document.querySelectorAll('.pipe_sprite').forEach((e) => e.remove());

        // Configura o estado inicial do jogo
        bird.style.display = 'block'; // Mostra o pássaro
        bird.style.top = '50vh'; // Posiciona o pássaro
        game_state = 'Play'; // Altera o estado para "jogando"
        message.innerHTML = ''; // Remove a mensagem inicial
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0'; // Reinicia a pontuação
        message.classList.remove('messageStyle'); // Remove o estilo de mensagem

        play(); // Inicia o jogo
    }
});

function play() {
    let bird_dy = 0;
    let pipe_seperation = 0; // Contador para a criação de novos tubos
    let pipe_gap = 35; // Distância entre os tubos

    function move() {
        if (game_state !== 'Play') return;

        // Movimento dos tubos
        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            // Se o tubo passar da tela, remove ele
            if (pipe_sprite_props.right <= 0) {
                element.remove();
            } else {
                // Verifica se o pássaro colidiu com o tubo
                if (
                    bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                    bird_props.left + bird_props.width > pipe_sprite_props.left &&
                    bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                    bird_props.top + bird_props.height > pipe_sprite_props.top
                ) {
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    bird.style.display = 'none';
                    return;
                } else {
                    // Conta ponto se o pássaro passou por um tubo
                    if (
                        pipe_sprite_props.right < bird_props.left &&
                        pipe_sprite_props.right + move_speed >= bird_props.left &&
                        element.increase_score === '1'
                    ) {
                        score_val.innerHTML = +score_val.innerHTML + 1;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }

    requestAnimationFrame(move);

    function apply_gravity() {
        if (game_state !== 'Play') return;

        // Aplica a gravidade
        bird_dy += grativy;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === ' ') {
                bird_dy = -7.6; // Impulso para o pássaro subir
            }
        });

        // Se o pássaro atingir o topo ou o fundo da tela, acaba o jogo
        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload(); // Reinicia a página para começar novamente
            message.classList.remove('messageStyle');
            return;
        }

        // Aplica a gravidade ao pássaro
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    // Função para criar os tubos
    function create_pipe() {
        if (game_state !== 'Play') return;
    
        // Cria os tubos a cada certa distância
        if (pipe_seperation > 115) {
            pipe_seperation = 0;
    
            let pipe_posi = Math.floor(Math.random() * 43) + 8; // Determina a posição do tubo
            let pipe_gap = 35; // Espaço entre os tubos
    
            // Tubo superior
            let pipe_sprite_inv = document.createElement('img');
            pipe_sprite_inv.classList.add('pipe_sprite', 'top');
            pipe_sprite_inv.src = 'nico.png'; // Caminho da imagem
            pipe_sprite_inv.style.position = 'absolute';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh'; // Ajuste para o tubo superior
            pipe_sprite_inv.style.left = '100vw'; // Posiciona o tubo no lado direito
            pipe_sprite_inv.style.width = '5vw'; // Ajuste de tamanho
            pipe_sprite_inv.style.height = '500px';
            document.body.appendChild(pipe_sprite_inv);
    
            // Tubo inferior
            let pipe_sprite = document.createElement('img');
            pipe_sprite.classList.add('pipe_sprite', 'bottom');
            pipe_sprite.src = 'nico.png'; // Caminho da imagem
            pipe_sprite.style.position = 'absolute';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh'; // Posição do tubo inferior
            pipe_sprite.style.left = '100vw'; // Posiciona o tubo no lado direito
            pipe_sprite.style.width = '5vw'; // Ajuste de tamanho
            pipe_sprite.style.height = '500px';
            pipe_sprite.increase_score = '1'; // Marca para pontuação
            document.body.appendChild(pipe_sprite);
        }
    
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}