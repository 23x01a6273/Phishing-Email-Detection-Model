'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, AlertCircle, Link2, Zap } from 'lucide-react';

interface FeatureAnalysisProps {
  email: string;
}

export default function FeatureAnalysis({ email }: FeatureAnalysisProps) {
  // Mock phishing features detection
  const phishingPatterns = {
    urgentKeywords: ['urgent', 'immediate', 'now', 'asap', 'action required', 'act now'],
    loginPhrases: ['verify', 'confirm', 'validate', 'authenticate', 'login', 'password', 'account'],
    suspiciousUrls: ['bit.ly', 'tinyurl', 'short.link', 'goo.gl', 'click-here', 'verify-account'],
    excessivePunctuation: ['!!!', '???', '!!!?', '?!'],
  };

  const detectedFeatures = {
    urgent: email.toLowerCase().split(' ').some(word => 
      phishingPatterns.urgentKeywords.includes(word)
    ),
    login: email.toLowerCase().split(' ').some(word => 
      phishingPatterns.loginPhrases.includes(word)
    ),
    suspiciousUrl: phishingPatterns.suspiciousUrls.some(url => 
      email.toLowerCase().includes(url)
    ),
    excessivePunct: phishingPatterns.excessivePunctuation.some(punct => 
      email.includes(punct)
    ),
  };

  const features = [
    {
      name: 'Urgent Keywords',
      icon: AlertTriangle,
      detected: detectedFeatures.urgent,
      severity: 'high',
      description: 'Words like "urgent", "immediate", "action required"',
    },
    {
      name: 'Login/Verify Phrases',
      icon: AlertCircle,
      detected: detectedFeatures.login,
      severity: 'high',
      description: 'Account verification or password requests',
    },
    {
      name: 'Suspicious URLs',
      icon: Link2,
      detected: detectedFeatures.suspiciousUrl,
      severity: 'critical',
      description: 'Shortened or obfuscated links',
    },
    {
      name: 'Excessive Punctuation',
      icon: Zap,
      detected: detectedFeatures.excessivePunct,
      severity: 'medium',
      description: 'Multiple !!! or ??? patterns',
    },
  ];

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Feature Detection</CardTitle>
        <CardDescription>
          Phishing indicators found in email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {email.trim() ? (
          features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`p-3 rounded-lg border transition-all ${
                  feature.detected
                    ? feature.severity === 'critical'
                      ? 'bg-red-50 border-destructive dark:bg-red-950/20'
                      : feature.severity === 'high'
                      ? 'bg-orange-50 border-warning dark:bg-orange-950/20'
                      : 'bg-yellow-50 border-yellow-300 dark:bg-yellow-950/20'
                    : 'bg-muted/50 border-border'
                }`}
              >
                <div className="flex items-start gap-2">
                  <Icon
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      feature.detected
                        ? 'text-warning'
                        : 'text-muted-foreground'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {feature.name}
                      <span
                        className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                          feature.detected
                            ? 'bg-warning/20 text-warning'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {feature.detected ? 'DETECTED' : 'Not found'}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Enter an email above to see detected phishing features
            </p>
          </div>
        )}

        {/* TF-IDF Score Info */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-xs text-muted-foreground space-y-1.5 mt-4">
          <p className="font-medium text-foreground">
            📊 TF-IDF Vectorization
          </p>
          <p>
            This system uses TF-IDF (Term Frequency-Inverse Document Frequency) to convert email text into numerical features for machine learning classification.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
