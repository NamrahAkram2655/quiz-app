import { createContext, useContext, useEffect, useReducer } from "react";

// Create the context
const QuizContext = createContext();

const initialState = {
    questions: [],
    //error , ready, Loading, active, finished 
    status: "loading",
    index: 0,
    points: 0,
    answer: null,
    highscore: 0,
    secondsRemaining: 90,
}

const reducer = (state, action) => {

    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }

        case "dataFailed":
            return {
                ...state,
                status: "error"
            }

        case "start":
            return {
                ...state,
                status: "active"
            }

        case "newAnswer":

            const question = state.questions[state.index];
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points
            }

        case "nextQuestion":
            return {
                ...state,
                index: state.index + 1,
                answer: null
            }

        case "finish":
            return {
                ...state,
                status: "finish",
                highscore: state.points > state.highscore ? state.points : state.highscore,
            }
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready"
            }

        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finish" : state.status,
            }
        default:
            throw new Error("Action Unknown");
    }
}

function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { questions, status, index, points, answer, highscore, secondsRemaining } = state;

    const length = questions.length;
    const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);

    useEffect(function () {
        async function fetchQuestions() {
            try {
                const res = await fetch("http://localhost:10000/questions");
                const data = await res.json();

                console.log(data);
                dispatch({ type: "dataReceived", payload: data });

            } catch (error) {
                dispatch({ type: "dataFailed" });
            }
        }

        fetchQuestions();
    }, []);

    // Provide state and dispatch to the context
    return (
        <QuizContext.Provider value={{ highscore, status, questions, totalPoints, length, dispatch, answer, points, index, secondsRemaining }}>
            {children}
        </QuizContext.Provider>
    );
}

// Custom hook to use the quiz context
function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}

export { QuizProvider, useQuiz };
