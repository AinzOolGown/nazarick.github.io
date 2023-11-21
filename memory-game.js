document.addEventListener('DOMContentLoaded', () => {
	const startBtn = document.getElementById('startBtn');
	const gameContainer = document.getElementById('game-container');
	const instructionsDiv = document.getElementById('instructions');
	let tiles = [];
	let timer;
	let memoryTime;

	startBtn.addEventListener('click', function() {
		let numberOfPairs = prompt('Enter the number of picture pairs (4, 5, or 6 for 8, 10, or 12 pictures):');
		startGame(parseInt(numberOfPairs));
	});

	function startGame(pairs) {
		if (![4, 5, 6].includes(pairs)) {
		alert('Invalid number of pairs. Please enter 4, 5, or 6.');
		return;
		}
		setupGame(pairs);
		shuffleTiles(tiles);
		displayTiles();
		startMemoryTimer();
	}

	function setupGame(pairs) {
		gameContainer.innerHTML = '';
		gameContainer.style.display = 'grid';
		tiles = [];
		for (let i = 1; i <= pairs; i++) {
			tiles.push(`image${i}.png`);
			tiles.push(`image${i}.png`); // Add two of each image
		}
		memoryTime = pairs === 4 ? 3 : pairs === 5 ? 5 : 8;
		timer = pairs === 4 ? 120 : pairs === 5 ? 150 : 180;
	}

	function shuffleTiles() {
		for (let i = tiles.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[tiles[i], tiles[j]] = [tiles[j], tiles[i]];
		}
	}
	
	let firstChoice = null;
	let secondChoice = null;
	let isChecking = false;

	function compareChoices() {
		if (firstChoice.innerHTML === secondChoice.innerHTML) {
			firstChoice.style.visibility = 'hidden';
			secondChoice.style.visibility = 'hidden';
		} else {
			firstChoice.firstChild.style.display = 'none';
			secondChoice.firstChild.style.display = 'none';
		}
		firstChoice = null;
		secondChoice = null;
		isChecking = false;
	}

	function displayTiles() {
		gameContainer.innerHTML = '';

		tiles.forEach((tileSrc, index) => {
			const tile = document.createElement('div');
			tile.classList.add('game-tile');
			tile.setAttribute('data-tile-index', index);

			const img = document.createElement('img');
			img.src = tileSrc; 
			img.style.display = 'none'; 
			
			tile.appendChild(img);
			
			tile.addEventListener('click', function() {
				if (isChecking || this.firstChild.style.display === 'block') {
					return;
				}
				this.firstChild.style.display = 'block';

				if (!firstChoice) {
					firstChoice = this;
				} else if (firstChoice && !secondChoice && firstChoice !== this) {
					secondChoice = this;
					isChecking = true;
					setTimeout(compareChoices, 1000);
				}
			});

			gameContainer.appendChild(tile);
		});
	}


	function startMemoryTimer() {
		const allImages = document.querySelectorAll('#game-container img');
		allImages.forEach(img => img.style.display = 'block');
		
		setTimeout(() => {
		allImages.forEach(img => img.style.display = 'none');
		startGameTimer();
		}, memoryTime * 1000);
	}

	function startGameTimer() {
		let gameTimer = setTimeout(() => {
			endGame();
		}, timer * 1000);

		let countdownElement = document.getElementById('countdown'); // Make sure you have an element with this ID in your HTML
		let currentTime = timer;
		let countdownTimer = setInterval(() => {
			currentTime -= 1;
			countdownElement.textContent = `Time remaining: ${currentTime} seconds`;
			if (currentTime <= 0) {
				clearInterval(countdownTimer);
			}
		}, 1000);
	}

	function endGame() {
		const allImages = document.querySelectorAll('#game-container img');
		allImages.forEach(img => {
			img.style.display = 'block';
			img.parentElement.classList.add('no-click'); 
		});

		const allTiles = document.querySelectorAll('#game-container .game-tile');
		allTiles.forEach(tile => {
			tile.removeEventListener('click', displayTiles);
		});

		alert('Game over! Let\'s restart.');

		setTimeout(() => {
			resetGame();
		}, 10000);
	}

	function resetGame() {
		firstChoice = null;
		secondChoice = null;
		isChecking = false;
		
		const allImages = document.querySelectorAll('#game-container img');
		allImages.forEach(img => {
			img.style.display = 'none';
			img.parentElement.classList.remove('no-click');
		});

		const gameContainer = document.getElementById('game-container');
		gameContainer.innerHTML = '';
	}
});
