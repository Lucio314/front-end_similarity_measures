# Bonnes pratiques React — Notes de projet

## 1. Flux de données unidirectionnel

Les données descendent via les **props** (parent → enfant).
Les événements remontent via des **callbacks** (enfant → parent).

```tsx
// ✅ Correct
function Parent() {
  const [files, setFiles] = useState<File[]>([]);
  return <Child files={files} onFilesChange={setFiles} />;
}

function Child({ files, onFilesChange }: Props) {
  // Child affiche, Parent possède
}
```

```tsx
// ❌ À éviter — un enfant ne modifie jamais les props directement
function Child({ files }: Props) {
  files.push(newFile); // mutation directe = bug
}
```

---

## 2. Lifting state up — faire remonter l'état

Si deux composants ont besoin de la même donnée, l'état doit vivre
dans leur **ancêtre commun le plus proche**.

```
App
├── DataPage    ← files vit ici, pas dans FileUploader
│   └── FileUploader
└── StatisticsPage  ← a aussi besoin de files
```

Règle : **un composant UI (feuille) ne devrait pas posséder d'état
qu'un autre composant a besoin de lire.**

---

## 3. Un composant UI ne dépend pas du Context

Les composants génériques (FileUploader, Slider, Checkbox...)
reçoivent leurs données via **props uniquement**.
C'est la page parente qui fait le pont avec le Context.

```tsx
// ✅ FileUploader — agnostique, réutilisable partout
function FileUploader({ files, onFilesChange }: Props) { ... }

// ✅ DataPage — fait le pont entre Context et composants UI
function DataPage() {
  const { uploadedFiles, setUploadedFiles } = useAppContext();
  return <FileUploader files={uploadedFiles} onFilesChange={setUploadedFiles} />;
}
```

---

## 4. Context — état global partagé

À utiliser quand plusieurs pages éloignées dans l'arbre ont besoin
des mêmes données. Évite le **prop drilling** (passer des props
sur 4-5 niveaux sans que les composants intermédiaires en aient besoin).

```tsx
// Créer le context
const AppContext = createContext<AppContextType | null>(null);

// Hook personnalisé pour y accéder
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) throw new Error('Hors du Provider');
  return context;
}

// Envelopper l'application
<AppProvider>
  <App />
</AppProvider>
```

---

## 5. useState vs useRef

| | useState | useRef |
|---|---|---|
| Déclenche un re-rendu | ✅ Oui | ❌ Non |
| Utilisé pour | Données affichées | Accès DOM direct |
| Exemple | liste de fichiers, isDragging | inputRef.current.click() |

```tsx
// useRef pour déclencher un input file caché
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} type="file" style={{ display: 'none' }} />
<button onClick={() => inputRef.current?.click()}>Sélectionner</button>
```

---

## 6. Clés dans les listes

Toujours utiliser une clé **stable et unique**, jamais l'index.

```tsx
// ❌ Index — bug si on supprime un élément du milieu
files.map((file, index) => <li key={index}>{file.name}</li>)

// ✅ Identifiant stable
files.map((file) => <li key={file.name}>{file.name}</li>)
```

---

## 7. Dédoublonnage lors d'un ajout de fichiers

```tsx
const merged = [...existing, ...incoming].filter(
  (f, i, arr) => arr.findIndex((x) => x.name === f.name) === i
);
```

---

## 8. Typage des événements React (TypeScript)

```tsx
// Drag & Drop
const handleDrop = (e: React.DragEvent<HTMLDivElement>) => { ... }

// Input file
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }

// Bouton
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
```

---

## 9. Ne pas utiliser document.getElementById en React

```tsx
// ❌ Manipulation DOM directe — désynchronise React
const div = document.getElementById('mon-div');
div.hidden = true;

// ✅ Laisser React gérer le DOM via l'état
const [visible, setVisible] = useState(true);
{visible && <div>...</div>}
```

---

## 10. Quand utiliser useEffect

Pour les **effets de bord** : appels API, abonnements, timers.
Pas pour calculer des valeurs dérivées de l'état (utiliser une variable normale).

```tsx
// ✅ Charger des données au montage du composant
useEffect(() => {
  fetch('/api/data').then(...);
}, []); // [] = s'exécute une seule fois au montage

// ✅ Réagir à un changement de prop
useEffect(() => {
  // s'exécute à chaque changement de currentStep
}, [currentStep]);
```

---

## 11. Pourquoi le Context — explication concrète avec ce projet

### Sans Context (situation actuelle, étape 1 seulement)

```
App.tsx
└── DataPage.tsx        ← files vit ici (useState)
    ├── FileUploader    ← reçoit files + onFilesChange en props
    └── ExampleData     ← reçoit onLoad en prop
```

DataPage possède `files`. Il le passe à FileUploader pour afficher
la liste et gérer les ajouts/suppressions. Quand FileUploader modifie
la liste, il appelle `onFilesChange` qui met à jour le state dans DataPage.
Les données descendent, les événements remontent.

### Le problème quand on ajoute les autres pages

L'étape 2 (Statistiques) a besoin des fichiers chargés à l'étape 1
pour afficher des graphiques. Mais StatisticsPage est un **frère** de
DataPage, pas un enfant — il ne peut pas accéder à son état.

```
App.tsx
├── DataPage.tsx     ← files est ici
└── StatisticsPage   ← a besoin de files mais ne peut pas y accéder
```

La seule solution sans Context serait de remonter `files` dans App.tsx
et de le passer en prop à chaque page. Avec 8 étapes et plusieurs
données partagées, c'est le **prop drilling** — ingérable.

### La solution : Context

```
AppProvider            ← files vit ici
└── App.tsx
    ├── DataPage.tsx
    │   └── FileUploader   ← reçoit files via props (depuis DataPage)
    └── StatisticsPage     ← lit files via useAppContext() directement
```

N'importe quel composant dans l'arbre peut lire ou modifier `files`
via `useAppContext()`, sans passer par des props intermédiaires.

### Ce que ça change concrètement dans DataPage

```tsx
// Avant — state local
const [files, setFiles] = useState<File[]>([]);

// Après — state global via Context
const { uploadedFiles, setUploadedFiles } = useAppContext();
```

FileUploader, lui, ne change pas — il reçoit toujours ses données
en props. Il n'a pas besoin de savoir d'où elles viennent.
C'est intentionnel : **un composant UI reste agnostique de la source
des données, ce qui le rend réutilisable.**
