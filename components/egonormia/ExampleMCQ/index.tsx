"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const ExampleMCQ = () => {
  const [playing, setPlaying] = useState<number | null>(null);
  
  const handlePlayVideo = (videoId: number): void => {
    setPlaying(videoId === playing ? null : videoId);
  };
  
  // Icons for different model choices and indicators
  const CheckIcon = () => (
    <span className="inline-flex items-center justify-center w-5 h-5 bg-green-500 text-white rounded-md">✓</span>
  );
  
  const XIcon = () => (
    <span className="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-md">✗</span>
  );

  const videos = [
    {
      id: 1,
      title: "Video 1: Visitor at Scenic Viewpoint",
      url: "https://storage.googleapis.com/physical-social-norm/sampled_snippets_new_new/32c34069-0111-4d89-9e55-1c68f18705ad/32c34069-0111-4d89-9e55-1c68f18705ad_8758-17_prev.mp4",
      previewImage: "https://storage.googleapis.com/physical-social-norm/sampled_frames_new_new/32c34069-0111-4d89-9e55-1c68f18705ad_8758-17/frame_0_prev.jpg",
      actions: [
        { id: "A", text: "Point the camera at the view and take a picture.", isCorrect: true, modelChoice: "diamond", modelTag: "Gemini 1.5 Pro" },
        { id: "B", text: "Hold onto the railing and carefully move along the path while watching.", isCorrect: false, modelChoice: "diamond", modelTag: "o3-mini" },
        { id: "C", text: "Inspect the surface for debris and clean any obstructed areas.", isCorrect: false },
        { id: "D", text: "Examine the structure closely and make notes.", isCorrect: false },
        { id: "E", text: "None of the Above.", isCorrect: false }
      ],
      justifications: [
        { id: "A", text: "Documenting the view is a common practice for visitors.", isCorrect: true, modelChoice: "diamond", modelTag: "Gemini 1.5 Pro" },
        { id: "B", text: "Safety is paramount when navigating potentially hazardous paths.", isCorrect: false, modelChoice: "diamond", modelTag: "o3-mini" },
        { id: "C", text: "Maintaining cleanliness ensures a safe and enjoyable experience for everyone.", isCorrect: false },
        { id: "D", text: "Preserving structures requires noting damage for maintenance.", isCorrect: false },
        { id: "E", text: "None of the Above.", isCorrect: false }
      ],
      reasoning: [
        {
          type: "gemini",
          content: [
            { text: "... ", isUnderlined: false },
            { text: "photographer", isUnderlined: true, icon: "check" },
            { text: " ... continue this activity by ", isUnderlined: false },
            { text: "taking the picture", isUnderlined: true, icon: "check" },
            { text: " ...", isUnderlined: false }
          ]
        },
        {
          type: "o3",
          content: [
            { text: "... at a ", isUnderlined: false },
            { text: "scenic viewpoint", isUnderlined: true, icon: "check" },
            { text: ", he is ", isUnderlined: false },
            { text: "moving frequently", isUnderlined: true, icon: "x" },
            { text: " ... Thus, \"", isUnderlined: false },
            { text: "Hold onto the railing", isUnderlined: true, icon: "x" }, 
            { text: "\" is the most appropriate choice.", isUnderlined: false }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Video 2: Fitness Training Session",
      url: "https://storage.googleapis.com/physical-social-norm/sampled_snippets_new_new/6070d9d1-9962-49f3-8ac7-4e29ca07e104/6070d9d1-9962-49f3-8ac7-4e29ca07e104_164-20_prev.mp4",
      previewImage: "https://storage.googleapis.com/physical-social-norm/sampled_frames_new_new/6070d9d1-9962-49f3-8ac7-4e29ca07e104_164-20/frame_0_prev.jpg",
      actions: [
        { id: "A", text: "Spot the person during their lift and provide support.", isCorrect: false, modelChoice: "diamond", modelTag: "Gemini 1.5 Pro" },
        { id: "B", text: "Adjust the resistance machine settings according to the patient's capabilities", isCorrect: false, modelChoice: "diamond", modelTag: "o3-mini" },
        { id: "C", text: "Provide verbal encouragement and maintain proper form.", isCorrect: false },
        { id: "D", text: "Demonstrate proper technique slowly while explaining movement.", isCorrect: true },
        { id: "E", text: "None of the Above.", isCorrect: false }
      ],
      justifications: [
        { id: "A", text: "Providing support during a lift prioritizes safety and demonstrates care.", isCorrect: false, modelChoice: "diamond", modelTag: "Gemini 1.5 Pro" },
        { id: "B", text: "Adjusting resistance ensures the client's safety and success", isCorrect: false, modelChoice: "diamond", modelTag: "o3-mini" },
        { id: "C", text: "Encouragement and maintaining proper form promotes safety and positive reinforcement.", isCorrect: false },
        { id: "D", text: "Demonstrating proper technique aids understanding and prevents injury.", isCorrect: true },
        { id: "E", text: "None of the Above.", isCorrect: false }
      ],
      reasoning: [
        {
          type: "gemini",
          content: [
            { text: "... ongoing ", isUnderlined: false },
            { text: "leg press exercise", isUnderlined: true, icon: "x" },
            { text: " ... continue supporting her during the ", isUnderlined: false },
            { text: "lift", isUnderlined: true, icon: "x" },
            { text: " ...", isUnderlined: false }
          ]
        },
        {
          type: "o3",
          content: [
            { text: "... in the midst of a ", isUnderlined: false },
            { text: "leg workout session", isUnderlined: true, icon: "check" },
            { text: " ... to provide ", isUnderlined: false },
            { text: "verbal encouragement", isUnderlined: true, icon: "x" },
            { text: " ...", isUnderlined: false }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Video 3: Furniture Moving Assistance",
      url: "https://storage.googleapis.com/physical-social-norm/sampled_snippets_v2/cea9a5cc-6682-474f-bae4-483ca722ec43/cea9a5cc-6682-474f-bae4-483ca722ec43_359-69_prev.mp4",
      previewImage: "https://storage.googleapis.com/physical-social-norm/sampled_frames_v2/cea9a5cc-6682-474f-bae4-483ca722ec43_359-69/frame_0_prev.jpg",
      actions: [
        { id: "A", text: "Hold the table steady while the other person adjusts their grip or secures footing.", isCorrect: false },
        { id: "B", text: "Step aside and give the person space to complete their task.", isCorrect: false, modelChoice: "diamond", modelTag: "o3-mini" },
        { id: "C", text: "Lift one side of the couch and coordinate movement across the room.", isCorrect: true, modelChoice: "diamond", modelTag: "Gemini 1.5 Pro" },
        { id: "D", text: "Ask the person where they would like the item placed.", isCorrect: false },
        { id: "E", text: "None of the Above.", isCorrect: false }
      ],
      justifications: [
        { id: "A", text: "Helping others maintain stability is socially responsible.", isCorrect: false },
        { id: "B", text: "Giving space shows consideration for others' autonomy.", isCorrect: false, modelChoice: "diamond", modelTag: "o3-mini" },
        { id: "C", text: "Cooperative moving is a social norm.", isCorrect: true, modelChoice: "diamond", modelTag: "Gemini 1.5 Pro" },
        { id: "D", text: "Respectful communication is key to good teamwork.", isCorrect: false },
        { id: "E", text: "None of the Above.", isCorrect: false }
      ],
      reasoning: [
        {
          type: "gemini",
          content: [
            { text: "... The subject is helping ", isUnderlined: false },
            { text: "someone lift the couch", isUnderlined: true, icon: "check" },
            { text: " ... assist in ", isUnderlined: false },
            { text: "lifting and moving the couch", isUnderlined: true, icon: "check" },
            { text: ".", isUnderlined: false }
          ]
        },
        {
          type: "o3",
          content: [
            { text: "...engaged in a ", isUnderlined: false },
            { text: "playful, self-directed activity", isUnderlined: true, icon: "x" },
            { text: " that does not require ", isUnderlined: false },
            { text: "external assistance", isUnderlined: true, icon: "x" },
            { text: " ...", isUnderlined: false }
          ]
        }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {videos.map((video, index) => (
        <React.Fragment key={video.id}>
          <div className="mb-8">
            {/* Video Title */}
            <h2 className="text-xl font-bold mb-2">{video.title}</h2>
            
            {/* Video Row */}
            <div className="mb-4">
              <div className="border border-gray-600 relative">
                {playing === video.id ? (
                  <video 
                    width="100%" 
                    height="auto"
                    controls
                    autoPlay
                    onClick={() => handlePlayVideo(video.id)}
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="relative cursor-pointer" onClick={() => handlePlayVideo(video.id)}>
                    <Image 
                      src={video.previewImage} 
                      alt={`Video ${video.id} preview`}
                      className="w-full h-auto"
                      width={640}
                      height={360}
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 text-sm">
                  Video {video.id}
                </div>
              </div>
            </div>
            
            {/* Secondary header row - Action, Justification, Reasoning */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-green-200 dark:bg-green-800 border border-gray-600 p-3 font-bold text-center text-lg">Action</div>
              <div className="bg-yellow-200 dark:bg-yellow-800 border border-gray-600 p-3 font-bold text-center text-lg">Justification</div>
              <div className="bg-red-200 dark:bg-red-800 border border-gray-600 p-3 font-bold text-center text-lg">Reasoning</div>
            </div>
            
            {/* Action, Justification, Reasoning Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Actions Column */}
              <div className="border border-gray-600 p-4">
                {video.actions.map((action) => (
                  <div key={action.id} className="mb-2">
                    <span className={action.isCorrect ? "font-bold underline" : ""}>
                      {action.id}. {action.text}
                    </span>
                    {action.modelChoice && action.modelTag && (
                      <span className="ml-1 text-xs bg-blue-500 bg-opacity-20 px-2 py-1 rounded-md">
                        {action.modelTag}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Justifications Column */}
              <div className="border border-gray-600 p-4">
                {video.justifications.map((justification) => (
                  <div key={justification.id} className="mb-2">
                    <span className={justification.isCorrect ? "font-bold underline" : ""}>
                      {justification.id}. {justification.text}
                    </span>
                    {justification.modelChoice && justification.modelTag && (
                      <span className="ml-1 text-xs bg-blue-500 bg-opacity-20 px-2 py-1 rounded-md">
                        {justification.modelTag}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Reasoning Column */}
              <div className="border border-gray-600 p-4">
                {video.reasoning.map((reasoning, idx) => (
                  <div key={idx} className="mb-4 p-3 border border-gray-500 rounded">
                    <div className="font-bold mb-2">
                      {reasoning.type === "gemini" ? "Gemini 1.5 Pro reasoning:" : "o3-mini reasoning:"}
                    </div>
                    <div>
                      {reasoning.content.map((contentItem, contentIdx) => (
                        <span key={contentIdx}>
                          {contentItem.isUnderlined ? (
                            <span className="underline font-medium">
                              {contentItem.text}
                            </span>
                          ) : (
                            <span>{contentItem.text}</span>
                          )}
                          {contentItem.icon === "check" && <span> <CheckIcon /></span>}
                          {contentItem.icon === "x" && <span> <XIcon /></span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Separator line */}
          {index < videos.length - 1 && (
            <hr className="my-10 border-t-2 border-gray-400 dark:border-gray-600" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ExampleMCQ;