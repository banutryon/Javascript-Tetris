document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	let squares = Array.from(document.querySelectorAll(".grid div"));
	const width = 10;
	const scoreDisplay = document.querySelector("#score");
	const startBtn = document.querySelector("#start-button");
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
			random = Math.floor(Math.random() * theTetrominoes.length);
			current = theTetrominoes[random][currentRotation];
			currentPosition = 4;
			draw();
		}
	};

	// rules to keep blocks from going outside of borders
});
