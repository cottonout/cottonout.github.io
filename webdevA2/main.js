// Target all elements to save to constants
// || NAVIGATION VARIABLES
const homeBtn = document.querySelector("#homebtn");
const page1Btn = document.querySelector("#page1btn");
const page2Btn = document.querySelector("#page2btn");
const page3Btn = document.querySelector("#page3btn");
const page4Btn = document.querySelector("#page4btn");
const responsiveNav = document.querySelector("#navBar");
const openMenuBtn = document.querySelector("#openMenu");
const closeMenuBtn = document.querySelector("#closeMenu");
const allpages = document.querySelectorAll(".page");

// WEBSITE-WIDE CONTROL VARIABLES
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");
const topBtn = document.querySelector("#topBtn");
const musicBtn = document.querySelector("#musicBtn");
let userInteractionCounter = 0; // Check for interaction count to be more than 1 to play audio
const spaceBGM = new Audio("audio/spacebgm.mp3");
const buttonClick = new Audio("audio/buttonclick.mp3");

// PAGE 1 VARIABLES
const imageGallery = document.querySelector("#topics");

// PAGE 2 VARIABLES
const container = document.querySelector(".container");
const cards = container.querySelectorAll(".card");
// Set current question to be first question
let currentQnIndex = 0;
// Set score to 0
let score = 0;
// Quiz questions
// Object that stores questions and answers
// Values: Question, Answer Array (object)
// Answer stores text and value
const quizQuestions = [{
	question: "Which of these requirements must a planet fulfill?",
	answer: [{
		text: "It orbits the sun",
		value: "wrong"
	}, {
		text: "It is spherical or nearly spherical due to its gravity",
		value: "wrong"
	}, {
		text: 'Has "cleared the neighbourhood" of its orbit',
		value: "wrong"
	}, {
		text: "All of the above",
		value: "correct"
	}]
}, {
	question: "Which planet is the closest to the Sun?",
	answer: [{
		text: "Earth",
		value: "wrong"
	}, {
		text: "Mercury",
		value: "correct"
	}, {
		text: "Neptune",
		value: "wrong"
	}, {
		text: "Jupiter",
		value: "wrong"
	}]
}, {
	question: "Which planet is the hottest?",
	answer: [{
		text: "Mars",
		value: "wrong"
	}, {
		text: "Saturn",
		value: "wrong"
	}, {
		text: "Venus",
		value: "correct"
	}, {
		text: "Uranus",
		value: "wrong"
	}]
}, {
	question: "How many planets are there in the Solar System?",
	answer: [{
		text: "8",
		value: "correct"
	}, {
		text: "9",
		value: "wrong"
	}, {
		text: "4",
		value: "wrong"
	}, {
		text: "7",
		value: "wrong"
	}]
}];
// Get handle to main quiz elements
const quiz = document.querySelector(".quiz");
const qn = quiz.querySelector("#question");
const answerLabels = quiz.querySelectorAll('#answer-buttons label');
const nextButton = quiz.querySelector("button");

// PAGE 3 VARIABLES
const list = document.querySelector(".list");
const arrowBtns = document.querySelectorAll(".arrows button");
const items = list.querySelectorAll(".item");
const count = items.length;
let active = 1;
let topTransform = 0;
const height_item = items[active].offsetHeight;
const moreButtons = document.querySelectorAll(".item .more");
const closeBtns = document.querySelectorAll(".close");
const extraInfo = document.querySelectorAll(".extra");

// PAGE 4 VARIABLES
const jumpSFX = new Audio("audio/jump.mp3");
const game = document.querySelector(".game");
const gui = game.querySelector(".gui");
const planetsObtainedList = gui.querySelector(".planetsObtained");
const gameScreen = game.querySelector(".screen");
const menuScreen = gameScreen.querySelector(".blackScreen");
const endScreen = gameScreen.querySelector(".endScreen");
const startButton = menuScreen.querySelector("button");
const restartButton = endScreen.querySelector("button");
const speedSlider = game.querySelector("#speedSlider");
const jumpButton = game.querySelector("#jump");
const player = gameScreen.querySelector(".player");
var gameOver = false;
// Game Variables
// Planet objects
const planets = [{
	name: "Mercury",
	imgSrc: 'images/mercury.jpg',
	isTaken: false
}, {
	name: "Venus",
	imgSrc: 'images/venus.jpg',
	isTaken: false
}, {
	name: "Earth",
	imgSrc: 'images/earth.jpg',
	isTaken: false
}, {
	name: "Mars",
	imgSrc: 'images/mars.jpg',
	isTaken: false
}, {
	name: "Jupiter",
	imgSrc: 'images/jupiter.jpg',
	isTaken: false
}, {
	name: "Saturn",
	imgSrc: 'images/saturn.jpg',
	isTaken: false
}, {
	name: "Uranus",
	imgSrc: 'images/uranus.jpg',
	isTaken: false
}, {
	name: "Neptune",
	imgSrc: 'images/neptune.jpg',
	isTaken: false
}];
// Array to hold planets obtained
var currentPlanets = [];
// Instance to spawned planet
var spawnedPlanet;
// Bounding Box of screen
var maxLeft, maxTop, maxHeight;
// Establish player speed and current velocity
var playerY = 0;
var playerVelY = 0;
var jumpSpeed = 400;
var gravity = 600;
// Get input
var isKeyPressed = false;
speedSlider.value = 0;
// Establish planet speed, current planet velocity and spawnedStatus of planet
var planetX = 0;
var planetVelX = 0;
var planetSpeed = 200;
var isSpawned = false;
var spawnTimeout = 0;
// Set to -1 first (default)
var spawnedPlanetIndex = -1;
// Get the last elapsed time
var lastTime = Date.now();

// FOOTER VARIABLES
const emailInput = document.querySelector("#email-field");
const signUpBtn = document.querySelector(".content button");
let notif = document.querySelector(".toast");
let notifTimeout = 0;

// MISC VARIABLES (used for animation)
const allButtons = document.querySelectorAll("button");
let timeoutId = 0;

// Audio setup
spaceBGM.loop = true; // Make it loop
spaceBGM.volume = 0.75; // Reduce volume
// Check first interaction with website
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchend", handleTouchStart);
document.addEventListener("click", handleTouchStart);

function handleTouchStart() {
	// Policy: User must interact with the website at least once before audio can autoplay
	if (userInteractionCounter >= 1) {
		// Play audio
		spaceBGM.play();
		// Remove this eventlistener
		document.removeEventListener("touchstart", handleTouchStart);
		document.removeEventListener("touchend", handleTouchStart);
        document.removeEventListener("click", handleTouchStart);
	}

    // Increment number of times user has interacted with the website
	userInteractionCounter++;
}

// || NAVIGATION + WEBSITE-WIDE FUNCTIONS (Navigation, website reset, mute, back to top)
// Hide all pages
function hideAll() {
	// Go through all subtopic pages
	for (let onepage of allpages) {
		// Hide page
		onepage.style.display = "none";
	}
	resetWebsite();
}
// Show selected page number
function show(pgno) {
	hideAll();
	//select the page based on the parameter passed in
	let onePage = document.querySelector("#page" + pgno);

	// Show the page
	if (pgno < 3)
		onePage.style.display = "flex";
	else
		onePage.style.display = "block";

	// Scroll back to top
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// function to reset all pages data
function resetWebsite() {
	resetGallery();
	resetContainer();
	startQuiz();
	resetCarousel();
	resetGame();
	resetScore();
	endScreen.style.display = "none";
	menuScreen.style.display = "flex";
}
// Mute / Unmute music
function musicToggle() {
	// Check if musicBtn is muted
	if (musicBtn.classList.contains("muted"))
		spaceBGM.muted = false;
	else
		spaceBGM.muted = true;

	musicBtn.classList.toggle("muted");
}
// Button Clicking SFX
function playButtonClick() {
	// Check if buttonClick is already played
	if (!buttonClick.paused && buttonClick.currentTime > 0 && !buttonClick.ended)
		buttonClick.pause(); // Pause SFX

	// Reset it
	buttonClick.currentTime = 0;
	buttonClick.play();
}


/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
homeBtn.addEventListener("click", function() {
	hideAll();
	resetWebsite();
    emailInput.value = "";
    signUpBtn.style.display = "none";
	if (spaceBGM)
		spaceBGM.currentTime = 0;
});
page1Btn.addEventListener("click", function() {
	show(1);
});
page2Btn.addEventListener("click", function() {
	show(2);
});
page3Btn.addEventListener("click", function() {
	show(3);
});
page4Btn.addEventListener("click", function() {
	show(4);
});
// Check if reponsive menu button is opened
openMenuBtn.addEventListener("click", function() {
	openMenuBtn.classList.toggle("hide"); // Hide menu button
	responsiveNav.classList.toggle("show"); // Show X button
});
closeMenuBtn.addEventListener("click", function() {
	openMenuBtn.classList.toggle("hide"); // Show menu button
	responsiveNav.classList.toggle("show"); // Hide X button
});
topBtn.addEventListener("click", function() {
	// Scroll back to top
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});
musicBtn.addEventListener("click", function() {
	musicToggle(); // Mute / Unmute music
});
// Hide all pages at the beginning
hideAll();


// Fullscreen / Widescreen functions
// Enter fullscreen
btnFS.addEventListener("click", enterFullscreen);
// Exit fullscreen
btnWS.addEventListener("click", exitFullscreen);

function enterFullscreen() {
	document.documentElement.requestFullscreen();
	// Hide / Show respective buttons
	btnFS.classList.toggle("hide");
	btnWS.classList.toggle("hide");
}

function exitFullscreen() {
	// Hide / Show respective buttons
	document.exitFullscreen();
	btnFS.classList.toggle("hide");
	btnWS.classList.toggle("hide");
}

/* ----------------------------------------------------------------
-------------------------------------------------------------------
-------------------------------------------------------------------
------------------------------------------------------------------- */
// || PAGE 1 (Gallery)
// Expand image content on click
imageGallery.addEventListener("click", expandContent);

function expandContent(evt) {
	// Retrieve clicked target
	var sender = evt.target;
	// Check if image is already expanded
	const isActivated = sender.classList.contains("activated");
	// Reset the gallery first
	resetGallery();

	// If it is not activated, expand it, else shrink it
	if (sender.classList.contains("topic") && !isActivated)
		sender.classList.add("activated");

}

function resetGallery() {
	// Select all images
	let images = imageGallery.querySelectorAll(".topic");
	// Shrink them
	for (let i = 0; i < images.length; ++i) {
		if (images[i].classList.contains('activated'))
			images[i].classList.remove('activated');
	}
}



/* ----------------------------------------------------------------
-------------------------------------------------------------------
-------------------------------------------------------------------
------------------------------------------------------------------- */
// || PAGE 2 (Solar System Cards)
function resetContainer() {
	// Reset container
	container.classList.remove("active");
	// Reset cards
	for (let i = 0; i < cards.length; ++i) {
		if (cards[i].classList.contains('active'))
			cards[i].classList.remove('active');
	}
}

function activateCard(event, index) {
	// Prevent click from reaching parent element (container)
	event.stopPropagation();
	// Check if s[i] is already active
	const isActive = container.classList.contains("active");

	if (isActive) {
		// Reset container
		resetContainer();
	} else {
		// Activate container and cards
		container.classList.add("active");
		cards[index].classList.add("active");
	}
}
// Prevent function from using final i value (may happen in older browsers)
function createCardClickHandler(index) {
	return function(evt) {
		activateCard(evt, index);
	};
}
// Expand card if user clicks on card
for (let i = 0; i < cards.length; ++i) {
	cards[i].addEventListener("click", createCardClickHandler(i));
}

//  Start the quiz
function startQuiz() {
	// Reset values
	currentQnIndex = 0;
	score = 0;
	// Show the first question
	showQuestion();
}
// Show question
function showQuestion() {
	// Reset style
	resetState();

	// Get handle to current question
	let currentQn = quizQuestions[currentQnIndex];
	let qnNum = currentQnIndex + 1;

	// Display current question
	qn.innerHTML = qnNum + ". " + currentQn.question;

	// Get handle to all options
	for (let i = 0; i < 4; ++i) {
		// Get a handle to the current radio button
		const radioButton = answerLabels[i].querySelector('input[type="radio"]');
		// Remove the old event listener
		radioButton.removeEventListener("click", selectAnswer);

		// Replace the innerHTML (This replaces the text AND the radio button)
		answerLabels[i].innerHTML = radioButton.outerHTML + currentQn.answer[i].text;

		// Get the new radio button
		const newRadioButton = answerLabels[i].querySelector('input[type="radio"]');

		// Set value of the option on new radio button
		newRadioButton.value = currentQn.answer[i].value;

		// Add event listener to the new button
		newRadioButton.addEventListener("click", selectAnswer);
	}
}
// Reset style of quiz
function resetState() {
	// Hide the submit button
	nextButton.style.display = "none";

	// Remove styling from labels
	for (let i = 0; i < answerLabels.length; ++i) {
		answerLabels[i].classList.remove("correct", "wrong", "incorrect");
	}

	// Re-enable all radio buttons
	const radioButtons = quiz.querySelectorAll('input[type="radio"]');
	for (let i = 0; i < radioButtons.length; ++i) {
		radioButtons[i].disabled = false;
		radioButtons[i].checked = false;
	}
}
// Select radio button
function selectAnswer(evt) {
	// Get a handle to the radio button that was selected
	const selectedBtn = evt.target;
	// Check value
	const isCorrect = selectedBtn.value === "correct";

	// Style selected button according to correct / inccorect
	if (isCorrect) {
		selectedBtn.parentElement.classList.add("correct");
		score++;
	} else {
		selectedBtn.parentElement.classList.add("incorrect");
	}

	// Get all current radio buttons and disable them
	const radioButtons = quiz.querySelectorAll('input[type="radio"]');
	for (let i = 0; i < radioButtons.length; ++i) {
		if (radioButtons[i].value === "correct")
			radioButtons[i].parentElement.classList.add("correct");

		// Disable the radio button
		radioButtons[i].disabled = true;
	}

	// Set next button to visible
	nextButton.style.display = "block";
}
// Display the score
function showScore() {
	// Reset quiz display
	resetState();
	// Hide all radio button
	for (let i = 0; i < answerLabels.length; ++i) {
		answerLabels[i].style.display = "none";
	}
	// Display score
	qn.innerHTML = `You scored ${score} out of ${quizQuestions.length}`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}
// Next question / Display score
function handleNextButton() {
	currentQnIndex++;
	if (currentQnIndex < quizQuestions.length) {
		showQuestion();
	} else {
		showScore();
	}
}
// Handle interaction with next button
nextButton.addEventListener("click", function() {
	if (currentQnIndex < quizQuestions.length) {
		handleNextButton();
	} else {
		for (let i = 0; i < answerLabels.length; ++i) {
			answerLabels[i].style.display = "flex";
		}
		startQuiz();
	}
});

// Start quiz automatically
startQuiz();



/* ----------------------------------------------------------------
-------------------------------------------------------------------
-------------------------------------------------------------------
------------------------------------------------------------------- */
// || PAGE 1 AND PAGE 2
// Reset Image Gallery and Carousel if user clicks outside of them
document.addEventListener("click", function(event) {
	if (!container.contains(event.target)) {
		resetContainer();
	}

	if (!imageGallery.contains(event.target)) {
		resetGallery();
	}
});



/* ----------------------------------------------------------------
-------------------------------------------------------------------
-------------------------------------------------------------------
------------------------------------------------------------------- */
// || PAGE 3
function createArrowClickHandler(button) {
	return function() {
		if (button.id == "down") {
			if (active >= count - 1)
				active = count - 1; // Set to max index
			else
				active++; // Increment
		} else {
			if (active <= 0)
				active = 0; // Set to min index
			else
				active--; // Decrement
		}

		runCarousel();
	};
}
for (let i = 0; i < arrowBtns.length; ++i) {
	arrowBtns[i].addEventListener("click", arrowBtns[i].addEventListener("click", createArrowClickHandler(arrowBtns[i])));
}
// Shift items accordingly
function runCarousel() {
	// Get handle to current active item
	let oldActive = document.querySelector('.item.active');
	if (oldActive)
		oldActive.classList.remove('active');

	items[active].classList.add('active');

	// Shift items to the top / bottom accordingly
	// Height of item * current index * -1 to shift it down / up from original position (top: 0px originally)
	topTransform = (height_item * (active - 1) * -1);
	list.style.transform = `translateY(${topTransform}px)`;

	// Prevent focus onto inactive item more buttons
	removeFocus();
}
// Prevent focus
function removeFocus() {
	// Remove focus of all More Buttons
	for (let moreButton of moreButtons) {
		moreButton.tabIndex = -1;
	}

	// Add focus back to current active item More Button
	let focusedButton = items[active].querySelector(".more");
	focusedButton.tabIndex = 0;
}
// Handle interaction with all More Buttons
for (let i = 0; i < moreButtons.length; ++i) {
	moreButtons[i].addEventListener("click", displayExtraContent);
}

function displayExtraContent() {
	// Set extra info to visible
	extraInfo[active].style.display = "block";
	// Add shadow behind box and disable scrolling
	var shadow = document.createElement('div');
	shadow.classList.add('shadow');
	shadow.style.cssText = 'position: fixed; width: 100%; height: 100%; background-color: #000; opacity: 50%; z-index: 1;';
	document.body.appendChild(shadow);
	// Hide the scrollbar to prevent scrolling
	document.body.style.overflow = "hidden";
}
// Handle interaction with all Close Buttons
for (let i = 0; i < closeBtns.length; ++i) {
	closeBtns[i].addEventListener("click", hideExtraContent);
}

function hideExtraContent() {
	// Hide extra info
	extraInfo[active].style.display = "none";
	// Get handle to the shadow element and remove it
	var shadow = document.getElementsByClassName('shadow')[0];
	shadow.remove();

	// Show scrollbar to re-enable scrolling
	document.body.style.overflow = "auto";
}
// Reset the carousel
function resetCarousel() {
	active = 1; // Default original value
	runCarousel();
}
// Run Carousel automatically
runCarousel();




/* ----------------------------------------------------------------
-------------------------------------------------------------------
-------------------------------------------------------------------
------------------------------------------------------------------- */
// || PAGE 4 / MINIGAME
// Handle interaction with game buttons
startButton.addEventListener("click", function() {
	startGame();
});
restartButton.addEventListener("click", function() {
	resetScore();
	// resetGame();
	// Hide end screen and display menu screen
	endScreen.style.display = "none";
	menuScreen.style.display = "flex";
	startGame();
});

function startGame() {
	// Hide menu and display player
	menuScreen.style.display = "none";
	player.style.display = "block";

	// Calculate bounding box
	maxLeft = gameScreen.offsetWidth - player.offsetWidth;
	maxTop = gameScreen.offsetHeight - player.offsetHeight;
	maxHeight = gameScreen.offsetHeight - player.offsetHeight;

	// Set player's initial position in the air to middle of the screen
	playerY = (gameScreen.offsetHeight / 2) - (player.offsetHeight / 2);
	player.style.bottom = playerY + "px";

	// Set the planets speed accordingly
	planetSpeed += 5 * parseInt(speedSlider.value);
	// Disable the slider
	speedSlider.disabled = true;

	// Handle interaction with the jump button
	jumpButton.addEventListener("click", jump);
	document.addEventListener("keydown", checkForKeyPressed);
	document.addEventListener("keyup", checkForKeyReleased);

	// Set spawning of planets
	spawnTimeout = setTimeout(spawnPlanet, 1000);

	// Start physics loop, get lastTime in ms
	lastTime = Date.now();
	requestAnimationFrame(updatePhysics);
}

function checkForKeyPressed(evt) {
	// Check if key is being held down
	if (evt.code == "KeyW" && !isKeyPressed) {
		isKeyPressed = true;
		jump();
	}
}

function checkForKeyReleased(evt) {
	// Check if key is released
	if (evt.code == "KeyW")
		isKeyPressed = false;
}

function jump() {
	playerVelY = jumpSpeed; // Set upward velocity (can jump anytime)
	playJumpSFX();
}

function updatePhysics() {
	// Get current time in ms
	const currentTime = Date.now();
	// Calculate last elapsed time and convert it to seconds, cap it by 0.033s to prevent significant jumps during lag spikes
	const deltaTime = Math.min((currentTime - lastTime) / 1000, 1 / 30); // Cap deltaTime
	// Set last elapsed time to currentTime now
	lastTime = currentTime;

	// Apply gravity
	playerVelY -= gravity * deltaTime;

	// Update position
	playerY += playerVelY * deltaTime;

	// Update style
	player.style.bottom = Math.round(playerY) + "px";

	// Check for collision with top and bottom
	if (playerY <= 0 || playerY >= maxHeight) {
		// End the game and break the loop
		gameOver = true;
	}

	// Check if planet can be spawned
	if (isSpawned) {
		// Update planet's velocity
		planetVelX += planetSpeed * deltaTime;
		// Update planet's position
		planetX += planetVelX * deltaTime;
		// Update planet's style
		spawnedPlanet.style.right = Math.round(planetX) + "px";

		// Check for collision with left wall of screen
		if (planetX >= maxLeft) {
			// Remove the planet and reset values
			spawnedPlanet.remove();
			resetPlanetValues();
			isSpawned = false;

			// Reset spawnTimeout
			spawnTimeout = setTimeout(spawnPlanet, 1000);
		}

		// Check collision with player
		if (checkCollisionWithPlayer(spawnedPlanet)) {
			// Create a new obtainedPlanet element
			let newPlanet = {};
			newPlanet.name = planets[spawnedPlanetIndex].name;
			newPlanet.imgSrc = planets[spawnedPlanetIndex].imgSrc;

			// Add it to the obtainedPlanets list
			currentPlanets.push(newPlanet);
			addObtainedPlanet();

			// Remove the spawned planet and reset values
			spawnedPlanet.remove();
			isSpawned = false;
			resetPlanetValues();
			spawnTimeout = setTimeout(spawnPlanet, 1000);
		}
	}

	// Check if game is not over
	if (currentPlanets.length < 8 && !gameOver) {
		// Continue loop
		requestAnimationFrame(updatePhysics);
	} else {
		gameOver = true;
		// End game
		endGame();
	}
}
// End game, reset values and calculate score
function endGame() {
	// Stop spawning of planets
	clearTimeout(spawnTimeout);
	// Display end screen
	endScreen.style.display = "flex";
	let score = 0;

	// Calculate score
	for (let i = 0; i < 8; ++i) {
		if (i == currentPlanets.length)
			break;

		if (currentPlanets[i].name == planets[i].name)
			score++;
	}

	// Display score
	endScreen.querySelector("p").innerHTML = `Score: ${score} / 8`;

	// Reset entire game
	resetGame();
}

// || RESET FUNCTIONS
function resetGame() {
	// Reset the values of the player
	playerY = 0;
	playerVelY = 0;
	spawnTimeout = 0;

	// Reset the game
	gameOver = false;

	// Reset others
	resetScreen();
	resetPlanetValues();

	// Remove event listeners
	jumpButton.removeEventListener("click", jump);
	document.removeEventListener("keydown", checkForKeyPressed);
	document.removeEventListener("keyup", checkForKeyReleased);

	// Enable the slider again
	speedSlider.disabled = false;
}
// Reset visible elements on screen
function resetScreen() {
	// Hide the player
	player.style.display = "none";

	// Ensure all the planets are removed
	let planetElements = gameScreen.getElementsByClassName("planet");
	if (planetElements.length > 0) {
		for (let i = planetElements.length - 1; i >= 0; --i) {
			planetElements[i].remove();
		}
	}
}
// Reset the obtainedPlanets list
function resetScore() {
	// Remove obtainedPlanets
	let planetElements = planetsObtainedList.getElementsByClassName("obtainedPlanet");
	if (planetElements.length > 0) {
		for (let i = planetElements.length - 1; i >= 0; --i) {
			planetElements[i].remove();
		}
	}

	// Remove obtained planets
	for (let i = currentPlanets.length - 1; i >= 0; --i) {
		currentPlanets.pop();
	}
}

function resetPlanetValues() {
	planetVelX = 0;
	planetX = 0;
	planetSpeed = 200;
}

// || SPAWNING FUNCTIONS
// Spawning of planets
function spawnPlanet() {
	// Choose a random planet
	let randPlanetNum = RandomRange(0, 7);
	const randomPlanet = planets[randPlanetNum];
	const planetName = randomPlanet.name;
	// Check if this planet's name exists in the array of obtainedPlanets
	const planetExists = currentPlanets.some(function(planet) {
		return planet.name === planetName;
	});

	// Check if it exists
	if (!planetExists) {
		// Set the index of the spawned planet
		spawnedPlanetIndex = randPlanetNum;

		// Create the planet
		spawnedPlanet = document.createElement('div');
		spawnedPlanet.classList.add('planet');
		spawnedPlanet.style.backgroundImage = `url(${randomPlanet.imgSrc})`;
		gameScreen.appendChild(spawnedPlanet);

		// Set the planet's spawn point
		// Planet is larger than the player at some points, need to account for size difference
		let randPlanetY = RandomRange(0, (maxTop - (spawnedPlanet.offsetHeight - player.offsetHeight)));

		// Position the planet accordingly
		spawnedPlanet.style.right = 0 + "px";
		spawnedPlanet.style.top = randPlanetY + "px";
		isSpawned = true;
	} else {
		// Respawn quickly
		spawnTimeout = setTimeout(spawnPlanet, 100);
	}
}
// Add a new obtained planet to the list
function addObtainedPlanet() {
	// Create obtainedPlanet element
	const lastElement = currentPlanets[currentPlanets.length - 1];
	const obtainedPlanet = document.createElement('li');
	obtainedPlanet.classList.add("obtainedPlanet");

	// Set it to image of the planet
	const imgElement = document.createElement('img');
	imgElement.src = lastElement.imgSrc;
	imgElement.alt = "Icon of " + imgElement.name;

	// Append it to the list as a list item
	obtainedPlanet.appendChild(imgElement);
	planetsObtainedList.appendChild(obtainedPlanet);
}

// || COLLISION CHECKING FUNCTION
function checkCollisionWithPlayer(object) {
	// Get final computed values of player and planet's dimensions and positions
	let playerTop = parseInt(getComputedStyle(player).getPropertyValue("top"));
	let playerLeft = parseInt(getComputedStyle(player).getPropertyValue("left"));
	let playerWidth = parseInt(getComputedStyle(player).getPropertyValue("width"));

	let objectWidth = parseInt(getComputedStyle(object).getPropertyValue("width"));
	let objectLeft = parseInt(getComputedStyle(object).getPropertyValue("left"));
	let objectTop = parseInt(getComputedStyle(object).getPropertyValue("top"));

	// Check AABB-AABB collision
	if ((objectLeft < (playerLeft + playerWidth) && (objectLeft + objectWidth) > playerLeft) && (objectTop < (playerTop + playerWidth) && (objectTop + objectTop + objectWidth) > playerTop)) {
		return true;
	}

	return false;
}
// Play the jump audio
function playJumpSFX() {
	// Set audio back to start
	jumpSFX.pause();
	jumpSFX.currentTime = 0;
	jumpSFX.play();
}



// || FOOTER
// Submission Form
emailInput.addEventListener('input', function() {
	emailInput.addEventListener('keypress', function(event) {
		// Prevent space input
		var key = event.keyCode;
		if (key === 32) {
			event.preventDefault();
		}
	});

	// Remove all whitespace from the input value
	emailInput.value = emailInput.value.replace(/\s/g, '');

	// Check if input is empty
	if (emailInput.value === "")
		signUpBtn.style.display = "none";
	else
		signUpBtn.style.display = "block";
});

signUpBtn.addEventListener('click', function() {
	if (notif == null) {
		// Create a new notification element
		addNotif();
		// Set up timer
		notifTimeout = setTimeout(function() {
			removeNotif();
		}, 1500);
	} else {
		alert("Please wait before sending another verification email!");
	}
});

// Function to add a new notification element
function addNotif() {
	// Create the notification
	var tempToastNotif = document.createElement('div');
	tempToastNotif.classList.add('toast');
	document.body.appendChild(tempToastNotif);

	// Create image and email elements
	const notifIcon = document.createElement("img");
	notifIcon.src = 'images/notificon.png';
	notifIcon.alt = 'Icon of a notification bell';
	const email = document.createElement("p");

	// Create the text
	const textNode = document.createTextNode(emailInput.value + ' has been sent a verification email!');
	email.appendChild(textNode);

	// Append to notification
	tempToastNotif.append(notifIcon);
	tempToastNotif.append(textNode);

	// Set reference to the current toast div
	notif = document.querySelector(".toast");
}
// Function to remove the notification element
function removeNotif() {
	notif.classList.add("closing");
	notif.addEventListener('animationend', function(event) {
		// Check if animation has finished
		if (event.animationName === 'slideOutRight') {
			notif.remove();
			notif = document.querySelector(".toast");
		}
	});
}

// || MISC FUNCTIONS
// Randomise
function RandomRange(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
// Toggle button animation
function toggleAnimation(btn) {
	btn.classList.toggle("pressed");
	timeoutId = setTimeout(function() {
		btn.classList.toggle("pressed");
	}, 500);
}
for (let i = 0; i < allButtons.length; ++i) {
	allButtons[i].addEventListener("click", addAllButtonEffects(allButtons[i]));
}

function addAllButtonEffects(button) {
	return function() {
		playButtonClick();
		toggleAnimation(button);
	};
}