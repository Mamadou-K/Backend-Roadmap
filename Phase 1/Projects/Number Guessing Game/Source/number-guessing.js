const readline = require("readline");

// --- Configuration ---
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

// --- Readline Interface ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Utility function to prompt the user for input
 * @param {string} question
 * @returns {Promise<string>}
 */
function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

// --- Number Generator Class ---
class NumberGenerator {
  constructor(min = MIN_NUMBER, max = MAX_NUMBER) {
    this.min = min;
    this.max = max;
  }

  /**
   * Generates a random number between min and max
   * @returns {number}
   */
  generate() {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }
}

// --- Player Class ---
class Player {
  constructor() {
    this.attempts = 0; // Track attempts for a round
    this.maxAttempts = 0; // Max allowed attempts based on difficulty
  }

  /**
   * Increment attempt count
   */
  makeAttempt() {
    this.attempts++;
  }

  /**
   * Check if player has remaining attempts
   * @returns {boolean}
   */
  hasAttemptsLeft() {
    return this.attempts < this.maxAttempts;
  }

  /**
   * Set allowed chances based on difficulty
   * @param {string} difficulty - 'easy', 'medium', 'hard'
   */
  setDifficulty(difficulty) {
    if (difficulty === "easy") this.maxAttempts = 10;
    else if (difficulty === "medium") this.maxAttempts = 5;
    else if (difficulty === "hard") this.maxAttempts = 3;
    else this.maxAttempts = 5; // default
  }
}

// --- Game Class ---
class NumberGuessingGame {
  constructor() {
    this.numberGenerator = new NumberGenerator();
    this.player = new Player();
    this.targetNumber = 0;
  }

  /**
   * Prompt the user to select difficulty level
   */
  async selectDifficulty() {
    console.log("\nSelect difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)");

    while (true) {
      const choice = await ask("Enter your choice (1-3): ");
      if (choice === "1") {
        this.player.setDifficulty("easy");
        console.log("You selected Easy.");
        break;
      } else if (choice === "2") {
        this.player.setDifficulty("medium");
        console.log("You selected Medium.");
        break;
      } else if (choice === "3") {
        this.player.setDifficulty("hard");
        console.log("You selected Hard.");
        break;
      } else {
        console.log("Invalid choice. Enter 1, 2, or 3.");
      }
    }

    console.log(`\nGreat! You have ${this.player.maxAttempts} chances.`);
  }

  /**
   * Start a single round
   */
  async playRound() {
    this.targetNumber = this.numberGenerator.generate();
    this.player.attempts = 0; // reset attempts

    await this.selectDifficulty();

    while (this.player.hasAttemptsLeft()) {
      const input = await ask("Enter your guess: ");
      const guess = Number(input);

      if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
        console.log(`❌ Please enter a valid number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
        continue;
      }

      this.player.makeAttempt();

      if (guess === this.targetNumber) {
        console.log(`🎉 Correct! You guessed the number in ${this.player.attempts} attempts.`);
        return;
      } else if (guess < this.targetNumber) {
        console.log(`Incorrect! The number is greater than ${guess}.\n`);
      } else {
        console.log(`Incorrect! The number is less than ${guess}.\n`);
      }
    }

    console.log(`❌ Out of chances! The correct number was ${this.targetNumber}.`);
  }

  /**
   * Main game loop for multiple rounds
   */
  async start() {
    console.log("\n🎉 Welcome to the Number Guessing Game!");
    console.log(`I'm thinking of a number between ${MIN_NUMBER} and ${MAX_NUMBER}.\n`);

    let playAgain = true;

    while (playAgain) {
      await this.playRound();
      const answer = await ask("\nDo you want to play again? (y/n): ");
      playAgain = answer.toLowerCase() === "y";
    }

    console.log("\nThanks for playing! Goodbye 👋");
    rl.close();
  }
}

// --- Run the Game ---
const game = new NumberGuessingGame();
game.start();