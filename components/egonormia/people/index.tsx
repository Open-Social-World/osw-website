"use client";

import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';

interface Person {
  name: string;
  personalURL: string;
  affiliation: string;
  affiliationURL: string;
}

const people: Person[] = [
  {
    name: "MohammadHossein Rezaei",
    personalURL: "https://www2.cs.arizona.edu/~mhrezaei/",
    affiliation: "University of Arizona",
    affiliationURL: "https://www.arizona.edu"
  },
  {
    name: "Yicheng Fu",
    personalURL: "https://sofyc.github.io",
    affiliation: "Stanford University",
    affiliationURL: "https://www.stanford.edu"
  },
  {
    name: "Phil Cuvin",
    personalURL: "https://scholar.google.com/citations?user=bDIUeu4AAAAJ&hl=en",
    affiliation: "University of Toronto",
    affiliationURL: "https://www.utoronto.ca"
  },
  {
    name: "Caleb Ziems",
    personalURL: "https://calebziems.com",
    affiliation: "Stanford University",
    affiliationURL: "https://www.stanford.edu"
  },
  {
    name: "Yanzhe Zhang",
    personalURL: "https://stevenyzzhang.github.io/website/",
    affiliation: "Stanford University",
    affiliationURL: "https://www.stanford.edu"
  },
  {
    name: "Hao Zhu",
    personalURL: "https://zhuhao.me",
    affiliation: "Stanford University",
    affiliationURL: "https://www.stanford.edu"
  },
  {
    name: "Diyi Yang",
    personalURL: "https://cs.stanford.edu/~diyiy/",
    affiliation: "Stanford University",
    affiliationURL: "https://www.stanford.edu"
  }
];

const ProfileImage = ({ name }: { name: string }) => {
  const firstName = name.split(' ')[0];

  return (
    <Image
      src={`/images/people/${firstName}.jpg`}
      alt={`${name}'s profile`}
      fill
      className="object-cover hover:opacity-90 transition-opacity"
      loading="lazy"
    />
  );
};

export default function PeopleGrid(): JSX.Element {
  const [peopleArray, setPeopleArray] = useState(people);

  // Function to shuffle the list
  const shuffleArray = () => {
    // Create a copy of the original array to avoid mutating state directly
    const newArray = [...peopleArray];
    
    // Fisher-Yates shuffle algorithm
    for (let i = newArray.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and j
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    
    // Update the state with the shuffled array
    setPeopleArray(newArray);
  };

  useEffect(() => {
    shuffleArray();
  }, []);

  return (
    <div className="container max-w-3xl mx-auto px-12 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {peopleArray.map((person, index) => (
          <Fragment key={index}>
            <div className="rounded-lg shadow-lg">
              <a 
                href={person.personalURL}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square w-full cursor-pointer"
              >
                <ProfileImage name={person.name} />
              </a>
              <div className="pt-6">
                <a 
                  href={person.personalURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md font-semibold  mb-2 block"
                >
                  {person.name}
                </a>
                <a
                  href={person.affiliationURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  {person.affiliation}
                </a>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}