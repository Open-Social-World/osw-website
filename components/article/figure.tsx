import Image from 'next/image';
import { FigureProps } from '@/types/article';

export function Figure({ src, alt, caption, className = '' }: FigureProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="relative">
          <Image 
            src={src} 
            alt={alt} 
            layout="responsive"
            width={1200}
            height={800}
            className="rounded-lg"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}