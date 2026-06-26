import { useState, useEffect } from 'react';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { computeSimilarity, getOntology, getDatasetStats } from '../api';
import type { SimilarityResponse, Method } from '../api';
import { dfsLeaves, buildOntologyColorMap } from '../types';
import type { OntologyProps, PatternActivitiesProps, SearchConfig, ResultsPatternProps, ResultsOneResultProps } from '../types';
import { useAppContext } from '../context/AppContext';
import RangeActivities from './motif/RangeActivities';
import PatternCreation from './motif/PatternCreation';
import SequenceOverview from './motif/SequenceOverview';
import PlusIcon from '../components/icons/PlusIcon';
import SearchedPattern from "./resultats/SearchedPattern";
import ResultsInformations from "./resultats/ResultsInformations";
import ResultsSequences from "./resultats/ResultsSequences";

interface PatternItem {
    activity: string;
    duration: number;
}

interface ResultsPageProps {
    onBackParameter: () => void;
    onBackPattern: () => void;
    selectedMethod: Method | null;
    searchConfig: SearchConfig | null;
}

function mergePattern(items: PatternItem[]): PatternItem[] {
    if (items.length === 0) return [];
    const merged: PatternItem[] = [{ ...items[0] }];
    for (let i = 1; i < items.length; i++) {
        if (items[i].activity === merged[merged.length - 1].activity) {
            merged[merged.length - 1].duration += items[i].duration;
        } else {
            merged.push({ ...items[i] });
        }
    }
    return merged;
}

function adaptResponse(r: SimilarityResponse): { pattern: ResultsPatternProps; results: ResultsOneResultProps[] } {
    return {
        pattern: {
            label: r.pattern.label,
            length: r.pattern.length,
            total_durations: r.pattern.total_duration,
            activities: r.pattern.activities,
        },
        results: r.results.map(res => ({
            rank: res.rank,
            score: res.score,
            sequence: {
                id: String(res.sequence.id),
                label: res.sequence.label,
                length: res.sequence.length,
                total_durations: res.sequence.total_duration,
                activities: res.sequence.activities,
            },
        })),
    };
}

function ResultsPage({ onBackParameter, onBackPattern, selectedMethod, searchConfig }: ResultsPageProps) {
    const { datasetId } = useAppContext();

    // Pattern builder state (same as old PatternPage)
    const [pattern, setPattern]             = useState<PatternActivitiesProps[]>([]);
    const [totalDuration, setTotalDuration] = useState(0);
    const [activityNames, setActivityNames] = useState<string[]>([]);
    const [colorMap, setColorMap]           = useState<Record<string, string>>({});
    const [loadingActivities, setLoadingActivities] = useState(true);

    // Search state
    const [loading, setLoading]   = useState(false);
    const [response, setResponse] = useState<SimilarityResponse | null>(null);
    const [error, setError]       = useState<string | null>(null);
    const [launched, setLaunched] = useState(false);

    useEffect(() => {
        if (!datasetId) { setLoadingActivities(false); return; }

        Promise.all([getDatasetStats(datasetId), getOntology()])
            .then(([stats, ontology]) => {
                const datasetNames = new Set(stats.activities.distribution.map((a: {name: string}) => a.name));
                const dfsOrder = dfsLeaves(ontology as unknown as OntologyProps)
                    .filter(n => datasetNames.has(n) && n !== 'missing');
                const extra = stats.activities.distribution
                    .map((a: {name: string}) => a.name)
                    .filter((n: string) => n !== 'missing' && !dfsOrder.includes(n));
                setActivityNames([...dfsOrder, ...extra]);
                setColorMap(buildOntologyColorMap(ontology as unknown as OntologyProps));
            })
            .catch(() => {
                if (datasetId) {
                    getDatasetStats(datasetId).then((stats: { activities: { distribution: { name: string }[] } }) => {
                        setActivityNames(stats.activities.distribution.map((a: {name: string}) => a.name).filter((n: string) => n !== 'missing'));
                    }).catch(() => {});
                }
            })
            .finally(() => setLoadingActivities(false));
    }, [datasetId]);

    const getPosById = (id: string) => pattern.findIndex(a => a.id === id);

    const handleDragEnd = (event: { active: { id: string }; over: { id: string } | null }) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        setPattern(p => arrayMove(p, getPosById(String(active.id)), getPosById(String(over.id))));
    };

    const canLaunch = pattern.length > 0 && !!datasetId && !!selectedMethod && !!searchConfig;

    const handleLaunch = async () => {
        if (!canLaunch) return;
        const items = pattern.map(p => ({ activity: p.name, duration: p.duration }));
        const merged = mergePattern(items);
        setLoading(true);
        setError(null);
        setLaunched(true);
        try {
            const res = await computeSimilarity({
                dataset_id: datasetId!,
                pattern: {
                    individuals: merged.map(i => i.activity),
                    durations: merged.map(i => i.duration),
                },
                method: selectedMethod!.name as 'RFTH' | 'FTH' | 'CED',
                params: searchConfig!.params,
                top_k: searchConfig!.top_k,
                threshold: searchConfig!.threshold,
            });
            setResponse(res);
        } catch (e: unknown) {
            const err = e as { response?: { data?: { detail?: string } } };
            setError(err?.response?.data?.detail ?? 'Erreur lors du calcul de similarite.');
        } finally {
            setLoading(false);
        }
    };

    const adapted = response ? adaptResponse(response) : null;

    return (
        <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">Resultats de la recherche</h2>
                    <p className="text-muted mb-0">
                        Construisez votre motif puis lancez la recherche
                        {selectedMethod && <> — methode <strong>{selectedMethod.label}</strong></>}
                    </p>
                </div>

                {/* Pattern builder — reprise de l'ancienne PatternPage */}
                <div className="row g-3 mb-4">
                    {loadingActivities ? (
                        <div className="text-center py-3">
                            <div className="spinner-border spinner-border-sm text-primary" role="status" />
                            <span className="ms-2 text-muted" style={{ fontSize: 13 }}>Chargement des activites...</span>
                        </div>
                    ) : (
                        <RangeActivities
                            activityNames={activityNames}
                            colorMap={colorMap}
                            pattern={pattern}
                            setPattern={setPattern}
                            dureeMotif={totalDuration}
                            setDureeMotif={setTotalDuration}
                        />
                    )}

                    <div className="border rounded p-3" style={{ borderColor: '#e9eaee', backgroundColor: '#e9eaee' }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="mb-0" style={{ fontSize: 15, color: '#272727' }}>Votre motif</h5>
                            {pattern.length > 0 && (
                                <span className="text-muted" style={{ fontSize: 13 }}>
                                    Duree totale : <strong>{totalDuration} min</strong>
                                </span>
                            )}
                        </div>

                        {pattern.length === 0 && (
                            <div className="text-center py-3 text-muted">
                                <PlusIcon />
                                <p className="mb-0">Aucune activite ajoutee</p>
                                <p style={{ fontSize: 13 }}>Cliquez sur les activites ci-dessus pour construire votre motif</p>
                            </div>
                        )}

                        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                            <PatternCreation
                                dureeMotif={totalDuration}
                                setDureeMotif={setTotalDuration}
                                pattern={pattern}
                                setPattern={setPattern}
                                colorMap={colorMap}
                            />
                        </DndContext>
                    </div>

                    {pattern.length > 0 && (
                        <SequenceOverview pattern={pattern} colorMap={colorMap} />
                    )}
                </div>

                {/* Avertissement config manquante */}
                {(!datasetId || !selectedMethod || !searchConfig) && (
                    <p className="text-warning mb-2" style={{ fontSize: 12 }}>
                        Dataset ou configuration manquante — revenez aux etapes precedentes.
                    </p>
                )}

                {/* Bouton lancer */}
                <div className="d-flex justify-content-center mb-4">
                    <button
                        className="btn px-5 py-2 text-white"
                        style={{
                            backgroundColor: canLaunch && !loading ? '#4f46e5' : '#a5b4fc',
                            cursor: canLaunch && !loading ? 'pointer' : 'not-allowed',
                            fontSize: 15,
                        }}
                        disabled={!canLaunch || loading}
                        onClick={handleLaunch}
                    >
                        {loading ? 'Calcul en cours...' : 'Lancer la recherche TOP-K'}
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status" />
                        <p className="mt-2 text-muted">Calcul des similarites...</p>
                    </div>
                )}

                {/* Erreur */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Resultats */}
                {adapted && !loading && (
                    <>
                        <hr className="my-4" />
                        <div className="text-center mb-3">
                            <h5 className="fw-bold">
                                Top {response!.meta.count} sequences les plus similaires
                            </h5>
                        </div>
                        <SearchedPattern pattern={adapted.pattern} method={response!.meta.method} />
                        <ResultsInformations summary={response!.summary} />
                        <ResultsSequences results={adapted.results} />
                    </>
                )}

                {launched && !loading && !adapted && !error && (
                    <div className="text-center text-muted py-3">Aucun resultat avec ces parametres.</div>
                )}

                {/* Navigation */}
                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                        className="btn-return px-5 py-2 text-black"
                        onClick={onBackPattern}
                        style={{ backgroundColor: "#858494", cursor: "pointer" }}
                    >
                        Nouvelle recherche
                    </button>
                    <button
                        className="btn-next px-5 py-2 text-white"
                        onClick={onBackParameter}
                        style={{ backgroundColor: "#4f46e5", cursor: "pointer" }}
                    >
                        Ajuster les parametres
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultsPage;
