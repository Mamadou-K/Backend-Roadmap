# 🎲 Number Guessing Game CLI

A simple Command Line Interface (CLI) game built with Node.js where the computer selects a random number between 1 and 100, and you have to guess it within a limited number of attempts.

The game uses classes to practice object-oriented programming (OOP) in JavaScript.

---

## ⚙️ How to Create the Project

1. **Create the project folder**
```bash
   mkdir number-guessing-game
   cd number-guessing-game

```

2. **Create the main file**
```bash
   touch number-guessing-game.js
```

3. **Copy the provided code** into `number-guessing-game.js`.

4. **Check Node.js is installed**
```bash
   node -v
```
5. **Run the app**
```bash
   node number-guessing-game.js
```

## 💡 Tips
* Enter numbers between 1 and 100.
* Choose a difficulty level carefully:

    * **Easy** → 10 chances
    * **Medium** → 5 chances
    * **Hard** → 3 chances

* You can **play multiple rounds** until you choose to quit.
* Keep track of your **number of attempts** for fun.

## 🧩 Commands
The game is fully interactive via CLI:

| Action            | Prompt / Input       | Example                  |
| ----------------- | -------------------- | ------------------------ |
| Select difficulty | Enter 1-3            | `1` → Easy (10 chances)  |
| Enter your guess  | Enter a number 1-100 | `42`                     |
| Play again        | y / n                | `y` → Play another round |


## 📥 Example Input / Output

```bash 
# Start the game
node number-guessing-game.js

# Output
🎉 Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.

Select difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)
Enter your choice (1-3): 2
You selected Medium.
Great! You have 5 chances.

Enter your guess: 50
Incorrect! The number is less than 50.

Enter your guess: 25
Incorrect! The number is greater than 25.

Enter your guess: 35
Incorrect! The number is less than 35.

Enter your guess: 30
🎉 Correct! You guessed the number in 4 attempts.

Do you want to play again? (y/n): n
Thanks for playing! Goodbye 👋
```

## 🧰 Learning Outcomes

By building this project, you will learn to:

* Create a CLI tool using Node.js
* Handle user input and prompts in the terminal
* Generate random numbers
* Implement classes and object-oriented design
* Track attempts and game state
* Use loops and conditional logic

## 🏁 Next Steps / Ideas

* Add a timer to track how long each round takes
* Implement a hint system (e.g., "number is even")
* Track high scores (fewest attempts per difficulty)
* Add colorful CLI output for fun
* Convert the game into a web-based version with HTML/CSS/JS