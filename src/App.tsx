import React, { useState, useMemo } from 'react';
import { BookOpen, Award, Brain, BarChart3, AlertCircle } from 'lucide-react';
import nlp from 'compromise';

interface ScoreMetrics {
  coherence: number;
  vocabulary: number;
  overall: number;
}

function App() {
  const [essay, setEssay] = useState('');
  
  const analyzeEssay = (text: string): ScoreMetrics => {
    if (!text.trim()) {
      return {
        coherence: 0,
        vocabulary: 0,
        overall: 0
      };
    }

    const doc = nlp(text);
    
    // Enhanced coherence scoring using NLP
    const sentences = doc.sentences().out('array');
    const avgSentenceLength = sentences.reduce((acc, s) => acc + s.trim().split(/\s+/).length, 0) / sentences.length;
    const sentenceLengthVariation = Math.min(Math.abs(avgSentenceLength - 15) / 10, 1);
    
    // Analyze sentence types for better coherence scoring
    const questionCount = doc.questions().length;
    // Use match() instead of statements() for declarative sentences
    const statementCount = doc.sentences().not('#Question').length;
    const sentenceVariety = Math.min((questionCount + statementCount) / sentences.length, 1);
    
    // Enhanced transition words analysis
    const transitionWords = ['however', 'therefore', 'furthermore', 'moreover', 'consequently', 'additionally'];
    const transitionCount = transitionWords.reduce((count, word) => 
      count + (text.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0);
    
    // Enhanced vocabulary scoring using NLP
    const terms = doc.terms().out('array');
    const uniqueTerms = new Set(terms.map(term => term.toLowerCase()));
    
    // Analyze parts of speech for vocabulary complexity
    const adjectives = doc.match('#Adjective').length;
    const adverbs = doc.match('#Adverb').length;
    const nouns = doc.match('#Noun').length;
    const verbs = doc.match('#Verb').length;
    
    const vocabularyComplexity = (adjectives + adverbs + nouns + verbs) / terms.length;
    
    // Calculate enhanced scores
    const coherenceScore = Math.min(
      ((transitionCount / sentences.length) * 3 +
        (1 - sentenceLengthVariation) * 4 +
        sentenceVariety * 3),
      10
    );
    
    const vocabularyScore = Math.min(
      ((uniqueTerms.size / terms.length) * 5 +
        vocabularyComplexity * 5),
      10
    );
    
    return {
      coherence: Number(coherenceScore.toFixed(1)),
      vocabulary: Number(vocabularyScore.toFixed(1)),
      overall: Number(((coherenceScore + vocabularyScore) / 2).toFixed(1))
    };
  };

  const scores = useMemo(() => analyzeEssay(essay), [essay]);

  const getFeedback = (score: number): string => {
    if (score >= 9) return 'Excellent';
    if (score >= 7) return 'Good';
    if (score >= 5) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Essay Scoring System using NLP</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ScoreCard
            icon={<Brain className="w-6 h-6" />}
            title="Coherence"
            score={scores.coherence}
            feedback={getFeedback(scores.coherence)}
          />
          <ScoreCard
            icon={<Award className="w-6 h-6" />}
            title="Vocabulary"
            score={scores.vocabulary}
            feedback={getFeedback(scores.vocabulary)}
          />
          <ScoreCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Overall"
            score={scores.overall}
            feedback={getFeedback(scores.overall)}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <label htmlFor="essay" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your essay
            </label>
            <textarea
              id="essay"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Start writing your essay here..."
            />
          </div>

          {essay.length === 0 && (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">Enter your essay to see the automated scoring results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ScoreCardProps {
  icon: React.ReactNode;
  title: string;
  score: number;
  feedback: string;
}

function ScoreCard({ icon, title, score, feedback }: ScoreCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-indigo-600">{icon}</div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{score}</span>
        <span className="text-sm text-gray-500">/10</span>
      </div>
      <p className={`mt-2 text-sm ${
        feedback === 'Excellent' ? 'text-green-600' :
        feedback === 'Good' ? 'text-blue-600' :
        feedback === 'Average' ? 'text-amber-600' :
        'text-red-600'
      }`}>
        {feedback}
      </p>
    </div>
  );
}

export default App;