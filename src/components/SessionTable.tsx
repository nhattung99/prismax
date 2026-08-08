import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Edit3, Trash2, ShieldCheck, FileSpreadsheet, PlusCircle } from 'lucide-react';
import type { RobotConfig, TeleopSession } from '../types/session';

interface SessionTableProps {
  sessions: TeleopSession[];
  knownRobots: RobotConfig[];
  onEditSession: (session: TeleopSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onOpenAddModal: () => void;
}

type SortField = 'date' | 'robot' | 'duration' | 'quality' | 'points';
type SortOrder = 'asc' | 'desc';

export const SessionTable: React.FC<SessionTableProps> = ({
  sessions,
  knownRobots,
  onEditSession,
  onDeleteSession,
  onOpenAddModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRobotFilter, setSelectedRobotFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logic
  const filteredSessions = sessions.filter((s) => {
    const matchesSearch = 
      s.robotName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.note && s.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.date.includes(searchTerm);

    const matchesRobot = 
      selectedRobotFilter === 'all' || 
      s.robotId.toLowerCase() === selectedRobotFilter.toLowerCase() ||
      s.robotName.toLowerCase().includes(selectedRobotFilter.toLowerCase());

    return matchesSearch && matchesRobot;
  });

  // Sorting logic
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'date') {
      comparison = a.date.localeCompare(b.date);
    } else if (sortField === 'robot') {
      comparison = a.robotName.localeCompare(b.robotName);
    } else if (sortField === 'duration') {
      comparison = a.durationMinutes - b.durationMinutes;
    } else if (sortField === 'quality') {
      const qA = a.qualityScore ?? -1;
      const qB = b.qualityScore ?? -1;
      comparison = qA - qB;
    } else if (sortField === 'points') {
      comparison = a.pointsEarned - b.pointsEarned;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedSessions.length / itemsPerPage) || 1;
  const paginatedSessions = sortedSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="prisma-card p-6 space-y-4">
      
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold font-serif-editorial text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#B87A4F]" />
            <span>Session Logs & Telemetry History</span>
          </h2>
          <p className="text-xs text-[#9A938A] mt-0.5">
            Showing {filteredSessions.length} of {sessions.length} recorded teleop sessions
          </p>
        </div>

        {/* Search & Robot Filter */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#9A938A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes or robot..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#141414] text-[#DFD8D0] text-xs pl-9 pr-3 py-2 rounded-lg border border-[rgba(223,216,208,0.12)] focus:outline-none focus:border-[#B87A4F]"
            />
          </div>

          {/* Robot Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#141414] px-3 py-1.5 rounded-lg border border-[rgba(223,216,208,0.12)] text-xs text-[#DFD8D0]">
            <Filter className="w-3.5 h-3.5 text-[#B87A4F]" />
            <select
              value={selectedRobotFilter}
              onChange={(e) => {
                setSelectedRobotFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs text-[#DFD8D0] focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#202020] text-white">All Robots</option>
              {knownRobots.map(r => (
                <option key={r.id} value={r.id} className="bg-[#202020] text-white">
                  {r.name}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Sessions Table */}
      <div className="overflow-x-auto border border-[rgba(223,216,208,0.08)] rounded-xl bg-[#171717]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[rgba(223,216,208,0.1)] bg-[#1F1F1F] text-[#9A938A] uppercase tracking-wider font-semibold">
              
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('date')}>
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowUpDown className="w-3 h-3 text-[#B87A4F]" />
                </div>
              </th>

              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('robot')}>
                <div className="flex items-center gap-1">
                  <span>Robot</span>
                  <ArrowUpDown className="w-3 h-3 text-[#B87A4F]" />
                </div>
              </th>

              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('duration')}>
                <div className="flex items-center gap-1">
                  <span>Duration</span>
                  <ArrowUpDown className="w-3 h-3 text-[#B87A4F]" />
                </div>
              </th>

              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('quality')}>
                <div className="flex items-center gap-1">
                  <span>Quality Score</span>
                  <ArrowUpDown className="w-3 h-3 text-[#B87A4F]" />
                </div>
              </th>

              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('points')}>
                <div className="flex items-center gap-1">
                  <span>Prisma Points</span>
                  <ArrowUpDown className="w-3 h-3 text-[#B87A4F]" />
                </div>
              </th>

              <th className="py-3 px-4">Notes</th>

              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[rgba(223,216,208,0.05)]">
            {paginatedSessions.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#9A938A]">
                  <p className="text-sm font-semibold text-white">No sessions match your search filters.</p>
                  <p className="text-xs mt-1">Try resetting the robot filter or search keywords.</p>
                  <button
                    onClick={onOpenAddModal}
                    className="btn-primary text-xs py-1.5 px-3 rounded-md mt-3 inline-flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Log New Session</span>
                  </button>
                </td>
              </tr>
            ) : (
              paginatedSessions.map((session) => (
                <tr key={session.id} className="hover:bg-[rgba(223,216,208,0.03)] transition-colors">
                  
                  {/* Date */}
                  <td className="py-3 px-4 font-mono-numbers text-[#DFD8D0] font-medium whitespace-nowrap">
                    {session.date}
                  </td>

                  {/* Robot */}
                  <td className="py-3 px-4 font-medium text-white whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <span>{session.robotName}</span>
                      {knownRobots.some(r => r.isOfficial && sNameMatch(r.name, session.robotName)) && (
                        <span title="PrismaX Validated Partner">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#7AAEA6]" />
                        </span>
                      )}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="py-3 px-4 font-mono-numbers text-[#DFD8D0] whitespace-nowrap">
                    {session.durationMinutes} mins <span className="text-[#9A938A]">({(session.durationMinutes / 60).toFixed(1)}h)</span>
                  </td>

                  {/* Quality Score */}
                  <td className="py-3 px-4 font-mono-numbers whitespace-nowrap">
                    {session.qualityScore !== null && session.qualityScore !== undefined ? (
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        session.qualityScore >= 90
                          ? 'bg-[rgba(94,140,133,0.15)] text-[#7AAEA6] border border-[rgba(94,140,133,0.3)]'
                          : session.qualityScore >= 80
                          ? 'bg-[rgba(184,122,79,0.15)] text-[#C5885C] border border-[rgba(184,122,79,0.3)]'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {session.qualityScore}
                      </span>
                    ) : (
                      <span className="text-[#9A938A] italic">Unrated</span>
                    )}
                  </td>

                  {/* Points */}
                  <td className="py-3 px-4 font-mono-numbers text-[#C5885C] font-semibold whitespace-nowrap">
                    +{session.pointsEarned.toLocaleString()} <span className="text-[10px] text-[#9A938A] font-normal">$PIX</span>
                  </td>

                  {/* Notes */}
                  <td className="py-3 px-4 text-[#9A938A] max-w-xs truncate" title={session.note}>
                    {session.note || <span className="italic opacity-50">No notes</span>}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEditSession(session)}
                        className="p-1.5 hover:bg-[rgba(223,216,208,0.1)] text-[#DFD8D0] hover:text-white rounded transition-colors"
                        title="Edit Session"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C5885C]" />
                      </button>

                      <button
                        onClick={() => onDeleteSession(session.id)}
                        className="p-1.5 hover:bg-red-500/15 text-red-400 rounded transition-colors"
                        title="Delete Session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-xs text-[#9A938A]">
          <div>
            Page <strong className="text-white font-mono-numbers">{currentPage}</strong> of <strong className="text-white font-mono-numbers">{totalPages}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 rounded bg-[#141414] border border-[rgba(223,216,208,0.1)] text-[#DFD8D0] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#202020]"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded bg-[#141414] border border-[rgba(223,216,208,0.1)] text-[#DFD8D0] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#202020]"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

function sNameMatch(officialName: string, sessionRobotName: string): boolean {
  return sessionRobotName.toLowerCase().includes(officialName.split(' ')[0].toLowerCase());
}
