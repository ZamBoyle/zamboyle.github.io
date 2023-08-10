export const tomatoDB = [
    {
        id:22,
        nom: "Tomate Paola",
        description:"",
        urlImage: "22_Paola.jpg",
        avis:[]
    },
    {
        id:23,
        nom: "Tomate Premio",
        description:"",
        urlImage: "23_Premio.jpg",
        avis:[]
    },
    {
        id:25,
        nom: "Aucune idée :-)",
        description:"",
        urlImage: "0_Unknown.jpg",
        avis:[]
    },    
    {
        id: 1,
        nom: "Tomate Maya F1",
        description:
            "Savoureuse tomate rayée brun-jaune, très décorative dans le potager! Cette variété a de beaux fruits ronds, jaunes avec des rayures brunes à violettes à partir du calice.",
        urlImage: "1_Maya_F1.jpg",
        avis:[]
    },
    {
        id: 2,
        nom: "Tomate Cristal F1",
        description:
            "belle tomate ronde parfaitement rouge. Cette variété de qualité précoce est très productive.",
        urlImage: "2_Cristal_F1.jpg",
        avis:[]
    },
    {
        id: 3,
        nom: "Tomate Ananas",
        description:
            "<p>La tomate ananas est une variété tardive produisant des fruits de 250 à 400 grammes en moyenne. Photo par Jean Weber.</p>"+
            "<p>Avec sa couleur jaune et son bon goût sucré, la tomate ananas est une variété de tomates anciennes dont la chair très dense ressemble à une tranche d'ananas. Originaire des États-Unis, elle est très parfumée et contient peu de graines.</p>"+
            "<p>On aime la tomate ananas en salade ou en carpaccio, avec juste un filet d’huile d’olive extra vierge, du sel et du poivre.</p>",
        urlImage: "3_Ananas.jpg",
        avis:[]
    },            
    {
        id: 4,
        nom: "Tomate Noire de Crimée",
        description:
            "<p>La tomate Noire de Crimée est une variété vigoureuse offrant une abondance de fruits ronds, à la chair dense d'un rouge-brun qui fonce avec le soleil. Elle offre un goût très doux exempt d’acidité.</p>"+
            "<p>La variété est très peu sensible à la sécheresse.</p>",
        urlImage: "4_Noire_Crimée.jpg",
        avis:[]
    },                        
    {
        id: 5,
        nom: "Tomate Jaune",
        description:
            "La tomate jaune est une variété de tomate de couleur jaune. Elle est plus douce que la tomate rouge et a une saveur plus sucrée. Elle est souvent utilisée dans les salades et les sauces.",
        urlImage: "5_Jaune.jpg",
        avis:[]
    },
    {
        id: 6,
        nom: "Tomate Black Cherry",
        description:
            "La tomate Black cherry ou ´Cerise Noire´ est une variété productive et rustique, de mi-saison, peu sensible au mildiou. Les petits fruits pourpres à noirs, de 15 à 30 g, sont d´une saveur douce et sucrée. La tomate Black cherry cerise noire est ferme, résiste bien à l´éclatement. Idéale en apéritif en mélange avec d´autres variétés de tomates cerises ! Salade et autres.",
        urlImage: "6_Black_Cherry.jpg",
        avis:[]
    },
    {
        id: 7,
        nom: "Tomate Gourmandia",
        description:
            `La Gourmandia est une variété hybride appartenant à la catégorie Cœur de Bœuf et a la forme caractéristique de ce type de tomates.<br>
            Ses fruits sont riches en goût et dégagent un arôme unique.<br>
            Ils mûrissent de l’intérieur vers l’extérieur et le collet peut rester vert longtemps. La couleur verte disparaît quand le fruit est mûr.`,
        urlImage: "7_Gourmandia.jpg",
        avis:[]
    },
    {
        id: 8,
        nom: "Tomate Coeur de Boeuf",
        description:
            "",
        urlImage: "8_Coeur_De_Boeuf.jpg",
        avis:[]
    },
    {
        id: 9,
        nom: "Tomate Marmande",
        description:
            "",
        urlImage: "9_Marmande.jpg",
        avis:[]
    },
    {
        id: 10,
        nom: "Tomate Grappe F1",
        description:
            "",
        urlImage: "10_Grappe_F1.jpg",
        avis:[]
    },
    {
        id: 11,
        nom: "Tomate Poire Jaune",
        description:
            "",
        urlImage: "11_Poire_Jaune.jpg",
        avis:[]
    },
    {
        id: 12,
        nom: "Tomate Golden Pearl F1",
        description:
            "",
        urlImage: "12_Golden_Pearl_F1.jpg",
        avis:[]
    },
    {
        id: 13,
        nom: "Tomate Saint Pierre",
        description:
            "",
        urlImage: "13_Saint_Pierre.jpg",
        avis:[]
    },
    {
        id: 14,
        nom: "Tomate Grappe F1",
        description:
            "",
        urlImage: "10_Grappe_F1.jpg",
        avis:[]
    },
    {
        id: 15,
        nom: "Tomate Grappe F1",
        description:
            "",
        urlImage: "10_Grappe_F1.jpg",
        avis:[]
    },
    {
        id: 16,
        nom: "Tomate Grappe F1",
        description:
            "",
        urlImage: "10_Grappe_F1.jpg",
        avis:[]
    },
    {
        id: 17,
        nom: "Tomate Grappe F1",
        description:
            "",
        urlImage: "10_Grappe_F1.jpg",
        avis:[]
    },
    {
        id: 18,
        nom: "Tomate Grappe F1",
        description:
            "",
        urlImage: "10_Grappe_F1.jpg",
        avis:[]
    },
    {
        id: 19,
        nom: "Tomate Grappe F1",
        description:
            "",
        urlImage: "10_Grappe_F1.jpg",
        avis:[]
    },
    {
        id: 20,
        nom: "Tomate Grappe F1",
        description:
            "",
        urlImage: "10_Grappe_F1.jpg",
        avis:[]
    },
    {
        id: -1,
        nom: "",
        description:
            "",
        urlImage: "",
        avis:[]
    },
    {
        id:21,
        nom: "Tomate Indigo Rose",
        description:"",
        urlImage: "21_Indigo_Rose.jpg",
        avis:[]
    }
];


export function getTomatoInfo(id) {
    return tomatoDB.find(tomato => tomato.id === id);
}
