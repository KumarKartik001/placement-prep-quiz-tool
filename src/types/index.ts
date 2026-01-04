export interface Question {
    id: number;
    topic: string;
    question: string;
    options: string[];
    answer: string;
}

export interface Attempt {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}

export interface QuizState {
    currentQuestion: number;
    score: number;
    showScore: boolean;
    selectedAnswer: string | null;
    timeLeft: number;
}