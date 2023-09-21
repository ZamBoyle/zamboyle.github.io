const letters = {
  A: [
    1, null, null, null, 1,
    1, null, null, null, 1,
    1, 1, 1, 1, 1,
    1, null, null, null, 1,
    1, 1, 1, 1, 1
  ], 
  B: [
    1, 1, 1, 1, 1,
    1, null, null, null, 1,
    1, 1, 1, 1, 1,
    1, null, null, null, 1,
    1, 1, 1, 1, 1
  ],
  C: [
    1, 1, 1, 1, 1,
    1, null, null, null, null,
    1, null, null, null, null,
    1, null, null, null, null,
    1, 1, 1, 1, 1
  ],
  H: [
    1, null, null, null, 1,
    1, null, null, null, 1,
    1, 1, 1, 1, 1,
    1, null, null, null, 1,
    1, null, null, null, 1
  ],  
  I:[
    null, null, 1, null, null,
    null, null, 1, null, null,
    null, null, 1, null, null,
    null, null, null, null, null,
    null, null, 1, null, null
  ],
    E: [
      1, 1, 1, 1, 1,
      1, null, null, null, null,
      1, 1, 1, 1, 1,
      1, null, null, null, null,
      1, 1, 1, 1, 1,
    ],
    N: [
      1,  null, null, null, 1,
      1,  null, null, 1, 1,
      1,  null, 1, null, 1,
      1, 1, null, null, 1,
      1,null, null, null, 1,
    ],    
    L: [
        1, 1, 1, 1, 1,
        1, null, null, null, null,
        1, null, null, null, null,
        1, null, null, null, null,
        1, null, null, null, null
    ],
    D: [
      1, 1, 1, 1, null,
      1, null, null, null, 1,
      1, null, null, null, 1,
      1, null, null, null, 1,
      1, 1, 1, 1, null,
    ],
    O: [
        null, 1, 1, 1, null,
        1, null, null, null, 1,
        1, null, null, null, 1,
        1, null, null, null, 1,
        null, 1, 1, 1, null,
      ],
      R: [
        1, null, null, null, 1,
        1, null, null, 1, null,
        1, 1, 1, 1, 1,
        1, null, null, null, 1,
        1, 1, 1, 1, null,
      ],          
      V: [
        1, null, null, null, 1,
        1, null, null, null, 1,
        null, 1, null, 1, null,
        null, 1, null, 1, null,
        null, null, 1, null, null,
      ],
      U: [
        null, 1, 1, 1, null,
        1, null, null, null, 1,
        1, null, null, null, 1,
        1, null, null, null, 1,
        1, null, null, null, 1,
      ],      
      V: [
        null, null, 1, null, null,
        null, 1, null, 1, null,
        null, 1, null, 1, null,
        1, null, null, null, 1,
        1, null, null, null, 1,
      ],      
    W: [
        1, null, null, null, 1,
        1, 1, null, 1, 1,
        1, null, 1, null, 1,
        1, null, null, null, 1,
        1, null, null, null, 1,
      ],
      '!': [
        null, null, 1, null, null,
        null, null, null, null, null,
        null, null, 1, null, null,
        null, null, 1, null, null,
        null, null, 1, null, null
    ],          
    ' ': [
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null
    ], 
    '.': [
        null, null, 1, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null
    ]    
  };
  

  export function stringToPlants(str) {
    let arrays = [];
    for(let char of str) {
      if(letters[char]) {
        arrays.push(letters[char]);
      }
    }
    return combineLetters(...arrays);
  }


export function combineLetters(...letters) {
    let result = [];
    for (let i = 0; i < 5; i++) {
      for (let letter of letters) {
        result = result.concat(letter.slice(i * 5, (i + 1) * 5));
      }
    }
    return result;
  }

  

