import { useEffect, useReducer } from 'react';
import './App.css';
import ErrorDisplay from './Components/ErrorDisplay/ErrorDisplay';
import Header from './Components/Header/Header';
import Loader from './Components/Loader/Loader';
import Main from './Components/Main/Main';
import Questions from './Components/Questions/Questions';
import Button from './Components/Button/Button';
import Progress from './Components/Progress/Progress';
import FinishPage from './Components/FinishPage/FinishPage';

const initialState = {
  questions: [],

  //error , ready, Loading, active, finished 
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
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

      const questions = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === questions.correctOption ? state.points + questions.points : state.points
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
    default:
      throw new Error("Action Unknown");
  }
}

function App() {

  //instead of useStates let's use useReduer

  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, points, answer, highscore } = state;

  const length = questions.length;
  const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);

  useEffect(function () {

    async function fetchQuestions() {
      try {

        const res = await fetch("http://localhost:10000/questions");
        const data = await res.json();

        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
        
      }
      catch (error) {
        dispatch({ type: "dataFailed" });
      }

    }

    fetchQuestions();
  }, [])

  return (
    <div className="quiz">
      <Header />


      {status === "loading" && <Loader />}
      {status === "error" && <ErrorDisplay />}
      {status === "ready" && <Main length={length} dispatch={dispatch} />}

      {
        status === "active" &&
        <>
          <Progress index={index} length={length} totalPoints={totalPoints} points={points} />
          <Questions questions={questions} index={index} dispatch={dispatch} answer={answer} />
          <Button answer={answer} dispatch={dispatch} index={index} length={length} />
        </>
      }

      {status === "finish" && <FinishPage points={points} totalPoints={totalPoints} highscore={highscore} dispatch={dispatch} />}


    </div>
  );
}

export default App;
