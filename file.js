
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


document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && game_state !== 'Play') {

        document.querySelectorAll('.pipe_sprite').forEach((e) => e.remove());


        bird.style.display = 'block';
        bird.style.top = '50vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');

        play();
    }
});

function play() {
    let bird_dy = 0;
    let pipe_seperation = 0;
    let pipe_gap = 35;

    function move() {
        if (game_state !== 'Play') return;


        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();


            if (pipe_sprite_props.right <= 0) {
                element.remove();
            } else {

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


        bird_dy += grativy;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === ' ') {
                bird_dy = -7.6;
            }
        });


        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }


        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);


    function create_pipe() {
        if (game_state !== 'Play') return;


        if (pipe_seperation > 115) {
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_gap = 35;


            let pipe_sprite_inv = document.createElement('img');
            pipe_sprite_inv.classList.add('pipe_sprite', 'top');
            pipe_sprite_inv.src = 'nico.png';
            pipe_sprite_inv.style.position = 'absolute';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';
            pipe_sprite_inv.style.width = '5vw';
            pipe_sprite_inv.style.height = '500px';
            document.body.appendChild(pipe_sprite_inv);


            let pipe_sprite = document.createElement('img');
            pipe_sprite.classList.add('pipe_sprite', 'bottom');
            pipe_sprite.src = 'nico.png';
            pipe_sprite.style.position = 'absolute';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.style.width = '5vw';
            pipe_sprite.style.height = '500px';
            pipe_sprite.increase_score = '1';
            document.body.appendChild(pipe_sprite);
        }

        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}