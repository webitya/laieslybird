import dbConnect from '@/lib/db';
import EPaper from '@/models/EPaper';
import { format } from 'date-fns';
import Link from 'next/link';
import { Calendar, FileText, Download } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-dynamic';

export default async function EPaperPage() {
  await dbConnect();

  const ePapers = await EPaper.find({ isActive: true })
    .sort({ date: -1 })
    .limit(50);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="container px-4 md:px-8 py-10">
        <Breadcrumbs items={[{ name: 'E-Paper', url: '/e-paper' }]} />

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            E-Paper Archive
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Access our digital newspaper editions
          </p>
        </div>

        {ePapers.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              No e-papers available at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ePapers.map((paper: any) => (
              <div
                key={paper._id.toString()}
                className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow"
              >
                {paper.thumbnail && (
                  <div className="aspect-[3/4] relative bg-slate-200 dark:bg-slate-800">
                    <img
                      src={paper.thumbnail}
                      alt={paper.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(paper.date), 'MMMM d, yyyy')}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {paper.title}
                  </h3>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {paper.pages} {paper.pages === 1 ? 'page' : 'pages'}
                    </span>

                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      View PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
