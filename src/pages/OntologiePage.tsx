import { useEffect, useState } from "react";
import { getOntology, getWuPalmerMatrix, getMethods } from "../api";
import type { OntologyNode, WuPalmerMatrix, Method } from "../api";
import { useAppContext } from "../context/AppContext";

interface OntologiePageProps {
  onNext: () => void;
}

// ── Couleurs par profondeur ────────────────────────────────────────────────────

const DEPTH_COLORS = [
  { color: "#4f46e5", label: "Racine" },
  { color: "#7c3aed", label: "Niveau 1" },
  { color: "#0891b2", label: "Niveau 2" },
  { color: "#059669", label: "Feuilles (activités)" },
];

// ── Nœud récursif ─────────────────────────────────────────────────────────────

interface TreeNodeProps {
  node: OntologyNode;
  depth?: number;
}

function TreeNode({ node, depth = 0 }: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  const [open, setOpen] = useState(depth < 2);

  const color = DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)].color;

  return (
    <div style={{ marginLeft: depth === 0 ? 0 : 20 }}>
      <div
        className="d-flex align-items-center gap-2 py-1 px-2 rounded"
        style={{ cursor: hasChildren ? "pointer" : "default", userSelect: "none", transition: "background 0.15s" }}
        onMouseEnter={e => { if (hasChildren) (e.currentTarget as HTMLElement).style.background = "#f1f5f9"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        onClick={() => hasChildren && setOpen(o => !o)}
      >
        <span style={{ width: 16, textAlign: "center", color, fontSize: 12 }}>
          {hasChildren ? (open ? "▼" : "▶") : "●"}
        </span>
        <span style={{ display: "inline-block", width: 4, height: 18, borderRadius: 2, backgroundColor: color, flexShrink: 0 }} />
        <span
          className="text-capitalize"
          style={{ fontSize: depth === 0 ? 16 : depth === 1 ? 14 : 13, fontWeight: depth <= 1 ? 600 : 400, color: depth === 0 ? "#1e293b" : "#334155" }}
        >
          {node.name}
        </span>
        {hasChildren && (
          <span className="badge rounded-pill ms-auto" style={{ backgroundColor: "#e0e7ff", color: "#4f46e5", fontSize: 11 }}>
            {node.children!.length}
          </span>
        )}
      </div>

      {hasChildren && open && (
        <div style={{ borderLeft: `2px solid ${color}33`, marginLeft: 18, paddingLeft: 4 }}>
          {node.children!.map((child, i) => (
            <TreeNode key={`${child.name}-${i}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Légende ────────────────────────────────────────────────────────────────────

function TreeLegend() {
  return (
    <div className="d-flex flex-wrap gap-3 mt-3 pt-3" style={{ borderTop: "1px solid #e2e8f0" }}>
      {DEPTH_COLORS.map(({ color, label }) => (
        <div key={label} className="d-flex align-items-center gap-2">
          <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 3, backgroundColor: color }} />
          <span style={{ fontSize: 12, color: "#64748b" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Heatmap de la matrice Wu-Palmer ───────────────────────────────────────────

function heatmapColor(value: number): string {
  // 0 = blanc, 1 = indigo foncé
  const r = Math.round(255 - value * (255 - 79));
  const g = Math.round(255 - value * (255 - 70));
  const b = Math.round(255 - value * (255 - 229));
  return `rgb(${r},${g},${b})`;
}

function textColor(value: number): string {
  return value > 0.55 ? "#fff" : "#1e293b";
}

interface WuPalmerMatrixViewProps {
  matrix: WuPalmerMatrix;
}

function WuPalmerMatrixView({ matrix }: WuPalmerMatrixViewProps) {
  const { labels, matrix: data } = matrix;
  const cellSize = Math.max(36, Math.min(56, Math.floor(560 / labels.length)));

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr>
            {/* coin vide */}
            <th style={{ minWidth: 80, padding: "4px 8px", textAlign: "right", color: "#94a3b8", fontWeight: 400 }}></th>
            {labels.map(l => (
              <th
                key={l}
                style={{ minWidth: cellSize, padding: "4px 2px", textAlign: "center", fontWeight: 600, color: "#475569", textTransform: "capitalize" }}
              >
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={labels[i]}>
              <td style={{ padding: "2px 8px", textAlign: "right", fontWeight: 600, color: "#475569", textTransform: "capitalize", whiteSpace: "nowrap" }}>
                {labels[i]}
              </td>
              {row.map((val, j) => (
                <td
                  key={j}
                  title={`${labels[i]} ↔ ${labels[j]} : ${val.toFixed(3)}`}
                  style={{
                    backgroundColor: heatmapColor(val),
                    color: textColor(val),
                    textAlign: "center",
                    padding: "4px 2px",
                    fontWeight: i === j ? 700 : 400,
                    minWidth: cellSize,
                    border: "1px solid #f1f5f9",
                    fontSize: 10,
                  }}
                >
                  {val.toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Légende dégradé */}
      <div className="d-flex align-items-center gap-2 mt-2">
        <span style={{ fontSize: 11, color: "#94a3b8" }}>0</span>
        <div style={{ flex: 1, height: 8, borderRadius: 4, background: "linear-gradient(to right, #ffffff, #4f46e5)", border: "1px solid #e2e8f0" }} />
        <span style={{ fontSize: 11, color: "#94a3b8" }}>1</span>
        <span style={{ fontSize: 11, color: "#64748b", marginLeft: 8 }}>Similarité Wu-Palmer</span>
      </div>
    </div>
  );
}

// ── Helpers arbre ──────────────────────────────────────────────────────────────

function countNodes(node: OntologyNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return 1 + node.children.reduce((sum, c) => sum + countNodes(c), 0);
}

function countLeaves(node: OntologyNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, c) => sum + countLeaves(c), 0);
}

function treeDepth(node: OntologyNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return 1 + Math.max(...node.children.map(treeDepth));
}

// ── Page principale ────────────────────────────────────────────────────────────

function OntologiePage({ onNext }: OntologiePageProps) {
  const { datasetId } = useAppContext();

  const [tree, setTree] = useState<OntologyNode | null>(null);
  const [treeLoading, setTreeLoading] = useState(true);
  const [treeError, setTreeError] = useState<string | null>(null);

  const [wupalmer, setWupalmer] = useState<WuPalmerMatrix | null>(null);
  const [wupalmerLoading, setWupalmerLoading] = useState(true);
  const [wupalmerError, setWupalmerError] = useState<string | null>(null);

  const [semanticMeasure, setSemanticMeasure] = useState<Method["semantic_measure"] | null>(null);

  useEffect(() => {
    getOntology()
      .then(setTree)
      .catch(() => setTreeError("Impossible de charger l'ontologie."))
      .finally(() => setTreeLoading(false));
  }, []);

  useEffect(() => {
    if (!datasetId) {
      setWupalmerError("Aucun dataset chargé.");
      setWupalmerLoading(false);
      return;
    }
    getWuPalmerMatrix(datasetId)
      .then(setWupalmer)
      .catch(() => setWupalmerError("Impossible de charger la matrice Wu-Palmer."))
      .finally(() => setWupalmerLoading(false));
  }, [datasetId]);

  useEffect(() => {
    getMethods()
      .then(methods => {
        const found = methods.find(m => m.semantic_measure != null);
        setSemanticMeasure(found?.semantic_measure ?? null);
      })
      .catch(() => {/* silencieux — la formule reste absente */});
  }, []);

  if (treeLoading) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="card-body p-5 text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Chargement de l'ontologie…</p>
        </div>
      </div>
    );
  }

  if (treeError || !tree) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="card-body p-5 text-center">
          <p className="text-danger">{treeError ?? "Erreur inconnue."}</p>
        </div>
      </div>
    );
  }

  const totalNodes = countNodes(tree);
  const totalLeaves = countLeaves(tree);
  const depth = treeDepth(tree);

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5">

        {/* Titre */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">🌳 Ontologie des Activités</h2>
          <p className="text-muted mb-0">Hiérarchie sémantique utilisée pour le calcul de similarité</p>
        </div>

        {/* KPI */}
        <div className="row g-3 mb-4">
          <div className="col-4">
            <div className="rounded p-3 text-white text-center" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
              <div className="fw-bold" style={{ fontSize: 32 }}>{totalNodes}</div>
              <div style={{ fontSize: 12 }}>Nœuds totaux</div>
            </div>
          </div>
          <div className="col-4">
            <div className="rounded p-3 text-white text-center" style={{ background: "linear-gradient(135deg, #0891b2, #0e7490)" }}>
              <div className="fw-bold" style={{ fontSize: 32 }}>{totalLeaves}</div>
              <div style={{ fontSize: 12 }}>Activités (feuilles)</div>
            </div>
          </div>
          <div className="col-4">
            <div className="rounded p-3 text-white text-center" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
              <div className="fw-bold" style={{ fontSize: 32 }}>{depth}</div>
              <div style={{ fontSize: 12 }}>Profondeur max</div>
            </div>
          </div>
        </div>

        {/* Arbre + légende en bas */}
        <div className="border rounded p-4 mb-4" style={{ backgroundColor: "#fafafa" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-semibold mb-0">Arbre hiérarchique</h6>
            <span className="text-muted" style={{ fontSize: 12 }}>Cliquez sur un nœud pour l'ouvrir / fermer</span>
          </div>
          <TreeNode node={tree} depth={0} />
          <TreeLegend />
        </div>

        {/* ── Section Wu-Palmer ─────────────────────────────────────────────── */}
        <h5 className="fw-bold mb-3 mt-2">
          📐 Similarité sémantique{semanticMeasure ? ` — ${semanticMeasure.name}` : " Wu-Palmer"}
        </h5>

        {/* Explication de la méthode */}
        <div className="border rounded p-4 mb-4" style={{ backgroundColor: "#fafafa" }}>
          <h6 className="fw-semibold mb-3">Principe de la méthode</h6>

          {semanticMeasure ? (
            <p style={{ fontSize: 14, color: "#334155" }}>{semanticMeasure.description}</p>
          ) : (
            <p className="text-muted" style={{ fontSize: 13 }}>Chargement de la description…</p>
          )}

          {/* Formule */}
          <div className="rounded p-3 mb-3 text-center" style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}>
            {semanticMeasure ? (
              <div style={{ fontFamily: "monospace", fontSize: 16, color: "#1e40af", fontWeight: 600 }}>
                sim(a₁, a₂) = {semanticMeasure.formula}
              </div>
            ) : (
              <div className="text-muted" style={{ fontSize: 13 }}>—</div>
            )}
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="border rounded p-3 h-100">
                <div className="fw-semibold mb-1" style={{ fontSize: 13, color: "#4f46e5" }}>depth(LCS)</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  Profondeur de l'ancêtre commun le plus proche (Least Common Subsumer).
                  Plus il est profond dans l'arbre, plus les activités sont sémantiquement proches.
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3 h-100">
                <div className="fw-semibold mb-1" style={{ fontSize: 13, color: "#0891b2" }}>depth(a₁), depth(a₂)</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  Profondeurs individuelles de chaque activité dans la hiérarchie, mesurées depuis la racine.
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3 h-100">
                <div className="fw-semibold mb-1" style={{ fontSize: 13, color: "#059669" }}>
                  Plage : [{semanticMeasure ? semanticMeasure.range[0] : 0}, {semanticMeasure ? semanticMeasure.range[1] : 1}]
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  Valeur minimale = aucun lien sémantique. Valeur maximale = activité identique (diagonale).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matrice Wu-Palmer */}
        <div className="border rounded p-4 mb-4" style={{ backgroundColor: "#fafafa" }}>
          <h6 className="fw-semibold mb-3">Matrice de similarité</h6>

          {wupalmerLoading && (
            <div className="text-center py-4">
              <div className="spinner-border spinner-border-sm text-primary" role="status" />
              <span className="ms-2 text-muted" style={{ fontSize: 13 }}>Calcul en cours…</span>
            </div>
          )}

          {!wupalmerLoading && wupalmerError && (
            <p className="text-danger mb-0" style={{ fontSize: 13 }}>{wupalmerError}</p>
          )}

          {!wupalmerLoading && wupalmer && (
            <WuPalmerMatrixView matrix={wupalmer} />
          )}
        </div>

        {/* Bouton suivant */}
        <div className="d-flex justify-content-end mt-2">
          <button
            className="btn text-white px-5 py-2"
            style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
            onClick={onNext}
          >
            Données manquantes →
          </button>
        </div>

      </div>
    </div>
  );
}

export default OntologiePage;
