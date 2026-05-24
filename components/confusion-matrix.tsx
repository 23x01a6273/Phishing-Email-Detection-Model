'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfusionMatrix() {
  // Mock confusion matrix values
  const trueNegatives = 987;
  const falsePositives = 38;
  const falseNegatives = 62;
  const truePositives = 1038;
  
  const total = trueNegatives + falsePositives + falseNegatives + truePositives;

  const metrics = {
    specificity: (trueNegatives / (trueNegatives + falsePositives) * 100).toFixed(1),
    sensitivity: (truePositives / (truePositives + falseNegatives) * 100).toFixed(1),
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Confusion Matrix</CardTitle>
        <CardDescription>
          Model predictions vs. actual labels on test set
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Confusion Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="border border-border p-2 bg-muted text-xs font-medium text-muted-foreground"></td>
                <td className="border border-border p-2 bg-muted text-xs font-medium text-center text-muted-foreground">
                  Predicted Safe
                </td>
                <td className="border border-border p-2 bg-muted text-xs font-medium text-center text-muted-foreground">
                  Predicted Phishing
                </td>
              </tr>
              <tr>
                <td className="border border-border p-2 bg-muted text-xs font-medium text-muted-foreground">
                  Actually Safe
                </td>
                <td className="border border-border p-3 text-center font-semibold">
                  <span className="text-lg text-success">{trueNegatives}</span>
                  <p className="text-xs text-muted-foreground mt-1">TN</p>
                </td>
                <td className="border border-border p-3 text-center font-semibold">
                  <span className="text-lg text-warning">{falsePositives}</span>
                  <p className="text-xs text-muted-foreground mt-1">FP</p>
                </td>
              </tr>
              <tr>
                <td className="border border-border p-2 bg-muted text-xs font-medium text-muted-foreground">
                  Actually Phishing
                </td>
                <td className="border border-border p-3 text-center font-semibold">
                  <span className="text-lg text-warning">{falseNegatives}</span>
                  <p className="text-xs text-muted-foreground mt-1">FN</p>
                </td>
                <td className="border border-border p-3 text-center font-semibold">
                  <span className="text-lg text-success">{truePositives}</span>
                  <p className="text-xs text-muted-foreground mt-1">TP</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Derived Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Sensitivity (Recall)</p>
            <p className="text-xl font-bold text-primary">{metrics.sensitivity}%</p>
            <p className="text-xs text-muted-foreground mt-1">Phishing detection rate</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Specificity</p>
            <p className="text-xl font-bold text-primary">{metrics.specificity}%</p>
            <p className="text-xs text-muted-foreground mt-1">Safe email accuracy</p>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1.5">
          <p className="font-medium">Legend:</p>
          <ul className="space-y-1">
            <li><span className="text-success">●</span> <strong>TP:</strong> True Positive (phishing correctly detected)</li>
            <li><span className="text-success">●</span> <strong>TN:</strong> True Negative (safe email correctly classified)</li>
            <li><span className="text-warning">●</span> <strong>FP:</strong> False Positive (safe marked as phishing)</li>
            <li><span className="text-warning">●</span> <strong>FN:</strong> False Negative (phishing missed)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
