'use client';

import { useState } from 'react';
import Header from '@/components/header';
import EmailPredictor from '@/components/email-predictor';
import ModelMetrics from '@/components/model-metrics';
import ConfusionMatrix from '@/components/confusion-matrix';
import FeatureAnalysis from '@/components/feature-analysis';

export default function Home() {
  const [selectedEmail, setSelectedEmail] = useState<string>('');

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Email Predictor Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EmailPredictor onEmailChange={setSelectedEmail} />
          </div>
          <div className="lg:col-span-1">
            <FeatureAnalysis email={selectedEmail} />
          </div>
        </section>

        {/* Metrics & Confusion Matrix Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModelMetrics />
          <ConfusionMatrix />
        </section>
      </div>
    </main>
  );
}
