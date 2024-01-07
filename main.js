const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
        this.y = 0;
        this.x = 0;
    }

    get field() {
        return this._field;
    }

    print() {
        for (let row of this._field) {
            console.log(row.join(''));
        }
    }

    playGame() {
        let currentlyPlaying = true;
        this.print();
        let direction;

        while(currentlyPlaying) {
            direction = prompt("Which way would you like to go? \n (Up = 'U' Down = 'D' Left = 'L' Right = 'R'");

            if(direction.toUpperCase() === 'U') {
                if(this.y === 0) {
                    console.log('You can not move any further up! Please choose another direction.');
                } else {
                    this.y -= 1;
                }
            } else if (direction.toUpperCase() === 'D') {
                if(this.y === this._field.length - 1) {
                    console.log('You can not move any further down!. Please choose another direction.');
                } else {
                    this.y += 1;
                }
            } else if (direction.toUpperCase() === 'L') {
                if (this.x === 0) {
                  console.log('You can not move any further Left! Please choose another direction.')
                } else {
                    this.x -= 1
                }
              } else if (direction.toUpperCase() === 'R') {
                if (this.x === this._field[this.y].length - 1) {
                  console.log('You can not move any further Right! Please choose another direction.')
                } else {
                    this.x += 1
                }
              } else {
                console.log('Invalid entry. Please enter U, D, L, or R')
              }

              if (this._field[this.y][this.x] === hat) {
                console.log('You have found the hat! You win!');
                currentlyPlaying = false;
                break;
              } else if (this._field[this.y][this.x] === hole){
                console.log('Game Over! You fell through the hole!');
                currentlyPlaying = false;
                break;
              } else {
                this.field[this.y][this.x] = pathCharacter;
                this.print();
              }
        }
    }

    static generateField(height, width, percentage) {
        //return hole or fieldCharacter depending on percentage
        const fieldOrHole = (percentage) =>  {
            if (percentage >= 0 && percentage <= 100) {
                const ranNum = Math.random() * 100;
                if (ranNum < percentage) {
                    return hole;
                } else {
                    return fieldCharacter;
                }
            } else {
                console.log('Please enter a number between 0-100: ');
            }
        }

        //return plain field with no hat and pathCharacter
        const plainField = () => {
            function makeWidthArray() {
                let widthArray = [];
                for (let i = 0; i < width; i++) {
                    widthArray.push(fieldOrHole(percentage));
                }
                return widthArray;
            }

            let plainField = [];
            for (let i = 0; i < height; i++) {
                plainField.push(makeWidthArray());
            }
            return plainField;
        }

        const gameReadyField = plainField();

        //add hat on gameReadyField, and check if hat sits on *
        let hatPlaced = false;
        do {
            const randomX = Math.floor(Math.random() * width);
            const randomY = Math.floor(Math.random() * height);
            if (randomX !== 0 || randomY !== 0) {
                gameReadyField[randomY][randomX] = hat;
                hatPlaced = true;
            }
        } while (!hatPlaced);

        //add pathCharacter to ledt-upper corner
        gameReadyField[0][0] = pathCharacter;

        return gameReadyField;
    }
}

/*const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);*/

const myField = new Field(Field.generateField(20, 20, 20));

//myField.print();

myField.playGame();