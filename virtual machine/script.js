const FS = require('fs');
const readline = require('readline-sync');
const COMMANDS = ["bekommen", "legen", "wenn", "senken", "mul", "gleich", "uber", "@"];

let prog = FS.readFileSync('main.txt').toString().split("\r\n");

console.log(prog);

let memory = [];
let i = 0;


for (let item of prog) {
    let command = item.slice(0, item.indexOf(' '));                                     // command of program; first word
    if (command[0] == "@") {
        command = command[0];
    }
    let currentPos = command.length + 6;                                                // the next part of string after the command and the memoryPoint
    let memoryPoint;

    switch (command) {
        case COMMANDS[0]:
            function bekommen() {
                memoryPoint = Number(item.slice(item.indexOf(' ') + 1, command.length + 5));    // pointer to memory adress
                if (memory[memoryPoint % 1000] == undefined) {
                    let temp = Number(readline.question('Enter the value'));                // get a value from user
                    
                    if (isNaN(temp) || temp === ' ' || temp === '') {                         // check type of the user value
                        console.log("InvalidTypeOfVariable")
                    } else {
                        memory[memoryPoint % 1000] = temp;                                  // set value in memory
                    }
                } else {
                    console.log("NotEmptyException");
                }
            }
            bekommen();
            break;

        case COMMANDS[1]:
            function legen() {
                memoryPoint = Number(item.slice(item.indexOf(' ') + 1, command.length + 5));    // pointer to memory adress
                if (memory[memoryPoint % 1000] == undefined) {
                    let value = item.slice(currentPos, item.length);                        // value, which programm have to set in memory
                    
                    if (value[0] == '_') {                                                  // if the value is memoryPoint
                        let tempMemoryPoint = Number(value.slice(1));                       // get memoryPoint of value, which programm have to set in memoryPoint
                        memory[memoryPoint % 1000] = memory[tempMemoryPoint % 1000];        // set value in memoryPoint
                    } else {
                        memory[memoryPoint % 1000] = Number(value);                         // set a normal integer value
                    }
                } else {
                    console.log("NotEmptyException");
                }
            }
            legen();
            break;

        case COMMANDS[2]:
            function wenn() {
                memoryPoint = item.slice(item.indexOf(' ') + 1, command.length + 6);    // pointer to memory adress
                let space = item.indexOf(' ', currentPos + 1);
                let operator = item.slice(currentPos + 1, space);
                
                if (memoryPoint[0] == '_') {
                    memoryPoint = Number(memoryPoint.slice(1));
                }
                
                let secondValue = item.slice(currentPos + operator.length + 2, item.indexOf(' ', currentPos + operator.length + 2));
                if (secondValue[0] == '_') {
                    secondValue = Number(secondValue.slice(1));
                }
            
                if (operator == COMMANDS[5]) {
                
                    if (memory[memoryPoint % 1000] == memory[secondValue % 1000]) {
                        let condCodeStart = item.indexOf('=>');
                        let codeBlock = item.slice(condCodeStart + 3, item.length);
                        
                        if (codeBlock.slice(0, 5) == 'geben') {
                            let value = codeBlock.slice(5, codeBlock.length);
                            let tempValue = Number(value);
                            if (isNaN(tempValue)) {
                                console.log(value);
                            } else {
                                console.log(tempValue);
                            }
                        }
                    }
                } else if (operator == COMMANDS[6]) {
                    if (memory[memoryPoint % 1000] > memory[secondValue % 1000]) {
                        let condCodeStart = item.indexOf('=>');
                        let codeBlock = item.slice(condCodeStart + 3, item.length);

                        if (codeBlock[0] == "@") {
                            myFunction();
                        }
                    }
                }
        }
            wenn();
            break;
        
        case COMMANDS[4]:
            function senken() {
                memoryPoint = Number(item.slice(item.indexOf(' ') + 1, command.length + 5));
                memory[memoryPoint % 1000]--;
            }
            senken();
            break;
        
        case COMMANDS[4]:

            break;

        case COMMANDS[7]:
            

            break;
    }

    
}
