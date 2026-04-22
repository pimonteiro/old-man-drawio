import React, { useRef, useCallback } from 'react';
import {
  Tldraw,
  ArrowShapeKindStyle,
  ArrowShapeArrowheadStartStyle,
  ArrowShapeArrowheadEndStyle,
  getSnapshot,
  loadSnapshot,
} from 'tldraw';
import 'tldraw/tldraw.css';

// Asset URLs – map the arrow tool to a simple line icon (public/line_icon.svg)
const assetUrls = {
  icons: {
    // In tldraw v4 the key for the arrow tool icon is "tool-arrow"
    'tool-arrow': '/line_icon.svg',
  },
};

export default function App() {
  const editorRef = useRef(null);

  // Set default styles when the editor mounts
  const handleMount = useCallback((editor) => {
    editorRef.current = editor;
    editor.setStyleForNextShapes(ArrowShapeKindStyle, 'elbow');
    editor.setStyleForNextShapes(ArrowShapeArrowheadStartStyle, 'none');
    editor.setStyleForNextShapes(ArrowShapeArrowheadEndStyle, 'none');

    // Set portuguese as default language
    editor.user.updateUserPreferences({ locale: 'pt-pt' });

    // Force focus mode to false and keep it that way
    editor.updateInstanceState({ isFocusMode: false });
    editor.store.listen(() => {
      if (editor.getInstanceState().isFocusMode) {
        editor.updateInstanceState({ isFocusMode: false });
      }
    });
  }, []);

  // Export drawing as JSON
  const exportJson = useCallback(() => {
    if (!editorRef.current) return;
    const snapshot = getSnapshot(editorRef.current.store);
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.json';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  // Import drawing from a JSON file
  const importDrawing = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editorRef.current) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const snapshot = JSON.parse(event.target.result);
        loadSnapshot(editorRef.current.store, snapshot);
      } catch (err) {
        console.error('Failed to load drawing:', err);
      }
    };
    reader.readAsText(file);
    // Reset file input so the same file can be imported again
    e.target.value = '';
  };

  // Import an image into the diagram
  const importImage = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editorRef.current) return;

    // Use tldraw's built in content handler for pasting/dropping files
    editorRef.current.putExternalContent({
      type: 'files',
      files: [file],
      point: editorRef.current.getViewportPageBounds().center,
      ignoreParent: false,
    });

    e.target.value = '';
  };

  // Modern looking floating toolbar for our custom export/import
  const toolbarStyle = {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    display: 'flex',
    gap: '8px',
    background: '#ffffff',
    padding: '6px 12px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    pointerEvents: 'auto',
  };

  const buttonStyle = {
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  };

  // Minimize visual noise by hiding standard complex components
  const minimalComponents = {
    MainMenu: null,
    HelpMenu: null,
    NavigationPanel: null,
    ZoomMenu: null,
    Minimap: null,
  };

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}>
        <Tldraw
          persistenceKey="grandparent-app-v5"
          forceMobile={true}
          onMount={handleMount}
          assetUrls={assetUrls}
          components={minimalComponents}
        />
      </div>
      {/* Custom Toolbar floating nicely at the top center */}
      <div style={toolbarStyle}>
        <button
          style={buttonStyle}
          onClick={exportJson}
        >
          Exportar JSON
        </button>
        <label style={{ ...buttonStyle, cursor: 'pointer', display: 'inline-block', textAlign: 'center' }}>
          Importar JSON
          <input type="file" accept="application/json" style={{ display: 'none' }} onChange={importDrawing} />
        </label>
        <label style={{ ...buttonStyle, cursor: 'pointer', display: 'inline-block', textAlign: 'center' }}>
          Inserir Imagem
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={importImage} />
        </label>
        <div style={{
          fontSize: '0.7rem',
          color: '#9ca3af',
          alignSelf: 'center',
          marginLeft: '4px',
          fontFamily: 'monospace',
          fontWeight: '600'
        }}>
          v1.0.1
        </div>
      </div>
    </div>
  );
}
