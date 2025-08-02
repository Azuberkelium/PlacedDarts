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

    // Function to update the UI
    const updateUI = () => {
        currentScoreDisplay.textContent = currentScore;
        pdScoreDisplay.textContent = pdScore;
    };

    // Event listener for dartboard buttons
    dartboardContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('dart-value')) {
            const value = parseInt(target.dataset.value, 10);
            
            // Add the value to the current score
            currentScore += value;
            
            // Store the value in history for the undo function
            scoreHistory.push(value);

            // Check if the score reaches 100
            if (currentScore >= 100) {
                pdScore++;
                currentScore = 0;
                // You could add a celebratory animation here
            }

            updateUI();
        }
    });

    // Event listener for the Undo button
    undoButton.addEventListener('click', () => {
        if (scoreHistory.length > 0) {
            // Get the last scored value
            const lastScore = scoreHistory.pop();
            
            // Subtract it from the current score
            currentScore -= lastScore;
            
            // Ensure the score doesn't go below 0 (if needed)
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

    // Initial UI update
    updateUI();
});
