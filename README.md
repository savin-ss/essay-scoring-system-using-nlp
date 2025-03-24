# Essay Scoring System

## Overview
This is an advanced automated essay scoring system that leverages Natural Language Processing (NLP) through the compromise library to analyze essays based on two main metrics:
1. **Coherence** (How well the text flows and connects)
2. **Vocabulary** (Word variety and complexity)

## Technical Implementation

### Core Technologies
- React with TypeScript for the frontend
- Compromise (NLP.js) for natural language processing
- Tailwind CSS for styling
- Lucide React for icons

### NLP Analysis Components

#### 1. Coherence Analysis
The system uses NLP to evaluate text coherence through:
- **Sentence Structure Analysis**
  - Identifies different sentence types (questions, statements)
  - Calculates sentence length variation
  - Measures sentence variety for better flow
- **Transition Words**
  - Tracks usage of connecting phrases
  - Analyzes distribution of transition words
- **Text Flow Metrics**
  - Evaluates overall text structure
  - Measures paragraph connections

#### 2. Vocabulary Analysis
Sophisticated vocabulary assessment using NLP:
- **Parts of Speech Analysis**
  - Counts and analyzes adjectives
  - Tracks adverb usage
  - Measures noun variety
  - Evaluates verb complexity
- **Word Complexity Metrics**
  - Unique word ratio calculation
  - Vocabulary sophistication scoring
  - Term frequency analysis

### Scoring Algorithm
```typescript
const analyzeEssay = (text: string): ScoreMetrics => {
  // NLP Document Processing
  const doc = nlp(text);
  
  // Coherence Scoring:
  // - Analyzes sentence types (questions vs. statements)
  // - Evaluates transition word usage
  // - Measures sentence length variation
  
  // Vocabulary Scoring:
  // - Calculates unique term ratio
  // - Analyzes parts of speech distribution
  // - Measures vocabulary complexity
  
  // Returns detailed scores for each metric
};
```

### Scoring Scale
- **9-10: Excellent**
  - High coherence with varied sentence structure
  - Rich vocabulary with sophisticated word choice
- **7-8.9: Good**
  - Clear flow with good transitions
  - Strong vocabulary with some complexity
- **5-6.9: Average**
  - Basic coherence with simple connections
  - Standard vocabulary usage
- **Below 5: Needs Improvement**
  - Limited text flow
  - Basic vocabulary with repetition

## Key Features

### 1. Real-time Analysis
- Instant NLP processing as text is entered
- Immediate feedback on writing quality
- Dynamic score updates

### 2. Multiple Metrics
- Separate coherence and vocabulary scores
- Combined overall quality score
- Detailed breakdown of each metric

### 3. Visual Feedback
- Color-coded score indicators
- Intuitive icon-based interface
- Clear performance categories

### 4. Advanced NLP Features
- Sentence type classification
- Parts of speech tagging
- Vocabulary complexity analysis
- Transition word detection

## Usage Guide

### For Writers
1. Enter your essay in the text area
2. Receive instant NLP-based analysis
3. Review detailed scores for:
   - Text coherence
   - Vocabulary usage
   - Overall quality
4. Use feedback to improve writing

### Best Practices
1. Write naturally - the NLP system analyzes authentic writing
2. Use varied sentence structures
3. Include appropriate transition words
4. Choose diverse vocabulary
5. Focus on clear communication

## Technical Notes
- Uses compromise for advanced NLP analysis
- Implements memoization for performance optimization
- Features weighted scoring algorithms
- Provides real-time processing feedback
- Color-coded UI for intuitive feedback

## Performance Considerations
- Optimized NLP processing for real-time analysis
- Efficient state management for smooth updates
- Responsive design for all device sizes
- Memory-efficient text processing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/savin-ss/essay-scoring-system-using-nlp.git
```

2. Install dependencies
```bash
cd essay-scoring-system
npm install
```

3. Start the development server
```bash
npm run dev
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details