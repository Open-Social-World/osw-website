import Image from 'next/image';
import { FigureProps } from '@/types/article';

export function Figure({ src, alt }: FigureProps) {
  return (
          <Image 
            src={src} 
            alt={alt} 
            fill
            className="rounded-lg"
          />
  );
}