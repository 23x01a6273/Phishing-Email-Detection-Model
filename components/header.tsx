import { Shield, AlertTriangle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Phishing Email Detection System
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          ML-powered detection using Scikit-learn TF-IDF analysis and pattern recognition
        </p>
      </div>
    </header>
  );
}
