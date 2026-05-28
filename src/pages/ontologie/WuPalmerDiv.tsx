import WuPalmerMatrix from './WuPalmerMatrix';

interface WuPalmerDivProps{
    matrice: Array<Array<number>>;
    activites: Array<string>;
}

function WuPalmerDiv({matrice, activites} : WuPalmerDivProps){
  return (
    <div className="border rounded mt-4 p-3">
      <h2 className="fw-bold mb-1">📐 Mesure de Similarité Sémantique</h2>
      <div id="methode-wupalmer">
        <h3 className="fw-bold mb-1">Méthode : Wu-Palmer (par défaut)</h3>
        <p className="text-muted mb-0">
            La similarité de Wu-Palmer mesure la proximité sémantique entre deux concepts 
            en utilisant la profondeur de leur ancêtre commun le plus proche dans l'ontologie.
        </p>
        <div id="formule-wupalmer" className=" border rounded mt-2 p-3">
          <p className="text-muted mb-0"><strong>Formule mathématique :</strong></p>
          <div>
            sim<sub>WP</sub>
            (c<sub>1</sub>, c<sub>2</sub>) = 
            (2 × depth(LCA)) /
            (depth(c<sub>1</sub>) +
            depth(c<sub>2</sub>))
          </div>
          <p className="text-muted mb-0">Où LCA (Lowest Common Ancestor) est l'ancêtre commun le plus profond dans l'arbre de l'ontologie.</p>
        </div>
        <div id="principe-fonctionnement" className="border rounded mt-2 p-3">
          <h4 className="fw-bold mb-1">🔍 Principe de fonctionnement :</h4>
          <ul className="">
            <li className="">
              <span className="">1.</span>
              <span className="">On cherche l'ancêtre commun le plus proche de deux activités dans l'arbre</span>
            </li>
            <li className="">
              <span className="">2.</span>
              <span className="">Plus cet ancêtre est profond dans l'arbre, plus les activités sont similaires</span>
            </li>
            <li className="">
              <span className="">3.</span>
              <span className="">La similarité est normalisée entre 0 (très différent) et 1 (identique)</span>
            </li>
          </ul>
        </div>
        <div className="border rounded mt-4 p-3">
          <h5 className="fw-bold mb-1">📊 Matrice de similarité entre toutes les activités :</h5>
          <WuPalmerMatrix matrice={matrice} activites={activites}/>
        </div>
      </div>
      <div id="interpretation-wupalmer" className="border rounded mt-4 p-3">
        <p className="text-muted mb-0"><strong>Exemple d'interprétation :</strong></p>
        <ul className="">
          <li className="">
            "marcher" et "vélo" ont une similarité élevée (~0.67) car ils partagent "human_power"
          </li>
          <li className="">
            "marcher" et "bus" ont une similarité plus faible (~0.5) car ils sont sous "moving" mais dans des branches différentes
          </li>
          <li className="">
            "travail" et "sport" ont une faible similarité car ils sont sous "stop" mais dans des branches différentes
          </li>
        </ul>
      </div>
    </div>
    )
}

export default WuPalmerDiv