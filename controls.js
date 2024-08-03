const MARIO_ANIMATIONS = {
    grown: {
        idle: 'mario-grown-idle',
        walk: 'mario-grown-walk',
        jump: 'mario-grown-jump',
    },
    normal: {
        idle: 'mario-idle',
        walk: 'mario-walk',
        jump: 'mario-jump'
    }
};

let isLeftKeyDown = false;
let isRightKeyDown = false;
let isUpKeyDown = false;

// Control de teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        isLeftKeyDown = true;
    }
    if (event.key === 'ArrowRight') {
        isRightKeyDown = true;
    }
    if (event.key === 'ArrowUp') {
        isUpKeyDown = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        isLeftKeyDown = false;
    }
    if (event.key === 'ArrowRight') {
        isRightKeyDown = false;
    }
    if (event.key === 'ArrowUp') {
        isUpKeyDown = false;
    }
});

// Joystick virtual
const joystick = document.getElementById('joystick');
const joystickButton = document.getElementById('joystickButton');
let joystickActive = false;

joystickButton.addEventListener('touchstart', (event) => {
    joystickActive = true;
    handleJoystickMovement(event);
});

joystickButton.addEventListener('touchmove', (event) => {
    handleJoystickMovement(event);
});

joystickButton.addEventListener('touchend', () => {
    joystickActive = false;
    isLeftKeyDown = false;
    isRightKeyDown = false;
});

function handleJoystickMovement(event) {
    const touch = event.touches[0];
    const rect = joystick.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = joystick.clientWidth / 2;
    const centerY = joystick.clientHeight / 2;
    const threshold = 20; // Sensibilidad del joystick

    // Resetear estado de dirección
    isLeftKeyDown = false;
    isRightKeyDown = false;

    if (joystickActive) {
        if (x < centerX - threshold) isLeftKeyDown = true;
        if (x > centerX + threshold) isRightKeyDown = true;
    }
}

document.getElementById('jumpButton').addEventListener('touchstart', () => {
    isUpKeyDown = true;
});
document.getElementById('jumpButton').addEventListener('touchend', () => {
    isUpKeyDown = false;
});

document.getElementById('crouchButton').addEventListener('touchstart', () => {
    // Implementar lógica de agacharse si es necesario
});
document.getElementById('crouchButton').addEventListener('touchend', () => {
    // Implementar lógica de dejar de agacharse si es necesario
});

export function checkControls({ mario }) {
    const isMarioTouchingFloor = mario.body.touching.down;

    if (mario.isDead || mario.isBlocked) return;

    const marioAnimations = mario.isGrown
        ? MARIO_ANIMATIONS.grown
        : MARIO_ANIMATIONS.normal;

    if (isLeftKeyDown) {
        if (isMarioTouchingFloor) mario.anims.play('mario-walk', true);
        mario.x -= 2;
        mario.flipX = true;
    } else if (isRightKeyDown) {
        if (isMarioTouchingFloor) mario.anims.play('mario-walk', true);
        mario.x += 2;
        mario.flipX = false;
    } else if (isMarioTouchingFloor) {
        mario.anims.play(marioAnimations.idle, true);
    }

    if (isUpKeyDown && isMarioTouchingFloor) {
        mario.setVelocityY(-300);
        mario.anims.play('mario-jump', true);
    }
}
