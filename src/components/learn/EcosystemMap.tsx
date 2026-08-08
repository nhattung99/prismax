import React, { useState } from 'react';
import { Network, ExternalLink, Bot, Landmark, Layers, Building2 } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C1C1C] border border-[#4B463F] rounded-md p-4">
        <div>
          <h2 className="text-xl font-bold font-serif-editorial text-[#FCF4EC] flex items-center gap-2">
            <Network className="w-5 h-5 text-[#B87A4F]" />
            <span>PrismaX Ecosystem Network</span>
          </h2>
          <p className="font-body-md text-xs text-[#CDC5BC] mt-0.5">
            Verified network directory of investors, Day 1 Launch Partners, robot hardware manufacturers, and live products
          </p>
        </div>

        {/* Sector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#131313] p-1 rounded border border-[#4B463F]">
          {sectors.map((s) => {
            const isActive = selectedSector === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSector(s.id)}
                className={`font-label-mono text-xs px-3 py-1.5 rounded transition-all ${
                  isActive
                    ? 'bg-[#DFD8D0] text-[#131313] font-bold'
                    : 'text-[#CDC5BC] hover:text-[#FCF4EC] hover:bg-[#202020]'
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
              case 'backers': return 'border-l-[#D9A45C]';
              case 'launch_partners': return 'border-l-[#7CB88F]';
              case 'device_partners': return 'border-l-[#B87A4F]';
              default: return 'border-l-purple-400';
            }
          };

          return (
            <div key={sector.id} className="space-y-4">
              
              {/* Sector Title */}
              <div className="flex items-center gap-2 border-b border-[#4B463F] pb-2">
                {sector.id === 'backers' ? (
                  <Landmark className="w-5 h-5 text-[#D9A45C]" />
                ) : sector.id === 'launch_partners' ? (
                  <Building2 className="w-5 h-5 text-[#7CB88F]" />
                ) : sector.id === 'device_partners' ? (
                  <Bot className="w-5 h-5 text-[#B87A4F]" />
                ) : (
                  <Layers className="w-5 h-5 text-purple-400" />
                )}

                <div>
                  <h3 className="font-headline-md text-lg font-bold font-serif-editorial text-[#FCF4EC]">
                    {sector.title}
                  </h3>
                  <p className="font-body-md text-xs text-[#969087]">{sector.description}</p>
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
                      className={`bg-[#202020] p-5 border-l-4 ${getSectorBorder()} border-t border-r border-b border-[#4B463F] rounded-md flex flex-col justify-between hover:bg-[#262626] transition-all`}
                    >
                      <div>
                        {robotPic && (
                          <div className="w-full h-32 mb-3 bg-[#131313] border border-[#4B463F] rounded flex items-center justify-center p-2">
                            <img src={robotPic} alt={entity.name} className="w-full h-full object-contain" />
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-headline-md text-sm font-bold text-[#FCF4EC]">
                            {entity.name}
                          </h4>
                          {entity.badge && (
                            <span className="font-label-tag text-[10px] uppercase px-2 py-0.5 rounded bg-[#131313] text-[#B87A4F] border border-[#4B463F] shrink-0 font-semibold">
                              {entity.badge}
                            </span>
                          )}
                        </div>

                        <p className="font-body-md text-xs text-[#CDC5BC] leading-relaxed">
                          {entity.description}
                        </p>
                      </div>

                      {entity.url && (
                        <div className="mt-4 pt-3 border-t border-[#4B463F]">
                          <a
                            href={entity.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-label-mono text-xs text-[#B87A4F] hover:text-[#FCF4EC] font-medium inline-flex items-center gap-1 transition-colors"
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
