"use client";

import React, { Fragment, useState } from 'react';
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
    name: "Philippe Cuvin",
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
  const [extension, setExtension] = useState<string>('png');
  const [hasError, setHasError] = useState(false);
  const firstName = name.split(' ')[0];

  const handleImageError = () => {
    if (extension === 'png' && !hasError) {
      setExtension('jpg');
      setHasError(true);
    }
  };

  return (
    <Image
      src={`/images/people/${firstName}.${extension}`}
      alt={`${name}'s profile`}
      fill
      className="object-cover hover:opacity-90 transition-opacity"
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default function PeopleGrid(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {people.map((person, index) => (
          <Fragment key={index}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <a 
                href={person.personalURL}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square w-full cursor-pointer"
              >
                <ProfileImage name={person.name} />
              </a>
              <div className="p-6">
                <a 
                  href={person.personalURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 block"
                >
                  {person.name}
                </a>
                <a
                  href={person.affiliationURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors block"
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