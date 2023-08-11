

export const A = [
    1, null, null, null, 1,
    1, null, null, null, 1,    
    1, 1, 1, 1, 1,
    1, null, null, null, 1,
    1, 1, 1, 1, 1,
];

export const H = [
    1, null, null, null, 1,
    1, null, null, null, 1,
    1, 1, 1, 1, 1,
    1, null, null, null, 1,
    1, null, null, null, 1,
];

export const E = [
    1, 1, 1, 1, 1,
    1, null, null, null, null,
    1, 1, 1, 1, 1,
    1, null, null, null, null,
    1, 1, 1, 1, 1,
];

export const F = [
    1, null, null, null, null,
    1, null, null, null, null,    
    1, 1, 1, 1, 1,
    1, null, null, null, null,
    1, 1, 1, 1, 1,
];

export const L = [
    1, 1, 1, 1, 1,
    1, null, null, null, null,
    1, null, null, null, null,
    1, null, null, null, null,
    1, null, null, null, null
];

export const O = [
    1, 1, 1, 1, 1,
    1, null, null, null, 1,
    1, null, null, null, 1,
    1, null, null, null, 1,
    1, 1, 1, 1, 1,
];

export const SPACE = [
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null
];

const letters = {
    H: [
      1, null, null, null, 1,
      1, null, null, null, 1,
      1, 1, 1, 1, 1,
      1, null, null, null, 1,
      1, null, null, null, 1
    ],
    E: [
      1, 1, 1, 1, 1,
      1, null, null, null, null,
      1, 1, 1, 1, 1,
      1, null, null, null, null,
      1, 1, 1, 1, 1,
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
        1, 1, 1, 1, 1,
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