'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// // testing win
// let stacks = {
//   a: [],
//   b: [1],
//   c: [4,3,2]
// };

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  // console.log(stacks);
 
    // need parameter called 'startStack'
    // need parameter called 'endStack'

    // take the last item for startingStack array // maybe use pop()?
    // place the item that we removed into the 'endStack' // use push() --combined
    stacks[endStack].push(stacks[startStack].pop());
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  // check for blanks and undefinded, return false (not legal)
  if (startStack === '' || endStack === '') {
    console.log('🛑   illegal move blanks detected    🛑');
    return false;
  } else if (stacks[startStack] === undefined || stacks[endStack] === undefined) {
    console.log('🛑   illegal move undefined detected    🛑');
    return false;
  } else { 
    for (let i = 0; i < 3; i++){ // loops for each nested-array
      // tests the current move (startStack) is less than the last move (endStack)
      // OR that the endStack equals 0
      if (stacks[startStack][stacks[startStack].length -1] < stacks[endStack][stacks[endStack].length -1] || stacks[endStack].length === 0) {
        return true;
      }
      // otherwise don't allow move
      else {
        console.log('🛑   illegal move detected    🛑');
        return false;
      }
    }
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = (stacks) => {
  // Your code here
  // checks to make sure that the right column (c) = 4
  //  this assumes that the rest of logic is correct only allowing legal moves
  if (stacks.c.length === 4){
    
    return true;
    
  } else {
    return false;
  }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if (isLegal(startStack, endStack))  {
    movePiece(startStack, endStack);
    if (checkForWin(stacks)) {
      console.log();
      console.log('🏆  you win !!  🏆');
      console.log();
      console.log('new game:');
    };
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      if (checkForWin(stacks)) {
        stacks = {
          a: [4, 3, 2, 1],
          b: [],
          c: []
        }; 
      };
      getPrompt();
    });
  });
}




// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { 
        a: [4, 3, 2], 
        b: [1], 
        c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { 
        a: [], 
        b: [], 
        c: [4, 3, 2, 1] 
      };
      assert.equal(checkForWin(), true);
      stacks = { 
        a: [1], 
        b: [4, 3, 2], 
        c: [] 
      };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
