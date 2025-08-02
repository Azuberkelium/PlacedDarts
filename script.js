body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
}

#dartboard-container {
    position: relative;
    width: 450px;
    height: 450px;
    border-radius: 50%;
    background-color: #333;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.dart-button {
    position: absolute;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: none;
    z-index: 2;
}

.bullseye {
    background-color: #f00;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.bullseye-25 {
    background-color: #0c0;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.double-ring, .triple-ring, .outer-number {
    border-radius: 50%;
}

.double-ring {
    width: 40px;
    height: 40px;
    font-size: 0.8em;
}

.triple-ring {
    width: 30px;
    height: 30px;
    font-size: 0.7em;
}

.outer-number {
    background-color: #fff;
    color: #333;
    width: 45px;
    height: 45px;
    font-size: 1em;
}

.red-segment { background-color: #f00; }
.green-segment { background-color: #0c0; }

.score-display { margin-top: 30px; }

.coin-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ffcc00;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: bold;
    color: #333;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.player-score-container {
    margin-top: 20px;
    font-size: 1.5em;
    display: flex;
    align-items: center;
}

.controls { margin-top: 20px; }

.controls button {
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    margin: 0 10px;
    border: 1px solid #ccc;
    background-color: #eee;
    border-radius: 5px;
}

