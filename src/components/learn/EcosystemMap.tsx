import React, { useState } from 'react';
import { Network, ExternalLink, Bot, Landmark, Layers, Building2, Heart } from 'lucide-react';
import { ECOSYSTEM_SECTORS } from '../../data/learnContent';

interface EcosystemMapProps {
  searchQuery: string;
}

export const EcosystemMap: React.FC<EcosystemMapProps> = ({ searchQuery }) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const sectors = [
    { id: 'all', label: 'All Sectors' },
    { id: 'backers', label: 'Lead Backers' },
    { id: 'launch_partners', label: 'Day 1 Launch Partners' },
    { id: 'device_partners', label: 'Device Partners' },
    { id: 'products', label: 'Platform Products' }
  ];

  const filteredSectors = ECOSYSTEM_SECTORS.filter((sec) => {
    return selectedSector === 'all' || sec.id === selectedSector;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-2 border-[#FFC2D1] rounded-3xl p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-serif-editorial text-[#3A2D32] flex items-center gap-2">
            <Network className="w-5 h-5 text-[#FF6B8B]" />
            <span>PrismaX Ecosystem Network</span>
            <Heart className="w-4 h-4 text-[#FF4D6D] fill-[#FF4D6D]" />
          </h2>
          <p className="font-sans text-xs text-[#6E5762] mt-0.5 font-medium">
            Verified network directory of investors, Day 1 Launch Partners, robot hardware manufacturers, and live products
          </p>
        </div>

        {/* Sector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FFF0F5] p-1.5 rounded-full border border-[#FFC2D1]">
          {sectors.map((s) => {
            const isActive = selectedSector === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSector(s.id)}
                className={`font-sans text-xs px-3.5 py-1.5 rounded-full transition-all font-bold ${
                  isActive
                    ? 'bg-[#FF4D6D] text-white shadow-sm'
                    : 'text-[#6E5762] hover:text-[#FF4D6D] hover:bg-white'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sectors List */}
      <div className="space-y-8">
        {filteredSectors.map((sector) => {
          const matchingEntities = sector.entities.filter(e =>
            e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.description.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (matchingEntities.length === 0 && searchQuery) return null;

          const getSectorBorder = () => {
            switch (sector.id) {
              case 'backers': return 'border-l-[#FFB703]';
              case 'launch_partners': return 'border-l-[#52B788]';
              case 'device_partners': return 'border-l-[#FF6B8B]';
              default: return 'border-l-[#B388FF]';
            }
          };

          return (
            <div key={sector.id} className="space-y-4">
              
              {/* Sector Title */}
              <div className="flex items-center gap-2 border-b border-[#FFC2D1] pb-2">
                {sector.id === 'backers' ? (
                  <Landmark className="w-5 h-5 text-[#FFB703]" />
                ) : sector.id === 'launch_partners' ? (
                  <Building2 className="w-5 h-5 text-[#52B788]" />
                ) : sector.id === 'device_partners' ? (
                  <Bot className="w-5 h-5 text-[#FF6B8B]" />
                ) : (
                  <Layers className="w-5 h-5 text-[#B388FF]" />
                )}

                <div>
                  <h3 className="font-headline-md text-lg font-bold font-serif-editorial text-[#3A2D32]">
                    {sector.title}
                  </h3>
                  <p className="font-sans text-xs text-[#8F727D] font-medium">{sector.description}</p>
                </div>
              </div>

              {/* Entity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchingEntities.map((entity, idx) => {
                  // Determine robot picture for device partners
                  let robotPic = null;
                  if (sector.id === 'device_partners') {
                    if (entity.name.includes('Agilex')) robotPic = '/images/robot_torso.png';
                    else if (entity.name.includes('Airbot')) robotPic = '/images/robot_quadruped.png';
                    else if (entity.name.includes('I2RT')) robotPic = '/images/robot_humanoid.png';
                    else robotPic = '/images/robot_cat.png';
                  }

                  return (
                    <div
                      key={idx}
                      className={`bg-white p-5 border-l-4 ${getSectorBorder()} border-t border-r border-b border-[#FFC2D1] rounded-2xl flex flex-col justify-between hover:bg-[#FFF5F8] transition-all shadow-xs`}
                    >
                      <div>
                        {robotPic && (
                          <div className="w-full h-32 mb-3 bg-[#FFF0F5] border border-[#FFC2D1] rounded-xl flex items-center justify-center p-2">
                            <img src={robotPic} alt={entity.name} className="w-full h-full object-contain" />
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-serif-editorial text-base font-bold text-[#3A2D32]">
                            {entity.name}
                          </h4>
                          {entity.badge && (
                            <span className="font-sans text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#FFF0F3] text-[#FF4D6D] border border-[#FFC2D1] shrink-0 font-bold">
                              {entity.badge}
                            </span>
                          )}
                        </div>

                        <p className="font-sans text-xs text-[#6E5762] leading-relaxed font-medium">
                          {entity.description}
                        </p>
                      </div>

                      {entity.url && (
                        <div className="mt-4 pt-3 border-t border-[#FFD6E0]">
                          <a
                            href={entity.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-sans text-xs text-[#FF4D6D] hover:text-[#E0527F] font-bold inline-flex items-center gap-1 transition-colors"
                          >
                            <span>VISIT LINK</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
