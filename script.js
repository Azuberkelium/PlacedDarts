document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const dartboardContainer = document.getElementById('dartboard-container');
    const currentScoreDisplay = document.getElementById('current-score');
    const pdScoreDisplay = document.getElementById('pd-score');
    const undoButton = document.getElementById('undo-button');
    const resetButton = document.getElementById('reset-button');

    // State variables
    let currentScore = 0;
    let pdScore = 0;
    let scoreHistory = [];

    // Dartboard numbers in clockwise order from the top
    const dartNumbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

    // Function to create a button and position it
    const createButton = (value, text, className, radius, angle, colorClass = '') => {
        const button = document.createElement('button');
        button.classList.add('dart-button', className, colorClass);
        button.dataset.value = value;
        button.textContent = text;
        
        // Calculate position based on a circle
        const containerSize = dartboardContainer.offsetWidth;
        const x = (containerSize / 2) + radius * Math.cos(angle);
        const y = (containerSize / 2) + radius * Math.sin(angle);
        
        button.style.left = `${x - (button.offsetWidth / 2)}px`;
        button.style.top = `${y - (button.offsetHeight / 2)}px`;

        return button;
    };

    // Function to build the dartboard
    const buildDartboard = () => {
        // Bullseye (50) and 25
        const bullseye50 = document.createElement('button');
        bullseye50.classList.add('dart-button', 'bullseye');
        bullseye50.dataset.value = 50;
        bullseye50.textContent = '50';

        const bullseye25 = document.createElement('button');
        bullseye25.classList.add('dart-button', 'bullseye-25');
        bullseye25.dataset.value = 25;
        bullseye25.textContent = '25';

        dartboardContainer.appendChild(bullseye25);
        dartboardContainer.appendChild(bullseye50);

        // Rings for doubles, triples, and numbers
        const numSectors = dartNumbers.length;
        const degreesPerSector = 360 / numSectors;

        dartNumbers.forEach((number, index) => {
            const angleInDegrees = (index * degreesPerSector);
            const angleInRadians = (angleInDegrees * Math.PI) / 180;
            
            // Determine the color of the segment
            const colorClass = index % 2 === 0 ? 'red-segment' : 'green-segment';

            // Outer Number
            const numberRadius = 190;
            const numberButton = createButton(number, number, 'outer-number', numberRadius, angleInRadians + Math.PI / numSectors, colorClass);
            dartboardContainer.appendChild(numberButton);

            // Double Ring
            const doubleValue = number * 2;
            const doubleRadius = 170;
            const doubleButton = createButton(doubleValue, `D${number}`, 'double-ring', doubleRadius, angleInRadians + Math.PI / numSectors, colorClass);
            dartboardContainer.appendChild(doubleButton);

            // Triple Ring
            const tripleValue = number * 3;
            const tripleRadius = 120;
            const tripleButton = createButton(tripleValue, `T${number}`, 'triple-ring', tripleRadius, angleInRadians + Math.PI / numSectors, colorClass);
            dartboardContainer.appendChild(tripleButton);
        });
    };

    // Function to update the UI
    const updateUI = () => {
        currentScoreDisplay.textContent = currentScore;
        pdScoreDisplay.textContent = pdScore;
    };

    // Event listener for all dartboard buttons
    dartboardContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('dart-button')) {
            const value = parseInt(target.dataset.value, 10);
            
            currentScore += value;
            scoreHistory.push(value);

            if (currentScore >= 100) {
                pdScore++;
                currentScore = 0;
            }
            updateUI();
        }
    });

    // Event listener for the Undo button
    undoButton.addEventListener('click', () => {
        if (scoreHistory.length > 0) {
            const lastScore = scoreHistory.pop();
            currentScore -= lastScore;
            
            if (currentScore < 0) {
                currentScore = 0;
            }
            updateUI();
        }
    });

    // Event listener for the Reset button
    resetButton.addEventListener('click', () => {
        currentScore = 0;
        pdScore = 0;
        scoreHistory = [];
        updateUI();
    });

    // Build the dartboard and perform initial UI update
    buildDartboard();
    updateUI();
});
