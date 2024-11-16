import React from 'react';
import { MapPin } from 'lucide-react';

const SAMPLE_CINEMAS = {
  bangkok: {
    name: 'Bangkok And Metropolitan Region',
    cinemas: [
      'Emprive Cineclub Emporium Sukhumvit',
      'SF WORLD CINEMA Central World',
      'SFX CINEMA Central Rama 9',
      'SFX CINEMA Central Ladprao',
      'SFX CINEMA Central Chaengwattana',
    ],
  },
  northeastern: {
    name: 'Northeastern Region',
    cinemas: [
      'SFX CINEMA Central Korat',
      'SF CINEMA Terminal 21 Korat',
      'SF CINEMA Central Khonkaen',
      'SF CINEMA Sunee Tower Ubonratchathani',
      'SF CINEMA Landmark Plaza Udonthani',
    ],
  },
  eastern: {
    name: 'Eastern Region',
    cinemas: [
      'SFX CINEMA Central Pattaya',
      'SF CINEMA Terminal 21 Pattaya',
      'SF CINEMA Central Rayong',
      'SF CINEMA Robinson Chanthaburi',
      'SF CINEMA Central Chonburi',
    ],
  },
};

const Cinemas: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Cinemas
        </h1>
        {Object.values(SAMPLE_CINEMAS).map((region) => (
          <div key={region.name} className="mb-8">
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">
              {region.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {region.cinemas.map((cinemaName) => (
                <div
                  key={cinemaName}
                  className="bg-white rounded-lg shadow p-4 flex items-center"
                >
                  <MapPin className="w-6 h-6 text-orange-500 mr-4" />
                  <span className="text-lg">{cinemaName}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cinemas;