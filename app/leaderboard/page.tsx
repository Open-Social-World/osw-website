import Leaderboard from '@/components/egonormia/leaderboard';
import type { Metadata } from 'next';

// Export metadata for this page
export const metadata: Metadata = {
  title: 'Egonormia Leaderboard',
  description: 'A large scale video dataset and a benchmark for evaluating frontier models\' understanding of physical social norms through videos.',
  openGraph: {
    title: 'Egonormia Leaderboard',
    description: 'A large scale video dataset and a benchmark for evaluating frontier models\' understanding of physical social norms through videos.',
    url: 'https://opensocial.world/leaderboard',
    type: 'website',
    siteName: 'Open Social World',
    images: [{
      url: 'https://opensocial.world/images/psn/leaderboard-metadata.png',
      width: 1200,
      height: 630,
      alt: 'Egonormia Leaderboard',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Egonormia Leaderboard',
    description: 'A large scale video dataset and a benchmark for evaluating frontier models\' understanding of physical social norms through videos.',
    images: ['https://opensocial.world/images/psn/leaderboard-metadata.png'],
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
            {`@article{example.2023.001,
  title     = {EgoNormia},
  author    = {MohammadHossein Rezaei* and Yicheng Fu* and Philippe Cuvin* and Caleb Ziems and Yanzhe Zhang and Hao Zhu and Diyi Yang},
  journal   = {Open Social World},
  year      = {2025},
  doi       = {10.1234/example.2023.001},
  publisher = {Open Social World}
}`}
          </pre>
        </div>
      </main>
    </>
  );
}
