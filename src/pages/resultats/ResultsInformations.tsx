import ClockIcon from "../../components/icons/ClockIcon"
import LengthIcon from "../../components/icons/LengthIcon"
import TrophyIcon from "../../components/icons/TrophyIcon"
import type { ResultsSummaryProps } from "../../types";

interface ResultsInformationsProps{
    summary: ResultsSummaryProps;
}

function ResultsInformations({summary} : ResultsInformationsProps){
    return ( 
        <div className="container">
            <div className="row">
                <div 
                    className="col border rounded"
                    style={{
                        borderColor: '#9c86ec',
                        backgroundColor: '#fafafa'
                    }}
                >
                    <div className="d-flex">
                        <div className="align-self-center">
                            <TrophyIcon/>
                        </div>
                        <div className="">
                            <p className="">
                                {summary.total_results}
                            </p>
                            <p className="">
                                Résultats trouvés
                            </p>
                        </div>
                    </div>
                </div>
                <div 
                    className="col border rounded"
                    style={{
                        borderColor: '#9c86ec',
                        backgroundColor: '#fafafa'
                    }}
                >
                    <div className="d-flex">
                        <div className="align-self-center">
                            <LengthIcon/>
                        </div>
                        <div className="">
                            <p className="">
                                {summary.best_score}%
                            </p>
                            <p className="">
                                Meilleure similarité
                            </p>
                        </div>
                    </div>
                </div>
                <div 
                    className="col border rounded"
                    style={{
                        borderColor: '#9c86ec',
                        backgroundColor: '#fafafa'
                    }}
                >
                    <div className="d-flex">
                        <div className="align-self-center">
                            <ClockIcon/>
                        </div>
                        <div className="">
                            <p className="">
                                {summary.avg_duration} min
                            </p>
                            <p className="">
                                Durée moyenne
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//Faire le css

export default ResultsInformations