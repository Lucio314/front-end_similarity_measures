import { useState } from "react";
import FileUploader from "./donnees/FileUploader";
import ExampleData from "./donnees/ExampleData";
import FormatInfo from "./donnees/FormaInfo";

interface DataPageProps {
  onNext: () => void;
}

function DataPage({ onNext }: DataPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [exampleLoaded, setExampleLoaded] = useState<boolean>(false);

  const canProceed = files.length > 0 || exampleLoaded;

  const handleNextPage = () => {
    const divDataPage = document.getElementById("data-card")
    const divStatsPage = document.getElementById("stats-card")
    /*const divResultsPage = document.getElementById("results-card")*/
    /*const divPatternPage = document.getElementById("pattern-card")*/
    divDataPage.hidden = true
    divStatsPage.hidden = false
    /*divResultsPage.hidden = false*/
    /*divPatternPage.hidden = false*/
    onNext
  }

  return (
    <div id="data-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">Chargement des Données</h2>
          <p className="text-muted mb-0">
            Choisissez comment vous souhaitez charger vos datasets de séquences
          </p>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <FileUploader files={files} onFilesChange={setFiles} />
          </div>
          <div className="col-md-6">
            <ExampleData onLoad={() => setExampleLoaded(true)} />
          </div>
        </div>

        <FormatInfo />

        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn-next px-5 py-2 text-white"
            style={{
              backgroundColor: canProceed ? "#4f46e5" : "#a5b4fc",
              borderColor: canProceed ? "#4f46e5" : "#a5b4fc",
              cursor: canProceed ? "pointer" : "not-allowed",
            }}
            disabled={!canProceed}
            onClick={handleNextPage}
          >
            Suivant : Statistiques →
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataPage;
