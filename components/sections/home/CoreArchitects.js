"use client";

import homeData from "@/lib/data/home-page-data.json";

export default function CoreArchitects() {
  const data = homeData.coreArchitects;

  const getRoleImage = (id) => {
    return id === 'lead_sys_eng' ? "/Pictures/BIM/bim-0080.jpg" : "/Pictures/BIM/bim-0071.jpg";
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">{data.section_title}</h2>
          {data.section_subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {data.section_subtitle}
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.architects.map((architect) => (
            <div key={architect.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col hover:border-gray-300 transition-all shadow-sm hover:shadow-md">
              <div className="h-64 bg-gray-200 relative">
                <img src={getRoleImage(architect.id)} className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700" alt={architect.role} />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
              </div>
              <div className="p-8 -mt-10 relative z-10">
                <h3 className="text-2xl font-bold text-gray-900">{architect.role}</h3>
                <div className="text-blue-600 text-sm font-mono mb-4">{architect.department}</div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-4">
                  <div className="text-xs text-gray-500 uppercase font-mono font-bold mb-2 flex justify-between">
                    <span>Operational Note</span>
                    <span>{architect.note_id}</span>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    {architect.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
