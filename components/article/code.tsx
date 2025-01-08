import { CodeProps } from '@/types/article';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function Code({ children, language = 'text', className = '' }: CodeProps) {
  return (
    <div className={`my-4 ${className}`}>
      <SyntaxHighlighter 
        language={language} 
        style={tomorrow}
        className="rounded-lg"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}