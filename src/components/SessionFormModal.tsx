import React, { useState, useEffect } from 'react';
import { X, Bot, Calendar, Clock, Award, Sparkles, FileText, Plus } from 'lucide-react';
import type { RobotConfig, TeleopSession } from '../types/session';

interface SessionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sessionData: {
    date: string;
    robotId: string;
    robotName: string;
    durationMinutes: number;
    qualityScore?: number | null;
    pointsEarned: number;
    note?: string;
  }) => void;
  onAddCustomRobot: (robot: RobotConfig) => void;
  initialData?: TeleopSession | null;
  knownRobots: RobotConfig[];
}

export const SessionFormModal: React.FC<SessionFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onAddCustomRobot,
  initialData,
  knownRobots
}) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRobotId, setSelectedRobotId] = useState('');
  const [isAddingCustomRobot, setIsAddingCustomRobot] = useState(false);
  const [customRobotName, setCustomRobotName] = useState('');
  const [customManufacturer, setCustomManufacturer] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('60');
  const [qualityScore, setQualityScore] = useState('');
  const [pointsEarned, setPointsEarned] = useState('1500');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date);
      setSelectedRobotId(initialData.robotId);
      setDurationMinutes(String(initialData.durationMinutes));
      setQualityScore(initialData.qualityScore !== null && initialData.qualityScore !== undefined ? String(initialData.qualityScore) : '');
      setPointsEarned(String(initialData.pointsEarned));
      setNote(initialData.note || '');
    } else {
      setDate(new Date().toISOString().split('T')[0]);
      if (knownRobots.length > 0) {
        setSelectedRobotId(knownRobots[0].id);
      }
      setDurationMinutes('60');
      setQualityScore('');
      setPointsEarned('1500');
      setNote('');
    }
    setIsAddingCustomRobot(false);
    setError(null);
  }, [initialData, isOpen, knownRobots]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!date) {
      setError('Please select a session date.');
      return;
    }

    let finalRobotId = selectedRobotId;
    let finalRobotName = '';

    if (isAddingCustomRobot) {
      if (!customRobotName.trim()) {
        setError('Please enter a name for the custom robot.');
        return;
      }
      const newRobotId = customRobotName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const newRobot: RobotConfig = {
        id: newRobotId,
        name: customRobotName.trim(),
        manufacturer: customManufacturer.trim() || 'Custom Partner',
        isOfficial: false,
        color: '#B87A4F'
      };
      onAddCustomRobot(newRobot);
      finalRobotId = newRobotId;
      finalRobotName = `${newRobot.name} (${newRobot.manufacturer})`;
    } else {
      const match = knownRobots.find(r => r.id === selectedRobotId);
      if (match) {
        finalRobotName = `${match.name} (${match.manufacturer})`;
      } else {
        finalRobotName = selectedRobotId;
      }
    }

    const parsedDuration = parseFloat(durationMinutes);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      setError('Duration must be a positive number of minutes.');
      return;
    }

    let parsedQuality: number | null = null;
    if (qualityScore.trim() !== '') {
      const q = parseFloat(qualityScore);
      if (isNaN(q) || q < 0 || q > 100) {
        setError('Quality score must be a number between 0 and 100.');
        return;
      }
      parsedQuality = q;
    }

    const parsedPoints = parseFloat(pointsEarned);
    if (isNaN(parsedPoints) || parsedPoints < 0) {
      setError('Points earned must be a non-negative number.');
      return;
    }

    onSave({
      date,
      robotId: finalRobotId,
      robotName: finalRobotName,
      durationMinutes: parsedDuration,
      qualityScore: parsedQuality,
      pointsEarned: parsedPoints,
      note: note.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#202020] border border-[rgba(223,216,208,0.15)] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[rgba(223,216,208,0.1)] flex items-center justify-between bg-[#1A1A1A]">
          <h2 className="text-lg font-semibold font-serif-editorial text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#B87A4F]" />
            <span>{initialData ? 'Edit Teleop Session' : 'Log New Teleop Session'}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-[#9A938A] hover:text-white rounded-lg hover:bg-[rgba(223,216,208,0.08)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 font-medium text-xs">
              {error}
            </div>
          )}

          {/* Date Picker */}
          <div>
            <label className="block text-[#DFD8D0] font-medium mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B87A4F]" />
              <span>Session Date</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#141414] text-[#DFD8D0] border border-[rgba(223,216,208,0.15)] rounded-lg p-2.5 focus:outline-none focus:border-[#B87A4F]"
            />
          </div>

          {/* Robot Selector */}
          <div>
            <label className="block text-[#DFD8D0] font-medium mb-1 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-[#B87A4F]" />
              <span>Robot Arm Used</span>
            </label>

            {!isAddingCustomRobot ? (
              <div className="space-y-2">
                <select
                  value={selectedRobotId}
                  onChange={(e) => {
                    if (e.target.value === 'CUSTOM_NEW') {
                      setIsAddingCustomRobot(true);
                    } else {
                      setSelectedRobotId(e.target.value);
                    }
                  }}
                  className="w-full bg-[#141414] text-[#DFD8D0] border border-[rgba(223,216,208,0.15)] rounded-lg p-2.5 focus:outline-none focus:border-[#B87A4F] cursor-pointer"
                >
                  <optgroup label="Official PrismaX Fleet">
                    {knownRobots.filter(r => r.isOfficial).map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} — {r.manufacturer} ({r.badge || 'Official'})
                      </option>
                    ))}
                  </optgroup>

                  {knownRobots.filter(r => !r.isOfficial).length > 0 && (
                    <optgroup label="Custom Robots">
                      {knownRobots.filter(r => !r.isOfficial).map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name} ({r.manufacturer})
                        </option>
                      ))}
                    </optgroup>
                  )}

                  <option value="CUSTOM_NEW" className="text-[#C5885C]">
                    + Add New Custom Robot...
                  </option>
                </select>
              </div>
            ) : (
              <div className="p-3 bg-[#141414] border border-[rgba(184,122,79,0.3)] rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#C5885C]">Adding Custom Robot</span>
                  <button
                    type="button"
                    onClick={() => setIsAddingCustomRobot(false)}
                    className="text-[10px] text-[#9A938A] underline hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Robot Name (e.g. Unitree H1, Franka Emika)"
                  value={customRobotName}
                  onChange={(e) => setCustomRobotName(e.target.value)}
                  className="w-full bg-[#202020] text-[#DFD8D0] border border-[rgba(223,216,208,0.15)] rounded p-2 focus:outline-none focus:border-[#B87A4F]"
                />
                <input
                  type="text"
                  placeholder="Manufacturer / Brand (e.g. Unitree Robotics)"
                  value={customManufacturer}
                  onChange={(e) => setCustomManufacturer(e.target.value)}
                  className="w-full bg-[#202020] text-[#DFD8D0] border border-[rgba(223,216,208,0.15)] rounded p-2 focus:outline-none focus:border-[#B87A4F]"
                />
              </div>
            )}
          </div>

          {/* Duration & Points in Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#DFD8D0] font-medium mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B87A4F]" />
                <span>Duration (Minutes)</span>
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                placeholder="60"
                className="w-full bg-[#141414] text-[#DFD8D0] font-mono-numbers border border-[rgba(223,216,208,0.15)] rounded-lg p-2.5 focus:outline-none focus:border-[#B87A4F]"
              />
              <span className="text-[10px] text-[#9A938A] mt-0.5 block">
                {parseFloat(durationMinutes) ? `= ${(parseFloat(durationMinutes) / 60).toFixed(1)} hours` : ''}
              </span>
            </div>

            <div>
              <label className="block text-[#DFD8D0] font-medium mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B87A4F]" />
                <span>Prisma Points ($PIX)</span>
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={pointsEarned}
                onChange={(e) => setPointsEarned(e.target.value)}
                placeholder="1500"
                className="w-full bg-[#141414] text-[#DFD8D0] font-mono-numbers border border-[rgba(223,216,208,0.15)] rounded-lg p-2.5 focus:outline-none focus:border-[#B87A4F]"
              />
            </div>
          </div>

          {/* Quality Score */}
          <div>
            <label className="block text-[#DFD8D0] font-medium mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#B87A4F]" />
                <span>Verify Quality Score (0 - 100)</span>
              </span>
              <span className="text-[10px] text-[#9A938A] font-normal">(Optional)</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={qualityScore}
              onChange={(e) => setQualityScore(e.target.value)}
              placeholder="e.g. 95.5 (Leave blank if pending evaluation)"
              className="w-full bg-[#141414] text-[#DFD8D0] font-mono-numbers border border-[rgba(223,216,208,0.15)] rounded-lg p-2.5 focus:outline-none focus:border-[#B87A4F]"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[#DFD8D0] font-medium mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#B87A4F]" />
                <span>Session Notes / Task details</span>
              </span>
              <span className="text-[10px] text-[#9A938A] font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe task type (e.g. Pick and place, force feedback tuning, trajectory smoothing)..."
              className="w-full bg-[#141414] text-[#DFD8D0] border border-[rgba(223,216,208,0.15)] rounded-lg p-2.5 focus:outline-none focus:border-[#B87A4F]"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[rgba(223,216,208,0.1)]">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary px-5 py-2 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{initialData ? 'Update Session' : 'Save Session'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
