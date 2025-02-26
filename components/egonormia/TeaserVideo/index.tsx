"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const SocialInteractionScenario = () => {

  const taxonomyColors = {
    safety: 'text-[#246D63]',
    privacy: 'text-[#5C4C99]',
    proxemics: 'text-[#D87CA6]',
    politeness: 'text-[#356ABC]',
    cooperation: 'text-[#C65B4E]',
    coordination: 'text-[#E6A700]',
    communication: 'text-[#EA772F]'
  };

  const behaviors = [
    {
      id: 'A',
      text: 'Step into the mud to help the person free their boot together.',
      taxonomy: 'Cooperation',
      color: taxonomyColors.cooperation,
      isCorrect: false
    },
    {
      id: 'B',
      text: 'Maintain a distance, avoid unnecessary body contact and offer verbal encouragement.',
      taxonomy: 'Politeness & Proxemics',
      color: `${taxonomyColors.politeness} ${taxonomyColors.proxemics.replace('text-', 'text-')}`,
      isCorrect: false
    },
    {
      id: 'C',
      text: 'Proceed to the dry ground to let the person use your body as an anchor to free their boot.',
      taxonomy: 'Cooperation & Coordination',
      color: `${taxonomyColors.cooperation} ${taxonomyColors.coordination.replace('text-', 'text-')}`,
      isCorrect: true
    },
    {
      id: 'D',
      text: 'Step back, choose an alternate route to not get stuck.',
      taxonomy: 'Safety',
      color: taxonomyColors.safety,
      isCorrect: false
    },
    {
      id: 'E',
      text: 'None of the above.',
      taxonomy: '',
      color: '',
      isCorrect: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header Section */}
      <Card className="mb-6 border-t-4 border-t-black dark:border-t-white md:w-3/4 lg:w-2/3 mx-auto">
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl font-bold mb-1 text-black dark:text-white">Example Video</h1>
            <p className="text-right italic text-gray-600 dark:text-gray-400 text-sm">Ego-centric videos before a social interaction happens.</p>
          </div>
          
          <div className="bg-black p-2">
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              <video 
                className="w-full h-full object-cover" 
                controls
                src="https://storage.googleapis.com/physical-social-norm/sampled_snippets_new_new/19f2ea20-5041-4be2-bdc9-714473f16236/19f2ea20-5041-4be2-bdc9-714473f16236_1915-00_prev.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Section */}
      <div className="mb-6 mx-auto">
        <h2 className="text-2xl font-bold border-b-2 border-black dark:border-white pb-2 mb-4">Action</h2>
        <div className="text-center mb-6 mx-auto md:w-3/4 lg:w-2/3">
          <p className="text-lg md:text-base">What should the person who is wearing the camera do after this?</p>
        </div>

        <div className="space-y-3 mx-auto md:w-5/6 lg:w-3/4">
          {behaviors.map((behavior) => (
            <div 
              key={behavior.id}
              className={`flex items-start p-3 ${
                behavior.id === 'C' ? 'border-2 border-dashed border-gray-400' : ''
              }`}
            >
              <div className="flex-shrink-0 mr-4">
                <Badge className="text-lg h-7 w-7 rounded-full bg-white dark:bg-gray-800 border-2 border-black dark:border-white text-black dark:text-white font-bold flex items-center justify-center">
                  {behavior.id}
                </Badge>
              </div>
              <div className="flex-grow">
                <p className="text-base">{behavior.text}</p>
                {behavior.taxonomy && (
                  <p className="mt-1 font-medium text-sm">
                    {behavior.taxonomy.includes('&') ? (
                      <>
                        {behavior.id === 'B' ? (
                          <>
                            <span className={taxonomyColors.politeness}>Politeness</span>
                            {' & '}
                            <span className={taxonomyColors.proxemics}>Proxemics</span>
                          </>
                        ) : (
                          <>
                            <span className={taxonomyColors.cooperation}>Cooperation</span>
                            {' & '}
                            <span className={taxonomyColors.coordination}>Coordination</span>
                          </>
                        )}
                      </>
                    ) : (
                      <span className={behavior.color}>{behavior.taxonomy}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-8 border-t border-black dark:border-white mx-auto" />

      {/* Justification Section */}
      <div className="mx-auto">
        <h2 className="text-2xl font-bold border-b-2 border-black dark:border-white pb-2 mb-4">Justification</h2>
        <div className="text-center mb-6 mx-auto md:w-3/4 lg:w-2/3">
          <p className="text-lg md:text-base">What is the reason why you chose the above action?</p>
        </div>

        <div className="space-y-3 mx-auto md:w-5/6 lg:w-3/4">
          {[
            {
              id: 'A',
              text: 'In a race, one is expected to help competitors if they fall.',
              isCorrect: false
            },
            {
              id: 'B',
              text: 'One should only contact those they know personally.',
              isCorrect: false
            },
            {
              id: 'C',
              text: 'Helping others is expected, but not at the cost of harm to oneself.',
              isCorrect: true
            },
            {
              id: 'D',
              text: 'It is critically important to avoid injury when far from help.',
              isCorrect: false
            },
            {
              id: 'E',
              text: 'None of the above.',
              isCorrect: false
            }
          ].map((justification) => (
            <div 
              key={justification.id}
              className={`flex items-start p-3 ${
                justification.id === 'C' ? 'border-2 border-dashed border-gray-400' : ''
              }`}
            >
              <div className="flex-shrink-0 mr-4">
                <Badge className="text-lg h-7 w-7 rounded-full bg-white dark:bg-gray-800 border-2 border-black dark:border-white text-black dark:text-white font-bold flex items-center justify-center">
                  {justification.id}
                </Badge>
              </div>
              <div className="flex-grow">
                <p className="text-base">{justification.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialInteractionScenario;