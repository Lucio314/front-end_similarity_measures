import React from "react";
import Checkbox from "../component/Checkbox";
import FileUploader from "./FileUploader";
import ExempleDataset from "./ExempleDataset";
import IconDocument from "../component/Icons/IconDocument";
import { useState } from "react";

function Donnees(){
    const [isOption1Checked, setIsOption1Checked] = useState(true)
    const [isOption2Checked, setIsOption2Checked] = useState(true)
    const paragrapheRelou = "[{\"activities\": [{\"type\": \"marcher\", \"duration\": 30, \"isMissing\": false}]}]"

    return(
        <div id="data-part" className="part">
            <div className="part-main-body">
                <div className="part-body">
                    <h2 className="h2-title">Chargement des Données</h2>
                    <p className="h2-title-p">Choisissez comment vous souhaitez charger vos datasets de séquences</p>
                    <div className="data-body">
                        <div className="div-options-generation">
                            <h4 className="h4-title">Options de génération :</h4>
                            <div className="options-generation">
                                <Checkbox
                                    id="option-generation-1"
                                    checked={isOption1Checked}
                                    onChange={setIsOption1Checked}
                                    label="Inclure des données manquantes (trous) dans les séquences"
                                />
                                <Checkbox
                                    id="option-generation-2"
                                    checked={isOption2Checked}
                                    onChange={setIsOption2Checked}
                                    label="Inclure un dataset de météo pour la recherche multidimensionnelle"
                                />
                            </div>
                        </div>
                        <div className="div-datasets">
                            <FileUploader/>
                            <ExempleDataset/>
                        </div>
                        <div className="div-format-attendu">
                            <div className="format-attendu">
                                <IconDocument/>
                                <div className="format-attendu-text">
                                    <p className="paragraph">
                                        <strong>Format attendu :</strong>
                                        Chaque fichier doit contenir une liste de séquences.
                                    </p>
                                    <p className="paragraph">
                                        Exemple : {paragrapheRelou}
                                    </p>
                                    <p className="paragraph">
                                        Vous pouvez charger plusieurs fichiers (ex: mobilité + météo) pour créer des datasets croisés.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Donnees;