"use client";
import { useParams } from 'next/navigation';
import questions from '../../../data/questions.json'; // Aliases use karein
import QuizEngine from '../../../components/QuizEngine';
import { Question } from '../../../types';

export default function QuizPage() {
    const params = useParams();
    const topic = params.topic as string;

    const decodedTopic = decodeURIComponent(topic);

    // Yahan type casting add kar di taaki TypeScript khush rahe
    const filteredQuestions = (questions as Question[]).filter(
        (q) => q.topic.toLowerCase() === decodedTopic.toLowerCase()
    );

    if (filteredQuestions.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-2xl font-bold text-slate-800">Topic not found!</h1>
                <p className="text-slate-500">Aisa lagta hai is subject ke questions abhi available nahi hain.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <QuizEngine questions={filteredQuestions} topic={decodedTopic} />
        </div>
    );
}