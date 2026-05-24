'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ModelMetrics() {
  // Mock model performance data
  const metrics = {
    accuracy: 0.924,
    precision: 0.918,
    recall: 0.931,
    f1Score: 0.924,
  };

  const data = [
    { name: 'Accuracy', value: (metrics.accuracy * 100).toFixed(1), color: 'var(--color-chart-1)' },
    { name: 'Precision', value: (metrics.precision * 100).toFixed(1), color: 'var(--color-chart-3)' },
    { name: 'Recall', value: (metrics.recall * 100).toFixed(1), color: 'var(--color-chart-4)' },
    { name: 'F1-Score', value: (metrics.f1Score * 100).toFixed(1), color: 'var(--color-chart-5)' },
  ];

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Model Performance</CardTitle>
        <CardDescription>
          Evaluation metrics on test dataset (test split: 20%)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
            <p className="text-2xl font-bold text-primary">
              {(metrics.accuracy * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Precision</p>
            <p className="text-2xl font-bold text-primary">
              {(metrics.precision * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Recall</p>
            <p className="text-2xl font-bold text-primary">
              {(metrics.recall * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">F1-Score</p>
            <p className="text-2xl font-bold text-primary">
              {(metrics.f1Score * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  color: 'var(--color-foreground)',
                }}
              />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Model Info */}
        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1.5">
          <p>
            <strong>Model Training Info:</strong>
          </p>
          <ul className="list-disc list-inside space-y-0.5 ml-1">
            <li>Algorithm: Logistic Regression + Naive Bayes Ensemble</li>
            <li>Training samples: 8,500 emails</li>
            <li>Test samples: 2,125 emails</li>
            <li>Feature extraction: TF-IDF + URL patterns</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
