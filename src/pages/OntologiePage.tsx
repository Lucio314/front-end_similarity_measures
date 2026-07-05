import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getOntology, getWuPalmerMatrix, getMethods, uploadOntology } from "../api";
import type { OntologyNode, WuPalmerMatrix, Method } from "../api";
import { useAppContext } from "../context/AppContext";

interface OntologiePageProps {
  onNext: () => void;
}

const DEPTH_COLORS = [
  { color: "#4f46e5", key: "depth_root" },
  { color: "#7c3aed", key: "depth_1" },
  { color: "#0891b2", key: "depth_2" },
  { color: "#059669", key: "depth_leaves" },
];

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

function TreeLegend() {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-wrap gap-3 mt-3 pt-3" style={{ borderTop: "1px solid #e2e8f0" }}>
      {DEPTH_COLORS.map(({ color, key }) => (
        <div key={key} className="d-flex align-items-center gap-2">
          <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 3, backgroundColor: color }} />
          <span style={{ fontSize: 12, color: "#64748b" }}>{t(`ontology.${key}`)}</span>
        </div>
      ))}
    </div>
  );
}

function heatmapColor(value: number): string {
  if (value >= 1)    return "#16a34a";
  if (value >= 0.67) return "#4ade80";
  if (value >= 0.50) return "#facc15";
  if (value >= 0.33) return "#fb923c";
  return "#f87171";
}

function textColor(value: number): string {
  return value >= 0.67 || value < 0.1 ? "#fff" : "#1e293b";
}

const LEGEND_KEYS = [
  { key: "legend_weak",      color: "#f87171" },
  { key: "legend_moderate",  color: "#fb923c" },
  { key: "legend_good",      color: "#facc15" },
  { key: "legend_strong",    color: "#4ade80" },
  { key: "legend_identical", color: "#16a34a" },
];

interface WuPalmerMatrixViewProps {
  matrix: WuPalmerMatrix;
}

function WuPalmerMatrixView({ matrix }: WuPalmerMatrixViewProps) {
  const { t } = useTranslation();
  const { labels, matrix: data } = matrix;
  const cellSize = Math.max(36, Math.min(56, Math.floor(560 / labels.length)));

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr>
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
                  title={`${labels[i]} - ${labels[j]} : ${val.toFixed(3)}`}
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

      <div className="d-flex flex-wrap gap-3 mt-2">
        {LEGEND_KEYS.map(({ key, color }) => (
          <div key={key} className="d-flex align-items-center gap-1">
            <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 2, backgroundColor: color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#64748b" }}>{t(`ontology.${key}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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

function OntologiePage({ onNext }: OntologiePageProps) {
  const { t } = useTranslation();
  const { datasetId } = useAppContext();

  const [tree, setTree] = useState<OntologyNode | null>(null);
  const [treeLoading, setTreeLoading] = useState(true);
  const [treeError, setTreeError] = useState<string | null>(null);

  const [wupalmer, setWupalmer] = useState<WuPalmerMatrix | null>(null);
  const [wupalmerLoading, setWupalmerLoading] = useState(true);
  const [wupalmerError, setWupalmerError] = useState<string | null>(null);

  const [semanticMeasure, setSemanticMeasure] = useState<Method["semantic_measure"] | null>(null);

  const ontologyInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const reloadOntologyAndMatrix = (dsId: string) => {
    getOntology(dsId)
      .then(setTree)
      .catch(() => setTreeError(t('ontology.reload_error')));

    setWupalmerLoading(true);
    setWupalmerError(null);
    getWuPalmerMatrix(dsId)
      .then(setWupalmer)
      .catch(() => setWupalmerError(t('ontology.wupalmer_error')))
      .finally(() => setWupalmerLoading(false));
  };

  const handleOntologyUpload = async (file: File) => {
    if (!datasetId) return;
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);
    try {
      await uploadOntology(file, datasetId);
      setUploadSuccess(true);
      reloadOntologyAndMatrix(datasetId);
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
        ?? (err instanceof Error ? err.message : t('common.error'));
      setUploadError(detail);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    getOntology(datasetId ?? undefined)
      .then(setTree)
      .catch(() => setTreeError(t('ontology.load_error')))
      .finally(() => setTreeLoading(false));
  }, []);

  useEffect(() => {
    if (!datasetId) {
      setWupalmerError(t('ontology.no_dataset_err'));
      setWupalmerLoading(false);
      return;
    }
    getWuPalmerMatrix(datasetId)
      .then(setWupalmer)
      .catch(() => setWupalmerError(t('ontology.wupalmer_error')))
      .finally(() => setWupalmerLoading(false));
  }, [datasetId]);

  useEffect(() => {
    getMethods()
      .then(methods => {
        const found = methods.find(m => m.semantic_measure != null);
        setSemanticMeasure(found?.semantic_measure ?? null);
      })
      .catch(() => {});
  }, []);

  if (treeLoading) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="card-body p-5 text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">{t('ontology.loading')}</p>
        </div>
      </div>
    );
  }

  if (treeError || !tree) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="card-body p-5 text-center">
          <p className="text-danger">{treeError ?? t('common.error')}</p>
        </div>
      </div>
    );
  }

  const totalNodes  = countNodes(tree);
  const totalLeaves = countLeaves(tree);
  const depth       = treeDepth(tree);

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5">

        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">{t('ontology.title')}</h2>
          <p className="text-muted mb-0">{t('ontology.subtitle')}</p>
        </div>

        <div className="rounded p-3 mb-4" style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}>
          <p className="fw-semibold mb-1" style={{ fontSize: 13, color: "#1d4ed8" }}>{t('ontology.description_title')}</p>
          <p className="mb-0" style={{ fontSize: 13, color: "#1e40af" }}>{t('ontology.description')}</p>
        </div>

        <div className="border rounded p-3 mb-4" style={{ backgroundColor: "#fafafa" }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div>
              <p className="fw-semibold mb-0" style={{ fontSize: 14 }}>{t('ontology.custom_title')}</p>
              <p className="text-muted mb-0" style={{ fontSize: 12 }}>{t('ontology.custom_format')}</p>
            </div>
            <div>
              <input
                ref={ontologyInputRef}
                type="file"
                accept=".txt"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleOntologyUpload(file);
                  e.target.value = "";
                }}
              />
              <button
                className="btn btn-sm text-white"
                style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
                disabled={uploading || !datasetId}
                onClick={() => ontologyInputRef.current?.click()}
              >
                {uploading
                  ? <><span className="spinner-border spinner-border-sm me-1" role="status" />{t('ontology.uploading')}</>
                  : t('ontology.import_btn')
                }
              </button>
            </div>
          </div>

          {!datasetId && (
            <p className="text-warning mb-0" style={{ fontSize: 12 }}>{t('ontology.no_dataset_warning')}</p>
          )}
          {uploadError && (
            <p className="text-danger mb-0 mt-1" style={{ fontSize: 12 }}>{uploadError}</p>
          )}
          {uploadSuccess && (
            <p className="text-success mb-0 mt-1" style={{ fontSize: 12 }}>{t('ontology.reload_success')}</p>
          )}
        </div>

        <div className="row g-3 mb-4">
          <div className="col-4">
            <div className="rounded p-3 text-white text-center" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
              <div className="fw-bold" style={{ fontSize: 32 }}>{totalNodes}</div>
              <div style={{ fontSize: 12 }}>{t('ontology.total_nodes')}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="rounded p-3 text-white text-center" style={{ background: "linear-gradient(135deg, #0891b2, #0e7490)" }}>
              <div className="fw-bold" style={{ fontSize: 32 }}>{totalLeaves}</div>
              <div style={{ fontSize: 12 }}>{t('ontology.leaves')}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="rounded p-3 text-white text-center" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
              <div className="fw-bold" style={{ fontSize: 32 }}>{depth}</div>
              <div style={{ fontSize: 12 }}>{t('ontology.max_depth')}</div>
            </div>
          </div>
        </div>

        <div className="border rounded p-4 mb-4" style={{ backgroundColor: "#fafafa" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-semibold mb-0">{t('ontology.tree_title')}</h6>
            <span className="text-muted" style={{ fontSize: 12 }}>{t('ontology.tree_hint')}</span>
          </div>
          <TreeNode node={tree} depth={0} />
          <TreeLegend />
        </div>

        <h5 className="fw-bold mb-3 mt-2">
          {t('ontology.wupalmer_section')}{semanticMeasure ? ` — ${semanticMeasure.name}` : ""}
        </h5>

        <div className="border rounded p-4 mb-4" style={{ backgroundColor: "#fafafa" }}>
          <h6 className="fw-semibold mb-3">{t('ontology.principle_title')}</h6>

          {semanticMeasure ? (
            <p style={{ fontSize: 14, color: "#334155" }}>{semanticMeasure.description}</p>
          ) : (
            <p className="text-muted" style={{ fontSize: 13 }}>{t('ontology.loading_desc')}</p>
          )}

          <div className="rounded p-3 mb-3 text-center" style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}>
            {semanticMeasure ? (
              <div style={{ fontFamily: "monospace", fontSize: 16, color: "#1e40af", fontWeight: 600 }}>
                sim(a1, a2) = {semanticMeasure.formula}
              </div>
            ) : (
              <div className="text-muted" style={{ fontSize: 13 }}>-</div>
            )}
          </div>

          <div className="rounded p-3" style={{ backgroundColor: "#f5f3ff", border: "1px solid #ddd6fe" }}>
            <p className="fw-semibold mb-2" style={{ fontSize: 13, color: "#6d28d9" }}>{t('ontology.how_it_works')}</p>
            <ol className="mb-0 ps-3" style={{ fontSize: 13, color: "#334155" }}>
              <li className="mb-1">{t('ontology.step1')}</li>
              <li className="mb-1">{t('ontology.step2')}</li>
              <li>{t('ontology.step3')}</li>
            </ol>
          </div>
        </div>

        <div className="border rounded p-4 mb-4" style={{ backgroundColor: "#fafafa" }}>
          <h6 className="fw-semibold mb-3">{t('ontology.matrix_title')}</h6>

          {wupalmerLoading && (
            <div className="text-center py-4">
              <div className="spinner-border spinner-border-sm text-primary" role="status" />
              <span className="ms-2 text-muted" style={{ fontSize: 13 }}>{t('ontology.computing')}</span>
            </div>
          )}

          {!wupalmerLoading && wupalmerError && (
            <p className="text-danger mb-0" style={{ fontSize: 13 }}>{wupalmerError}</p>
          )}

          {!wupalmerLoading && wupalmer && (
            <WuPalmerMatrixView matrix={wupalmer} />
          )}
        </div>

        <div className="rounded p-3 mb-4" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <p className="fw-semibold mb-2" style={{ fontSize: 13, color: "#15803d" }}>{t('ontology.example_title')}</p>
          <ul className="mb-0 ps-3" style={{ fontSize: 13, color: "#166534" }}>
            <li className="mb-1">{t('ontology.example1')}</li>
            <li className="mb-1">{t('ontology.example2')}</li>
            <li>{t('ontology.example3')}</li>
          </ul>
        </div>

        <div className="d-flex justify-content-end mt-2">
          <button
            className="btn text-white px-5 py-2"
            style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
            onClick={onNext}
          >
            {t('ontology.next')}
          </button>
        </div>

      </div>
    </div>
  );
}

export default OntologiePage;
