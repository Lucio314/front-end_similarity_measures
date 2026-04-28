import React from 'react';
import MatriceWuPalmer from './MatriceWuPalmer';

function WuPalmer({}){
  return (
    <div>
      <h2>📐 Mesure de Similarité Sémantique</h2>
      <div id="methode-wupalmer">
        <h3>Méthode : Wu-Palmer (par défaut)</h3>
        <p>
            La similarité de Wu-Palmer mesure la proximité sémantique entre deux concepts 
            en utilisant la profondeur de leur ancêtre commun le plus proche dans l'ontologie.
        </p>
        <div id="formule-wupalmer">
          <p><strong>Formule mathématique :</strong></p>
          <div>
            sim<sub>WP</sub>
            (c<sub>1</sub>, c<sub>2</sub>) = 
            (2 × depth(LCA)) /
            (depth(c<sub>1</sub>) +
            depth(c<sub>2</sub>))
          </div>
          <p>Où LCA (Lowest Common Ancestor) est l'ancêtre commun le plus profond dans l'arbre de l'ontologie.</p>
        </div>
        <div id="principe-fonctionnement">
          <h4>🔍 Principe de fonctionnement :</h4>
          <ul>
            <li>
              <span>1.</span>
              <span>On cherche l'ancêtre commun le plus proche de deux activités dans l'arbre</span>
            </li>
            <li>
              <span>2.</span>
              <span>Plus cet ancêtre est profond dans l'arbre, plus les activités sont similaires</span>
            </li>
            <li>
              <span>3.</span>
              <span>La similarité est normalisée entre 0 (très différent) et 1 (identique)</span>
            </li>
          </ul>
        </div>
        <h5>📊 Matrice de similarité entre toutes les activités :</h5>
        <MatriceWuPalmer activities={activities}/>
      </div>
      <div id="interpretation-wupalmer">
        <p><strong>Exemple d'interprétation :</strong></p>
        <ul>
          <li>
            "marcher" et "vélo" ont une similarité élevée (~0.67) car ils partagent "human_power"
          </li>
          <li>
            "marcher" et "bus" ont une similarité plus faible (~0.5) car ils sont sous "moving" mais dans des branches différentes
          </li>
          <li>
            "travail" et "sport" ont une faible similarité car ils sont sous "stop" mais dans des branches différentes
          </li>
        </ul>
      </div>
    </div>
    )
}

export default WuPalmer