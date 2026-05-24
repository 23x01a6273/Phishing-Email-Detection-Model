'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';

interface EmailPredictorProps {
  onEmailChange: (email: string) => void;
}

export default function EmailPredictor({ onEmailChange }: EmailPredictorProps) {
  const [email, setEmail] = useState('');
  const [prediction, setPrediction] = useState<'phishing' | 'safe' | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockPredictions: Record<string, { type: 'phishing' | 'safe'; confidence: number }> = {
    'click here': { type: 'phishing', confidence: 0.92 },
    'verify account': { type: 'phishing', confidence: 0.88 },
    'urgent action': { type: 'phishing', confidence: 0.85 },
    'confirm password': { type: 'phishing', confidence: 0.95 },
    'meeting schedule': { type: 'safe', confidence: 0.91 },
    'project update': { type: 'safe', confidence: 0.87 },
    'report attached': { type: 'safe', confidence: 0.89 },
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let result: { type: 'phishing' | 'safe'; confidence: number } = { type: 'safe', confidence: 0.65 };
      
      // Mock prediction logic based on keywords
      for (const [keyword, pred] of Object.entries(mockPredictions)) {
        if (email.toLowerCase().includes(keyword)) {
          result = pred;
          break;
        }
      }
      
      setPrediction(result.type);
      setConfidence(result.confidence);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleClear = () => {
    setEmail('');
    setPrediction(null);
    setConfidence(0);
    onEmailChange('');
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    onEmailChange(value);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Email Analyzer</CardTitle>
        <CardDescription>
          Paste email content to detect phishing indicators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Email Content
          </label>
          <Textarea
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="Paste the email text here... Example: 'Click here to verify your account immediately!'"
            className="min-h-40 bg-input border-border text-foreground placeholder:text-muted-foreground"
            disabled={isAnalyzing}
          />
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div
            className={`p-4 rounded-lg border-2 ${
              prediction === 'phishing'
                ? 'bg-red-50 border-destructive dark:bg-red-950/20'
                : 'bg-green-50 border-success dark:bg-green-950/20'
            }`}
          >
            <div className="flex items-start gap-3">
              {prediction === 'phishing' ? (
                <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {prediction === 'phishing' ? 'PHISHING DETECTED' : 'EMAIL SAFE'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Confidence: {(confidence * 100).toFixed(1)}%
                </p>
                <div className="mt-2 w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      prediction === 'phishing' ? 'bg-destructive' : 'bg-success'
                    }`}
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleAnalyze}
            disabled={!email.trim() || isAnalyzing}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Email'
            )}
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="border-border text-foreground hover:bg-muted"
          >
            Clear
          </Button>
        </div>

        {/* Info */}
        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Try these examples:</strong>
          </p>
          <ul className="list-disc list-inside space-y-0.5 ml-1">
            <li>&quot;click here&quot; - phishing pattern</li>
            <li>&quot;verify account&quot; - phishing pattern</li>
            <li>&quot;meeting schedule&quot; - legitimate</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
