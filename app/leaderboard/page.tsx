import Leaderboard from '@/components/egonormia/leaderboard';
import type { Metadata } from 'next';

// Export metadata for this page
export const metadata: Metadata = {
  title: 'Egonormia Leaderboard',
  description: 'A large scale video dataset and a benchmark for evaluating frontier models\' understanding of physical social norms through videos.',
  openGraph: {
    title: 'Egonormia Leaderboard',
    description: 'A large scale video dataset and a benchmark for evaluating frontier models\' understanding of physical social norms through videos.',
    images: ['/images/psn/leaderboard-metadata.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Egonormia Leaderboard',
    description: 'A large scale video dataset and a benchmark for evaluating frontier models\' understanding of physical social norms through videos.',
    images: ['/images/psn/leaderboard-metadata.svg'],
  },
};

export default function LeaderboardPage() {
  return (
    <>
      <main className="container mx-auto p-0 sm:p-4">
        <Leaderboard />
        <div className="mt-8 text-sm text-gray-600 border-t pt-4">
          <h3 className="font-semibold mb-2">BibTeX</h3>
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
            {`@misc{xxx,
    title={xxx},
    author={xxx},
    year={2025},
    eprint={2501.111111},
    archivePrefix={arXiv},
    primaryClass={cs.CL},
    url={https://arxiv.org/abs/2501.111111},
}`}
          </pre>
        </div>
      </main>
    </>
  );
}