import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { questions } from './questions';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (index) => {
    if (selectedOption !== null) return; // lock after first answer
    setSelectedOption(index);
    setShowResult(true);
    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setQuizFinished(false);
  };

  const getOptionStyle = (index) => {
    if (selectedOption === null) {
      return styles.option;
    }
    if (index === currentQuestion.correctIndex) {
      return [styles.option, styles.correctOption];
    }
    if (index === selectedOption) {
      return [styles.option, styles.wrongOption];
    }
    return [styles.option, styles.disabledOption];
  };

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>
            {percentage >= 70 ? '🎉' : percentage >= 40 ? '🙂' : '😅'}
          </Text>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>
            {score} / {questions.length}
          </Text>
          <Text style={styles.resultPercentage}>{percentage}%</Text>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
            <Text style={styles.restartButtonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${((currentIndex + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleOptionPress(index)}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        {showResult && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F46E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  scoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FBBF24',
    borderRadius: 3,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
    lineHeight: 32,
  },
  option: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  correctOption: {
    backgroundColor: '#22C55E',
  },
  wrongOption: {
    backgroundColor: '#EF4444',
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  nextButton: {
    marginTop: 16,
    backgroundColor: '#FBBF24',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  resultScore: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
  },
  resultPercentage: {
    fontSize: 18,
    color: '#E0E7FF',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#FBBF24',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
});
