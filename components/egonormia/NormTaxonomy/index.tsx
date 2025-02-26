import React from 'react';
import Image from 'next/image';

// Define the interface for a norm
interface Norm {
  category: string;
  description: string;
  imageFile: string;
}

const NormTaxonomy = () => {
  // Define the norms data structure
  const normsData = {
    nonUtility: [
      { category: "Safety", description: "Pass a knife by its handle.", imageFile: "/images/psn/safety.jpg" },
      { category: "Politeness", description: "High-five w/ your partner.", imageFile: "/images/psn/politeness.jpg" },
      { category: "Privacy", description: "Avoid looking at strangers' screens.", imageFile: "/images/psn/privacy.jpg" },
      { category: "Proxemics", description: "Maintain social distance.", imageFile: "/images/psn/proxemics.jpg" }
    ],
    utility: [
      { category: "Cooperation", description: "Squeeze chalk on your partner's hands.", imageFile: "/images/psn/cooperation.jpg" },
      { category: "Communication", description: "Wave at someone to say \"hello\".", imageFile: "/images/psn/communication.png" },
      { category: "Coordination", description: "Pull your partner out of the mud.", imageFile: "/images/psn/coordination.png" }
    ]
  };

  // Color mapping for category backgrounds with specific hex values
  const categoryColors: Record<string, string> = {
    "Safety": "bg-[#246D63]",
    "Politeness": "bg-[#356ABC]",
    "Privacy": "bg-[#5C4C99]",
    "Proxemics": "bg-[#D87CA6]",
    "Cooperation": "bg-[#C65B4E]",
    "Communication": "bg-[#EA772F]", 
    "Coordination": "bg-[#E6A700]"
  };

  // Component for a single norm card
  const NormCard: React.FC<{ norm: Norm }> = ({ norm }) => (
    <div className="flex flex-col h-full border border-gray-200 shadow-sm rounded-sm overflow-hidden">
      <div className={`${categoryColors[norm.category]} text-white text-center py-2 font-bold`}>
        {norm.category}
      </div>
      <div className="h-36 sm:h-40 md:h-48 overflow-hidden flex items-center justify-center relative">
        <Image 
          src={norm.imageFile} 
          alt={norm.category} 
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div className="p-3 flex-grow">
        {norm.description}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Main container */}
      <div className="flex flex-col gap-8">
        {/* Non-Utility Norms Section */}
        <div>
          <div className="border-b-2 border-gray-800 mb-4">
            <h2 className="text-2xl font-bold">Non-Utility Norms</h2>
          </div>
          {/* Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {normsData.nonUtility.map((norm, index) => (
              <NormCard key={`non-utility-${index}`} norm={norm} />
            ))}
          </div>
        </div>

        {/* Utility Norms Section */}
        <div>
          <div className="border-b-2 border-gray-800 mb-4">
            <h2 className="text-2xl font-bold">Utility Norms</h2>
          </div>
          <div className="flex justify-center">
            {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-3/4">
              {normsData.utility.map((norm, index) => (
                <NormCard key={`utility-${index}`} norm={norm} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormTaxonomy;