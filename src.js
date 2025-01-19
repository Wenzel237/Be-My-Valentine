// 'No' button logic

const noButton = document.getElementById('noButton');
const noButtonWidth = noButton.offsetWidth;
const noButtonHeight = noButton.offsetHeight;

const yesButton = document.getElementById('yesButton');

function moveNoButton(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const noButtonX = noButton.offsetLeft + noButtonWidth / 2;
    const noButtonY = noButton.offsetTop + noButtonHeight / 2;

    const deltaX = mouseX - noButtonX;
    const deltaY = mouseY - noButtonY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    const maxDistance = 300; // The distance at which the noButton moves away

    if (distance < maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);

        const moveX = Math.cos(angle) * (maxDistance * 0.2);
        const moveY = Math.sin(angle) * (maxDistance * 0.2);

        // Calculate new noButton position
        const newLeft = noButton.offsetLeft - moveX;
        const newTop = noButton.offsetTop - moveY;

        // Ensure the noButton stays within the viewport
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const boundedLeft = Math.min(
            Math.max(0, newLeft),
            windowWidth - noButtonWidth
        );
        const boundedTop = Math.min(
            Math.max(0, newTop),
            windowHeight - noButtonHeight
        );

        noButton.style.left = boundedLeft + 'px';
        noButton.style.top = boundedTop + 'px';
    }
}

function noButtonJump(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const noButtonX = noButton.offsetLeft + noButtonWidth / 2;
    const noButtonY = noButton.offsetTop + noButtonHeight / 2;

    const deltaX = mouseX - noButtonX;
    const deltaY = mouseY - noButtonY;

    const angle = Math.atan2(deltaY, deltaX);

    const maxDistance = 300;

    const moveX = Math.cos(angle) * (maxDistance * 0.3);
    const moveY = Math.sin(angle) * (maxDistance * 0.3);

    // Calculate new noButton position
    const newLeft = noButton.offsetLeft + moveX;
    const newTop = noButton.offsetTop + moveY;

    // Ensure the noButton stays within the viewport
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const boundedLeft = Math.min(
        Math.max(0, newLeft),
        windowWidth - noButtonWidth
    );
    const boundedTop = Math.min(
        Math.max(0, newTop),
        windowHeight - noButtonHeight
    );

    noButton.style.left = boundedLeft + 'px';
    noButton.style.top = boundedTop + 'px';
}

document.addEventListener('mousemove', moveNoButton);
noButton.addEventListener('mouseover', noButtonJump);


// background hearts logic

function drawHearts() {
    const body = document.body;
    const mainDisplay = document.getElementById('mainDisplayDiv');

    // Configuration
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const { top, left, width, height } = mainDisplay.getBoundingClientRect();
    const totalHearts = 10; // Number of hearts

    // Helper function to check if a position overlaps the excluded area
    const isOverlapping = (x, y, size) => {
        return (
            x + size > left &&
            x < left + width &&
            y + size > top &&
            y < top + height
        );
    };

    // Function to create a random element
    const drawAHeart = () => {
        const heartImg = document.createElement('Img');
        heartImg.src = 'images/heart.png'
        heartImg.className = 'backgroundHeartImage';

        const size = 50; // Fixed size for this example
        let x, y;

        // Generate random positions until the element doesn't overlap
        do {
            x = Math.random() * (screenWidth - size);
            y = Math.random() * (screenHeight - size);
        } while (isOverlapping(x, y, size));

        // Set the position of the element
        heartImg.style.left = x + 'px';
        heartImg.style.top = y + 'px';
        heartImg.style.width = size + 'px';
        heartImg.style.height = size + 'px';

        body.appendChild(heartImg);
    };

    // Generate multiple random elements
    for (let i = 0; i < totalHearts; i++) {
        drawAHeart();
    }
}

drawHearts();

// Select all hearts
const hearts = document.getElementsByClassName('backgroundHeartImage');

// Assign random bobbing speeds to each heart
[...hearts].forEach((heart) => {
    // Generate a random duration
    const randomDuration = (Math.random() * 5 + 2).toFixed(2);
    // Apply the random duration as the animation speed
    heart.style.animationDuration = `${randomDuration}s`;
});


// handle button clicks

function handleYesButtonClick() {
    const mainDisplay = document.getElementById('mainDisplayDiv');

    mainDisplay.innerHTML = `
    <Img src="images/yay.gif" class="gif" width="250px" />
    <p>
        Yay! 💖 You just made my day! I’m so happy you said yes!
    </p>
    `
}
function handleNoButtonClick() {
    const mainDisplay = document.getElementById('mainDisplayDiv');

    mainDisplay.innerHTML = `
    <Img src="images/ok.gif" class="gif" width="250px" />
    <p>
        Tuff 💔 Perhaps next year ~
    </p>
    `
}
yesButton.addEventListener('click', handleYesButtonClick);
noButton.addEventListener('click', handleNoButtonClick);