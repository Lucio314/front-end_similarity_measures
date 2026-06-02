import SimilarityMethod from './SimilarityMethod';
import { type JSX } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SIMILARITIES = [
    {
        nomMethode: "CED",
        descMethode: "Context-aware Edit Distance - Étend la distance d'édition en tenant compte du contexte sémantique. Mesure la similarité sémantique via une ontologie et l'écart de position.",
        specification: ["🌳 Ontologie requise", "📏 Longueurs différentes OK"],
        avantages: [
                    "Intelligente : comprend que deux activités différentes peuvent être proches sémantiquement",
                    "Gère bien les inversions d'activités et la redondance",
                    "Prend en compte la position et le contexte"
                    ],
        inconvenients: [
                        "Nécessite une structure (ontologie) déjà prête pour fonctionner",
                        "Plus complexe à paramétrer",
                        "Coût de calcul modéré"
                        ],
        proprietes: [
                    "Homogénéité sémantique",
                    "Temporalité des activités",
                    "Décalage temporel",
                    "Permutation d'activités",
                    "Redondance d'activités"
                    ],
        parametres: ["position_weight", "semantic_weight"]
    },
    {
        nomMethode: "FTH",
        descMethode: "Fuzzy Temporal Hamming - Extension floue de la distance de Hamming pour les séquences sémantiques-temporelles. Gère les distorsions temporelles via une fenêtre floue.",
        specification: ["🌳 Ontologie requise"],
        avantages: [
                    "Tolérante : ne pénalise pas les petits décalages (ex: café décalé de 5 minutes)",
                    "Combine intelligemment le sens (sémantique) et le moment (temporel)",
                    "Utilise Wu-Palmer pour la similarité sémantique"
                    ],
        inconvenients: [
                        "Limitée aux séquences de même durée totale",
                        "Nécessite une ontologie",
                        "Paramétrage de la fenêtre floue peut être délicat"
                        ],
        proprietes: [
                    "Similarité Wu-Palmer",
                    "Fenêtre temporelle floue",
                    "Temporalité et homogénéité sémantique"
                    ],
        parametres: ["fuzzy_window"]
    },
    {
        nomMethode: "FTH-T",
        descMethode: "FTH avec Troncature - On tronque la séquence la plus longue pour avoir la même longueur que la plus courte. On aligne et glisse les séquences pour trouver le meilleur match.",
        specification: ["🌳 Ontologie requise", "📏 Longueurs différentes OK"],
        avantages: [
                    "Gère les séquences de longueurs différentes",
                    "Combine FTH avec recherche d'alignement optimal",
                    "Trouve le meilleur sous-alignement possible"
                    ],
        inconvenients: [
                        "Plus lent car teste plusieurs alignements",
                        "Perte d'information par troncature",
                        "Résultats peuvent être difficiles à interpréter"
                        ],
        proprietes: [
                    "Alignement glissant",
                    "Troncature adaptative",
                    "Recherche exhaustive"
                    ],
        parametres: ["fuzzy_window", "alignment_strategy"]
    },
    {
        nomMethode: "RFTH",
        descMethode: "Relative Fuzzy Temporal Hamming - L'évolution ultime de la FTH. Permet de comparer deux séquences de durées différentes (ex: journée de 8h avec une de 10h).",
        specification: ["🌳 Ontologie requise", "📏 Longueurs différentes OK"],
        avantages: [
                    "La plus complète : gère les durées différentes, les décalages dans le temps et le sens des activités",
                    "Très robuste pour comparer des profils de vie variés",
                    "Normalisation des durées sur une échelle commune"
                    ],
        inconvenients: [
                        "Plus complexe à paramétrer",
                        "Nécessite une bonne compréhension des T-normes",
                        "Peut être sur-paramétré pour des cas simples"
                        ],
        proprietes: [
                    "Normalisation des durées",
                    "Utilisation de T-normes",
                    "Support complet sémantique et temporel"
                    ],
        parametres: ["lambda",  "fuzzy_window",  "semantic_measure"]
    },
    {
        nomMethode: "DTW",
        descMethode: "Dynamic Time Warping - Mesure la similarité entre deux séquences temporelles en permettant des décalages et des étirements dans le temps.",
        specification: [],
        avantages: [
                    "Gère bien les variations de vitesse entre séquences",
                    "Robuste aux décalages temporels",
                    "Très utilisé pour les séries temporelles",
                    "Adapté aux séquences de longueurs différentes"
                    ],
        inconvenients: [
                        "Peut être lent sur de grands datasets",
                        "Sensible au bruit",
                        "Ne comprend pas la sémantique nativement"
                        ],
        proprietes: [
                    "Flexibilité temporelle",
                    "Longueurs différentes supportées",
                    "Complexité O(n×m)"
                    ],
        parametres: ["warping_window"]
    },
    {
        nomMethode: "HD",
        descMethode: "Hamming Distance - La méthode la plus basique : compare les éléments deux à deux à la même position. Si différent, compte un point de distance.",
        specification: ["📏 Longueurs différentes OK"],
        avantages: [
                    "Très simple à comprendre",
                    "Calcul ultra-rapide (efficace informatiquement)",
                    "Idéale pour grandes bases de données",
                    "Adapté aux séquences de longueurs différentes"
                    ],
        inconvenients: [
                        "Rigide : les deux séquences doivent avoir exactement la même longueur",
                        "Aveugle : ne comprend pas le sens des mots (ex: \"Travail\" et \"Bureau\" vus comme 100% différents)",
                        "Ne gère pas les décalages temporels"
                        ],
        proprietes: [
                    "Comparaison point par point",
                    "Nécessite discrétisation du temps",
                    "Complexité O(n)"
                    ],
        parametres: []
    },
    {
        nomMethode: "DHD",
        descMethode: "Dynamic Hamming Distance - Version qui s'intéresse aux changements. Regarde la probabilité de passer d'une activité à une autre (ex: \"Sommeil\" → \"Petit-déjeuner\").",
        specification: [],
        avantages: [
                    "Excellente pour repérer des anomalies dans un comportement",
                    "Prend en compte l'ordre logique des événements",
                    "Basée sur les transitions réelles du dataset"
                    ],
        inconvenients: [
                        "Sensible : si une activité est décalée, la DHD peut donner une distance élevée",
                        "Modèle sans mémoire à long terme",
                        "Nécessite des statistiques de transitions"
                        ],
        proprietes: [
                    "Dépendante du contexte et du temps",
                    "Basée sur les transitions",
                    "Détection d'anomalies"
                    ],
        parametres: ["transition_threshold"]
    }
]

function SimilarityMethods({}){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };



    const listeMethodesPrincipales : Array<JSX.Element> = []
    for(let methode of SIMILARITIES){
        let handleClick = () => {
            const divHidden = document.getElementById(methode.nomMethode)
            if(divHidden.hidden){
                divHidden.hidden = false
                for(let i=0; i<SIMILARITIES.length; i++){
                if(SIMILARITIES[i].nomMethode !== methode.nomMethode){
                    document.getElementById(SIMILARITIES[i].nomMethode).hidden = true
                }
                }
            }else{
                divHidden.hidden = true
            }
        }


        listeMethodesPrincipales.push(
        <SimilarityMethod
            nomMethode={methode.nomMethode}
            descMethode={methode.descMethode}
            specification={methode.specification}
            avantages={methode.avantages}
            inconvenients={methode.inconvenients}
            proprietes={methode.proprietes}
            parametres={methode.parametres}
            onClick={handleClick}
        />
        )
    }

    // @ts-ignore
    const SliderComponent = !!Slider.default ? Slider.default : Slider
    //Un peu la galère ça, mais ça évite une erreur

    return (
        <div className="slider-container">
            <SliderComponent {...settings}>
                {listeMethodesPrincipales}
            </SliderComponent>
        </div>
    )

    // npm install react-slick --save
    // npm install slick-carousel --save
    // Pour l'affichage en slider
    // Doit afficher CED, FTH, FTH-T, RFTHz
}

export default SimilarityMethods