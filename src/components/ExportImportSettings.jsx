import React, { useState, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { exportStudyData, importStudyData, exportProgressReport } from '../services/dataService';

const ExportImportSettings = ({ theme = 'dark', onClose = null }) => {
  const { state, dispatch } = useApp();
  const [isImporting, setIsImporting] = useState(false);
  const [importMessage, setImportMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleExportData = () => {
    try {
      exportStudyData(state);
      setImportMessage('Data exported successfully!');
      setTimeout(() => setImportMessage(''), 3000);
    } catch (error) {
      setImportMessage(`Export failed: ${error.message}`);
      setTimeout(() => setImportMessage(''), 3000);
    }
  };

  const handleExportReport = () => {
    try {
      exportProgressReport(state);
      setImportMessage('Progress report exported successfully!');
      setTimeout(() => setImportMessage(''), 3000);
    } catch (error) {
      setImportMessage(`Report export failed: ${error.message}`);
      setTimeout(() => setImportMessage(''), 3000);
    }
  };

  const handleImportData = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) return;

    setIsImporting(true);
    setImportMessage('Importing data...');

    try {
      const result = await importStudyData(file, dispatch);
      setImportMessage(
        `${result.message} Imported: ${result.importedItems.answers} answers, ${result.importedItems.bookmarks} bookmarks, ${result.importedItems.notes} notes.`
      );
      fileInputRef.current.value = '';
    } catch (error) {
      setImportMessage(error.message);
    } finally {
      setIsImporting(false);
      setTimeout(() => setImportMessage(''), 5000);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff',
      border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
      borderRadius: '8px',
      padding: '1.5rem',
      maxWidth: '500px',
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h3 style={{
          margin: 0,
          color: theme === 'dark' ? '#fff' : '#333',
          fontSize: '1.2rem'
        }}>
          Export & Import Settings
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: theme === 'dark' ? '#fff' : '#333'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Export Section */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{
          margin: '0 0 1rem 0',
          color: theme === 'dark' ? '#ccc' : '#666',
          fontSize: '1rem'
        }}>
          Export Your Data
        </h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleExportData}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#2196F3',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              minWidth: '120px'
            }}
          >
            Export Study Data
          </button>
          <button
            onClick={handleExportReport}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              minWidth: '120px'
            }}
          >
            Export Progress Report
          </button>
        </div>
        <p style={{
          margin: '0.5rem 0 0 0',
          fontSize: '0.8rem',
          color: theme === 'dark' ? '#999' : '#666',
          lineHeight: '1.4'
        }}>
          Export your answers, bookmarks, notes, and settings as a backup file.
          The progress report creates a detailed study analysis in markdown format.
        </p>
      </div>

      {/* Import Section */}
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{
          margin: '0 0 1rem 0',
          color: theme === 'dark' ? '#ccc' : '#666',
          fontSize: '1rem'
        }}>
          Import Study Data
        </h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={handleFileSelect}
            disabled={isImporting}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: isImporting ? '#999' : '#ff9800',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: isImporting ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              minWidth: '120px'
            }}
          >
            {isImporting ? 'Importing...' : 'Select File'}
          </button>
          <button
            onClick={handleImportData}
            disabled={isImporting || !fileInputRef.current?.files[0]}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: isImporting || !fileInputRef.current?.files[0] ? '#999' : '#f44336',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: isImporting || !fileInputRef.current?.files[0] ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              minWidth: '100px'
            }}
          >
            Import
          </button>
        </div>
        <p style={{
          margin: '0.5rem 0 0 0',
          fontSize: '0.8rem',
          color: theme === 'dark' ? '#999' : '#666',
          lineHeight: '1.4'
        }}>
          Import a previously exported study data file. This will merge with your current data.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={() => {}} // Handle in handleImportData
          style={{ display: 'none' }}
        />
      </div>

      {/* Status Message */}
      {importMessage && (
        <div style={{
          padding: '0.75rem',
          borderRadius: '4px',
          backgroundColor: importMessage.includes('failed') || importMessage.includes('error')
            ? '#ff5252'
            : importMessage.includes('successfully') || importMessage.includes('Imported:')
            ? '#4caf50'
            : '#2196F3',
          color: '#fff',
          fontSize: '0.9rem',
          marginTop: '1rem',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          {importMessage}
        </div>
      )}

      {/* Study Statistics */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
        borderRadius: '4px'
      }}>
        <h4 style={{
          margin: '0 0 0.5rem 0',
          color: theme === 'dark' ? '#ccc' : '#666',
          fontSize: '0.9rem'
        }}>
          Current Data
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: theme === 'dark' ? '#aaa' : '#666'
        }}>
          <div>Answered Questions: {Object.keys(state.answers).length}</div>
          <div>Bookmarks: {state.bookmarks.size}</div>
          <div>Notes: {Object.keys(state.notes).length}</div>
          <div>Study Streak: {state.streak} days</div>
        </div>
      </div>
    </div>
  );
};

export default ExportImportSettings;