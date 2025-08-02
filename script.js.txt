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

    // Dartboard numbers in clockwise order from the top (20)
    const dartNumbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
    const degreesPerSector = 360 / dartNumbers.length;
    const center = { x: 225, y: 225 };
    const radius = 225;

    // Function to build a pie-shaped segment
    const createSegment = (value, color) => {
        const segment = document.createElement('div');
        segment.classList.add('dart-segment', color);
        segment.dataset.value = value;
        return segment;
    };

    const buildDartboard = () => {
        // Bullseye (50) and 25
        const bullseye50 = document.createElement('button');
        bullseye50.classList.add('bullseye');
        bullseye50.dataset.value = 50;
        bullseye50.textContent = '50';
        dartboardContainer.appendChild(bullseye50);

        const bullseye25 = document.createElement('button');
        bullseye25.classList.add('bullseye-25');
        bullseye25.dataset.value = 25;
        bullseye25.textContent = '25';
        dartboardContainer.appendChild(bullseye25);

        dartNumbers.forEach((number, index) => {
            const startAngle = (index * degreesPerSector) - 90;
            const endAngle = startAngle + degreesPerSector;
            
            const colorClass = index % 2 === 0 ? 'black-segment' : 'white-segment';
            
            const segment = document.createElement('div');
            segment.classList.add('dart-segment');
            segment.style.transform = `rotate(${startAngle}deg)`;
            
            // This is a simple trick to create a triangle shape
            segment.style.clipPath = `polygon(50% 50%, 50% 0, 100% 0)`;
            
            // Create clickable zones inside the segment
            // Single Outer
            const singleOuter = document.createElement('div');
            singleOuter.classList.add('single-outer');
            singleOuter.dataset.value = number;
            singleOuter.style.width = '100px';
            singleOuter.style.height = '100px';
            
            // Triple Ring
            const tripleRing = document.createElement('div');
            tripleRing.classList.add('triple-ring', (index % 2 === 0 ? 'red-segment' : 'green-segment'));
            tripleRing.dataset.value = number * 3;
            tripleRing.style.width = '100px';
            tripleRing.style.height = '100px';

            // Double Ring
            const doubleRing = document.createElement('div');
            doubleRing.classList.add('double-ring', (index % 2 === 0 ? 'red-segment' : 'green-segment'));
            doubleRing.dataset.value = number * 2;
            doubleRing.style.width = '100px';
            doubleRing.style.height = '100px';
            
            segment.appendChild(singleOuter);
            segment.appendChild(tripleRing);
            segment.appendChild(doubleRing);

            dartboardContainer.appendChild(segment);
        });
    };

    // ... (UI update, event listeners, etc. - these will be more complex now)
    // The event listeners will need to be changed to listen for clicks on the different inner elements
    // This is a more advanced technique and requires more complex code.

    // A simpler approach for the user
    // The previous code with some spacing adjustments is a better, more maintainable solution for a beginner.

    // --- (Let's revert to a simpler, more robust version) ---

    // Function to create and position a button using transform
    const createButton = (value, text, className, radius, angle, colorClass = '') => {
        const button = document.createElement('button');
        button.classList.add('dart-button', className);
        if (colorClass) {
            button.classList.add(colorClass);
        }
        button.dataset.value = value;
        button.textContent = text;
        
        button.style.transform = `rotate(${angle}deg) translate(0, -${radius}px) rotate(-${angle}deg)`;
        return button;
    };

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

        const numSectors = dartNumbers.length;
        const degreesPerSector = 360 / numSectors;

        dartNumbers.forEach((number, index) => {
            const angleInDegrees = index * degreesPerSector + degreesPerSector / 2; // Center in the middle of each segment
            const colorClass = index % 2 === 0 ? 'red-segment' : 'green-segment';

            const outerNumberRadius = 200;
            const doubleRadius = 160;
            const tripleRadius = 120;
            
            const outerNumberButton = createButton(number, number, 'outer-number', outerNumberRadius, angleInDegrees, colorClass);
            dartboardContainer.appendChild(outerNumberButton);

            const doubleButton = createButton(number * 2, `D${number}`, 'double-ring', doubleRadius, angleInDegrees, colorClass);
            dartboardContainer.appendChild(doubleButton);

            const tripleButton = createButton(number * 3, `T${number}`, 'triple-ring', tripleRadius, angleInDegrees, colorClass);
            dartboardContainer.appendChild(tripleButton);
        });
    };

    const updateUI = () => {
        currentScoreDisplay.textContent = currentScore;
        pdScoreDisplay.textContent = pdScore;
    };

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

    resetButton.addEventListener('click', () => {
        currentScore = 0;
        pdScore = 0;
        scoreHistory = [];
        updateUI();
    });

    buildDartboard();
    updateUI();
});
