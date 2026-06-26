import RFTHParameter from './parametre/RFTHParameter';
import { useState } from 'react';
import SlidersParameter from './parametre/SlidersParameter';
import ConfigurationsParameter from './parametre/ConfigurationsParameter';
import MultidimParameter from './parametre/MultidimParameter';
import type { ListParametersProps, SearchConfig } from '../types';
import type { Method } from '../api';
import SlidersIcon from '../components/icons/SlidersIcon';

interface ParameterPageProps {
    onNext: () => void;
    onBack: () => void;
    selectedMethod: Method | null;
    onParamsChange: (config: SearchConfig) => void;
}

function ParameterPage({ onNext, onBack, selectedMethod, onParamsChange }: ParameterPageProps) {
    const nomMethode = selectedMethod?.name ?? '';

    // Paramètres requête
    const [valueSliderK, setValueSliderK] = useState<number>(5);
    const [valueSliderSimilarite, setValueSliderSimilarite] = useState<number>(0.0);

    // Paramètres RFTH & FTH
    const [valueSliderTimeWindow, setValueSliderTimeWindow] = useState<number>(60);
    const [valueSliderDurationThreshold, setValueSliderDurationThreshold] = useState<number>(120);
    const [valueSelectAgg, setValueSelectAgg] = useState<number>(0); // 0="max", 1="min"

    // Paramètre CED
    const [valueSliderBeta, setValueSliderBeta] = useState<number>(0.5);

    // Pondération multidim (cachée pour l'instant)
    const [valueSliderMobilite, setValueSliderMobilite] = useState<number>(0.0);
    const [valueSliderMeteo, setValueSliderMeteo] = useState<number>(0.0);

    const listeParametres: Array<ListParametersProps> = [
        { nomParam: "K",                  getter: valueSliderK,                 setter: setValueSliderK },
        { nomParam: "Similarite",         getter: valueSliderSimilarite,        setter: setValueSliderSimilarite },
        { nomParam: "time_window",        getter: valueSliderTimeWindow,        setter: setValueSliderTimeWindow },
        { nomParam: "duration_threshold", getter: valueSliderDurationThreshold, setter: setValueSliderDurationThreshold },
        { nomParam: "agg",                getter: valueSelectAgg,               setter: setValueSelectAgg },
        { nomParam: "beta",               getter: valueSliderBeta,              setter: setValueSliderBeta },
    ];

    const buildParams = (): Record<string, number | string> => {
        if (nomMethode === 'RFTH') {
            return {
                interval_step: 1,
                time_window: valueSliderTimeWindow,
                agg: valueSelectAgg === 0 ? 'max' : 'min',
                duration_threshold: valueSliderDurationThreshold,
            };
        }
        if (nomMethode === 'FTH') {
            return {
                interval_step: 1,
                time_window: valueSliderTimeWindow,
                agg: valueSelectAgg === 0 ? 'max' : 'min',
            };
        }
        if (nomMethode === 'CED') {
            return { beta: valueSliderBeta };
        }
        return {};
    };

    const handleNext = () => {
        onParamsChange({
            params: buildParams(),
            top_k: valueSliderK,
            threshold: valueSliderSimilarite,
        });
        onNext();
    };

    return (
        <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">Configuration des Paramètres</h2>
                    <p className="text-muted mb-0">
                        Ajustez finement les paramètres de la méthode
                        <strong>{selectedMethod ? ` ${selectedMethod.label}` : ''}</strong>
                    </p>
                </div>

                <RFTHParameter RFTHIsSelected={nomMethode === 'RFTH'} />

                <div className="border rounded mt-4 p-3">
                    <h3 className="fw-bold mb-1">
                        <SlidersIcon />
                        Paramètres réglables
                    </h3>
                    <SlidersParameter
                        listeParametres={listeParametres}
                        nomMethode={nomMethode}
                    />
                </div>

                <div className="param-multidim" hidden>
                    <h3 className="fw-bold mb-1">Pondération Multidimensionnelle</h3>
                    <p className="text-muted mb-0">Ajustez l'importance relative de chaque dimension dans le calcul de similarité</p>
                    <MultidimParameter
                        valueSliderMobilite={valueSliderMobilite}
                        valueSliderMeteo={valueSliderMeteo}
                        onValueSliderMobilitieChange={setValueSliderMobilite}
                        onValueSliderMeteoChange={setValueSliderMeteo}
                    />
                </div>

                <div className="border rounded mt-4 p-3">
                    <ConfigurationsParameter
                        listeParametres={listeParametres}
                        nomMethode={nomMethode}
                    />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                        className="btn-return px-5 py-2 text-black"
                        onClick={onBack}
                        style={{ backgroundColor: "#858494", cursor: "pointer" }}
                    >
                        Retour
                    </button>
                    <button
                        className="btn-next px-5 py-2 text-white"
                        onClick={handleNext}
                        style={{ backgroundColor: "#4f46e5", cursor: "pointer" }}
                    >
                        Construire le motif →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ParameterPage