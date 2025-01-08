import { AbstractProps } from '@/types/article'

export function Abstract({ children }: AbstractProps) {
  return (
    <div className="my-8 text-lg text-gray-600 border-l-4 border-gray-200 pl-6">
      {children}
    </div>
  );
}
