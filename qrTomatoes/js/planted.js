import * as db from './db.js';
import * as letters from './letters.js';

export const planted = [
    {
        year:2023,
        plantsPerRow: 5,
        showText: true,
        plants:[
            22, null, null, 23, 25,
            1, 2, 3, 4, 5,
            6, 7, 8, 9, 10,
            11, 12, 13, 14,
            15, 16, 17, 18,
            19, 20, null, 21
        ],
        semens:{
            id: 1,
            semensPerRow: 5,
            plants: []
        }
    },
    {
        year:0,
        plantsPerRow: "H E L L O W O R L D!".length*5,
        showText: false,
        plants: letters.stringToPlants("H E L L O W O R L D!"), 
        semens:[
            {
                id: 1,
                semensPerRow: 5,
                plants: []
            }
        ]
    }    
];

function getPlantedDetailsByYear(year) {
    const plantedDetails = planted.find(p => p.year === year);
    
    if (!plantedDetails) {
        console.log(`Aucun détail trouvé pour l'année ${year}`);
        return;
    }
    return plantedDetails;
}

export function getCurrentPlantedDetails() {
    const currentYear = new Date().getFullYear();
    //return getPlantedDetailsByYear(currentYear);
    return getPlantedDetailsByYear(0);
}


