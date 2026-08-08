import React, { useState } from 'react';
import { X, Upload, Download, FileSpreadsheet, FileCode, CheckCircle2, AlertTriangle, FileText, Info } from 'lucide-react';
import type { ImportPreviewRow, TeleopSession } from '../types/session';
import { exportSessionsToCSV, exportSessionsToJSON, parseCSVContent, parseJSONContent } from '../utils/csvJson';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmImport: (newSessions: Omit<TeleopSession, 'id' | 'createdAt' | 'updatedAt'>[], mode: 'append' | 'replace') => void;
  currentSessions: TeleopSession[];
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  onConfirmImport,
  currentSessions
}) => {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [file, setFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<ImportPreviewRow[]>([]);
  const [importError, setImportError] = useState<string | null>(null);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setImportError(null);
    setPreviewRows([]);

    try {
      const text = await selected.text();
      let rows: ImportPreviewRow[] = [];

      if (selected.name.toLowerCase().endsWith('.json')) {
        rows = parseJSONContent(text);
      } else if (selected.name.toLowerCase().endsWith('.csv') || selected.type === 'text/csv') {
        rows = parseCSVContent(text);
      } else {
        throw new Error('Unsupported file type. Please upload a .csv or .json file.');
      }

      setPreviewRows(rows);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to read file.';
      setImportError(msg);
    }
  };

  const handleExecuteImport = () => {
    const validRows = previewRows.filter(r => r.isValid);
    if (validRows.length === 0) {
      setImportError('No valid rows found to import.');
      return;
    }

    const sessionPayload = validRows.map(r => ({
      date: r.date,
      robotId: r.robot.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      robotName: r.robot,
      durationMinutes: r.duration_minutes,
      qualityScore: r.quality_score ?? null,
      pointsEarned: r.points,
      note: r.note || ''
    }));

    onConfirmImport(sessionPayload, importMode);
    onClose();
  };

  const validCount = previewRows.filter(r => r.isValid).length;
  const invalidCount = previewRows.filter(r => !r.isValid).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#202020] border border-[rgba(223,216,208,0.15)] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[rgba(223,216,208,0.1)] flex items-center justify-between bg-[#1A1A1A]">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold font-serif-editorial text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#B87A4F]" />
              <span>Data Import & Export Center</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#9A938A] hover:text-white rounded-lg hover:bg-[rgba(223,216,208,0.08)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 bg-[#1A1A1A] border-b border-[rgba(223,216,208,0.08)] flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'import'
                ? 'border-[#B87A4F] text-[#B87A4F]'
                : 'border-transparent text-[#9A938A] hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Import CSV / JSON</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'export'
                ? 'border-[#B87A4F] text-[#B87A4F]'
                : 'border-transparent text-[#9A938A] hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Export Backup ({currentSessions.length} sessions)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          
          {activeTab === 'import' ? (
            <div className="space-y-4">
              
              {/* Schema Spec Box */}
              <div className="p-3 bg-[#141414] border border-[rgba(223,216,208,0.1)] rounded-lg text-[#DFD8D0] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#B87A4F]">
                  <Info className="w-4 h-4" />
                  <span>Standard CSV / JSON Column Schema</span>
                </div>
                <p className="text-[11px] text-[#9A938A]">
                  Supported fields: <code className="text-[#C5885C] font-mono-numbers">date, robot, duration_minutes, quality_score, points, note</code>
                </p>
              </div>

              {/* File Upload Zone */}
              <div className="border-2 border-dashed border-[rgba(223,216,208,0.2)] hover:border-[#B87A4F] rounded-xl p-6 text-center bg-[#171717] transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <FileSpreadsheet className="w-8 h-8 text-[#B87A4F] mx-auto mb-2 opacity-80" />
                <p className="text-sm font-semibold text-white">
                  {file ? file.name : 'Click or Drag & Drop .CSV / .JSON file here'}
                </p>
                <p className="text-xs text-[#9A938A] mt-1">
                  Supports PrismaX session exports or standard community spreadsheets
                </p>
              </div>

              {importError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {/* Validation Preview Table */}
              {previewRows.length > 0 && (
                <div className="space-y-3 pt-2">
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold">Row Validation Summary:</span>
                      <span className="px-2 py-0.5 rounded bg-[rgba(94,140,133,0.15)] text-[#7AAEA6] font-mono-numbers font-semibold">
                        {validCount} Valid
                      </span>
                      {invalidCount > 0 && (
                        <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-mono-numbers font-semibold">
                          {invalidCount} Invalid
                        </span>
                      )}
                    </div>

                    {/* Import Mode Toggle */}
                    <div className="flex items-center gap-2 text-[11px] text-[#9A938A]">
                      <span>Strategy:</span>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="importMode"
                          value="append"
                          checked={importMode === 'append'}
                          onChange={() => setImportMode('append')}
                          className="accent-[#B87A4F]"
                        />
                        <span className="text-white">Append</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer ml-2">
                        <input
                          type="radio"
                          name="importMode"
                          value="replace"
                          checked={importMode === 'replace'}
                          onChange={() => setImportMode('replace')}
                          className="accent-[#B87A4F]"
                        />
                        <span className="text-red-400">Replace All</span>
                      </label>
                    </div>
                  </div>

                  {/* Preview Table */}
                  <div className="max-h-48 overflow-y-auto border border-[rgba(223,216,208,0.1)] rounded-lg bg-[#141414]">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead className="sticky top-0 bg-[#1F1F1F] text-[#9A938A] uppercase tracking-wider font-semibold border-b border-[rgba(223,216,208,0.08)]">
                        <tr>
                          <th className="py-2 px-3">Status</th>
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-3">Robot</th>
                          <th className="py-2 px-3">Duration</th>
                          <th className="py-2 px-3">Score</th>
                          <th className="py-2 px-3">Points</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgba(223,216,208,0.05)] font-mono-numbers">
                        {previewRows.map((row, idx) => (
                          <tr key={idx} className={row.isValid ? 'hover:bg-[#1C1C1C]' : 'bg-red-500/5'}>
                            <td className="py-2 px-3">
                              {row.isValid ? (
                                <span className="inline-flex items-center gap-1 text-[#7AAEA6] font-sans font-medium">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-red-400 font-sans font-medium" title={row.errorMessage}>
                                  <AlertTriangle className="w-3.5 h-3.5" /> Invalid
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-[#DFD8D0]">{row.date}</td>
                            <td className="py-2 px-3 font-sans text-white">{row.robot}</td>
                            <td className="py-2 px-3 text-[#DFD8D0]">{row.duration_minutes}m</td>
                            <td className="py-2 px-3 text-[#7AAEA6]">{row.quality_score ?? 'N/A'}</td>
                            <td className="py-2 px-3 text-[#C5885C]">+{row.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

            </div>
          ) : (
            <div className="space-y-6 py-2">
              
              <div className="prisma-card p-4 border border-[rgba(184,122,79,0.2)] bg-[#171717] space-y-2">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#B87A4F]" />
                  <span>Download Telemetry Backup</span>
                </h3>
                <p className="text-xs text-[#9A938A]">
                  Export all {currentSessions.length} session records currently saved in your browser&apos;s localStorage for safe keeping or data analysis in Excel/Python.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* CSV Download Card */}
                <button
                  onClick={() => exportSessionsToCSV(currentSessions)}
                  className="prisma-card p-5 text-left hover:border-[#B87A4F] transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between">
                    <FileSpreadsheet className="w-6 h-6 text-[#B87A4F]" />
                    <Download className="w-4 h-4 text-[#9A938A] group-hover:text-white transition-colors" />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-white">Export as CSV (.csv)</h4>
                    <p className="text-[11px] text-[#9A938A] mt-1">Ideal for Microsoft Excel, Google Sheets, or Pandas dataframe analysis.</p>
                  </div>
                </button>

                {/* JSON Download Card */}
                <button
                  onClick={() => exportSessionsToJSON(currentSessions)}
                  className="prisma-card p-5 text-left hover:border-[#B87A4F] transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between">
                    <FileCode className="w-6 h-6 text-[#7AAEA6]" />
                    <Download className="w-4 h-4 text-[#9A938A] group-hover:text-white transition-colors" />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-white">Export as JSON (.json)</h4>
                    <p className="text-[11px] text-[#9A938A] mt-1">Full raw backup format with schema metadata for re-importing into PrismaX dashboard.</p>
                  </div>
                </button>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#1A1A1A] border-t border-[rgba(223,216,208,0.1)] flex items-center justify-between">
          <button onClick={onClose} className="btn-secondary px-4 py-2 text-xs">
            Close
          </button>

          {activeTab === 'import' && previewRows.length > 0 && (
            <button
              onClick={handleExecuteImport}
              disabled={validCount === 0}
              className="btn-primary px-5 py-2 text-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Import {validCount} Valid Sessions</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
