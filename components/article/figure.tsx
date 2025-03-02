import Image from 'next/image';
import { FigureProps } from '@/types/article';

export function Figure({ src, darkSrc, alt }: FigureProps) {
  if (darkSrc) {
    return (
      <picture>
        <source srcSet={darkSrc} media="(prefers-color-scheme: dark)" />
        <source srcSet={src} />
        <Image 
          src={src} 
          alt={alt} 
          fill
          className="rounded-lg"
        />
      </picture>
    );
  }
  else {
    return (
      <Image 
        src={src} 
        alt={alt} 
        fill
        className="rounded-lg"
      />
);
  }
}