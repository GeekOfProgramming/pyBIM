import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';

export default function ComplianceSection() {
  return (
    <section className="bg-[#0A0A0A] py-24 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 text-center">
          <h2 className="text-[#FAFAFA] text-4xl font-bold mb-6">
            Standards & <span className="text-[#3B82F6]">Compliance</span>
          </h2>
          <div className="inline-block bg-[#171717] border border-[#3B82F6]/30 p-8 rounded-2xl max-w-4xl text-left shadow-[0_0_30px_rgba(59,130,246,0.1)] relative">
            <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#0A0A0A] px-2 text-[#3B82F6] text-4xl font-serif">"</div>
            <p className="text-[#FAFAFA] text-lg font-medium leading-relaxed italic">
              Whether your contract is based on international standards (LOD 400) or national Italian regulations (UNI 11337 - LOD E), our automation scripts intelligently map and translate your model parameters. We have reduced human error in standard compliance to zero.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Global Standards */}
          <div>
            <div className="flex items-center gap-3 mb-8 border-b border-[#262626] pb-4">
              <Globe className="w-8 h-8 text-[#3B82F6]" />
              <h3 className="text-2xl font-bold text-[#FAFAFA]">Global Standards</h3>
            </div>
            <div className="space-y-6">
              <motion.div whileHover={{ x: 5 }} className="bg-[#171717] p-6 rounded-xl border border-[#262626] hover:border-[#3B82F6] transition-colors">
                <h4 className="text-[#FAFAFA] font-bold text-lg mb-2">ISO 19650</h4>
                <p className="text-[#A3A3A3] text-sm">Organization and digitization of information about buildings and civil engineering works. We ensure perfect CDE structuring.</p>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="bg-[#171717] p-6 rounded-xl border border-[#262626] hover:border-[#3B82F6] transition-colors">
                <h4 className="text-[#FAFAFA] font-bold text-lg mb-2">IFC / OpenBIM (ISO 16739)</h4>
                <p className="text-[#A3A3A3] text-sm">Flawless data exchange between different software platforms, ensuring your models are truly interoperable.</p>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="bg-[#171717] p-6 rounded-xl border border-[#262626] hover:border-[#3B82F6] transition-colors">
                <h4 className="text-[#FAFAFA] font-bold text-lg mb-2">BIMForum LOD (100 - 500)</h4>
                <p className="text-[#A3A3A3] text-sm">The global standard for Level of Development, meticulously mapped through our custom parameter injection scripts.</p>
              </motion.div>
            </div>
          </div>

          {/* Italian Compliance */}
          <div>
            <div className="flex items-center gap-3 mb-8 border-b border-[#262626] pb-4">
              <MapPin className="w-8 h-8 text-[#3B82F6]" />
              <h3 className="text-2xl font-bold text-[#FAFAFA]">Italian Compliance</h3>
            </div>
            <div className="space-y-6">
              <motion.div whileHover={{ x: 5 }} className="bg-[#171717] p-6 rounded-xl border border-[#262626] hover:border-[#3B82F6] transition-colors">
                <h4 className="text-[#FAFAFA] font-bold text-lg mb-2">UNI 11337 (LOD A - G)</h4>
                <p className="text-[#A3A3A3] text-sm">Mastery of the Italian native LOD grading system. We automatically translate standard LODs to the Italian alphabetical system.</p>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="bg-[#171717] p-6 rounded-xl border border-[#262626] hover:border-[#3B82F6] transition-colors">
                <h4 className="text-[#FAFAFA] font-bold text-lg mb-2">LOIN (EN 17412)</h4>
                <p className="text-[#A3A3A3] text-sm">European standard for Level of Information Need, separating geometric detail from alphanumeric data requirements.</p>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="bg-[#171717] p-6 rounded-xl border border-[#262626] hover:border-[#3B82F6] transition-colors">
                <h4 className="text-[#FAFAFA] font-bold text-lg mb-2">Codice degli Appalti</h4>
                <p className="text-[#A3A3A3] text-sm">Guaranteed compliance for Italian public tenders. Your output data is engineered for error-free uploads into the ACDat (Common Data Environment).</p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
