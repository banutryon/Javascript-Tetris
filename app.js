document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	let squares = Array.from(document.querySelectorAll(".grid div"));
	const width = 10;
	const scoreDisplay = document.querySelector("#score");
	const startBtn = document.querySelector("#start-button");
	let nextRandom = 0;
	// creating Tetrominoes
	const tetrominoL = [
		[1, width + 1, width * 2 + 1, 2],
		[width, width + 1, width + 2, width * 2 + 2],
		[1, width + 1, width * 2 + 1, width * 2],
		[width, width * 2, width * 2 + 1, width * 2 + 2],
	];
	const tetrominoZ = [
		[0, width, width + 1, width * 2 + 1],
		[width + 1, width + 2, width * 2, width * 2 + 1],
		[0, width, width + 1, width * 2 + 1],
		[width + 1, width + 2, width * 2, width * 2 + 1],
	];
	const tetrominoT = [
		[1, width, width + 1, width + 2],
		[1, width + 1, width + 2, width * 2 + 1],
		[width, width + 1, width + 2, width * 2 + 1],
		[1, width, width + 1, width * 2 + 1],
	];
	const tetrominoO = [
		[0, 1, width, width + 1],
		[0, 1, width, width + 1],
		[0, 1, width, width + 1],
		[0, 1, width, width + 1],
	];
	const tetrominoI = [
		[1, width + 1, width * 2 + 1, width * 3 + 1],
		[width, width + 1, width + 2, width + 3],
		[1, width + 1, width * 2 + 1, width * 3 + 1],
		[width, width + 1, width + 2, width + 3],
	];

	const theTetrominoes = [
		tetrominoL,
		tetrominoZ,
		tetrominoT,
		tetrominoO,
		tetrominoI,
	];

	let currentPosition = 4;
	let currentRotation = 0;

	// select tetromionos at random
	let random = Math.floor(Math.random() * theTetrominoes.length);
	let current = theTetrominoes[random][0];

	// draw the tetromion
	const draw = () => {
		current.forEach((index) => {
			squares[currentPosition + index].classList.add("tetromino");
		});
	};
	const undraw = () => {
		current.forEach((index) => {
			squares[currentPosition + index].classList.remove("tetromino");
		});
	};
	// assign movement to keyCodes
	const control = (e) => {
		if (e.keyCode === 37) {
			moveLeft();
		} else if (e.keyCode === 38) {
			rotate();
		} else if (e.keyCode === 39) {
			moveRight();
		} else if (e.keyCode === 40) {
			moveDown();
		}
	};
	document.addEventListener("keyup", control);

	// move down function
	const moveDown = () => {
		undraw();
		currentPosition += width;
		draw();
		freeze();
	};
	// make blocks move down every second

	let timerId = setInterval(moveDown, 1000);

	// freeze function
	const freeze = () => {
		if (
			current.some((index) =>
				squares[currentPosition + index + width].classList.contains("taken")
			)
		) {
			current.forEach((index) =>
				squares[currentPosition + index].classList.add("taken")
			);
			random = nextRandom;
			nextRandom = Math.floor(Math.random() * theTetrominoes.length);
			current = theTetrominoes[random][currentRotation];
			currentPosition = 4;
			draw();
			displayShape();
		}
	};

	// rules to keep blocks from going outside of borders

	const moveLeft = () => {
		undraw();
		const isAtLeftEdge = current.some(
			(index) => (currentPosition + index) % width === 0
		);
		if (!isAtLeftEdge) currentPosition -= 1;

		if (
			current.some((index) =>
				squares[currentPosition + index].classList.contains("taken")
			)
		) {
			currentPosition += 1;
		}
		draw();
	};

	const moveRight = () => {
		undraw();
		const isAtRightEdge = current.some(
			(index) => (currentPosition + index) % width === width - 1
		);
		if (!isAtRightEdge) currentPosition += 1;

		if (
			current.some((index) =>
				squares[currentPosition + index].classList.contains("taken")
			)
		) {
			currentPosition -= 1;
		}
		draw();
	};
	const rotate = () => {
		undraw();
		currentRotation++;

		if (currentRotation === current.length) {
			currentRotation = 0;
		}
		current = theTetrominoes[random][currentRotation];
		draw();
	};

	// show up-next tetromino in mini grid display
	const displaySquares = document.querySelectorAll(".mini-grid div");
	const displayWidth = 4;
	let displayIndex = 0;

	// the terromonos without rotations
	const upNextTetrominoes = [
		[1, displayWidth + 1, displayWidth * 2 + 1, 2],
		[0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
		[1, displayWidth, displayWidth + 1, displayWidth + 2],
		[0, 1, displayWidth + 1],
		[1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
	];

	// display the shape in the mini grid
	const displayShape = () => {
		displaySquares.forEach((square) => {
			square.classList.remove("tetromino");
		});
		upNextTetrominoes[nextRandom].forEach((index) => {
			displaySquares[displayIndex + index].classList.add("tetromino");
		});
	};
});
