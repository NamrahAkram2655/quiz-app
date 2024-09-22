import './App.css';
import ErrorDisplay from './Components/ErrorDisplay/ErrorDisplay';
import Header from './Components/Header/Header';
import Loader from './Components/Loader/Loader';
import Main from './Components/Main/Main';
import Questions from './Components/Questions/Questions';
import Button from './Components/Button/Button';
import Progress from './Components/Progress/Progress';
import FinishPage from './Components/FinishPage/FinishPage';
import {useQuiz } from './Components/Context/QuizContext';
import Timer from './Components/Timer/Timer';



function App() {

  //instead of useStates let's use useReduer

  const { status } = useQuiz();

  return (

    <div className="quiz">
      <Header />


      {status === "loading" && <Loader />}
      {status === "error" && <ErrorDisplay />}
      {status === "ready" && <Main />}

        { status === "active" &&
          <>
            <Progress />
            <Questions />
            <Button />
            <Timer />
          </>
        }

        {status === "finish" && <FinishPage />}


    </div>
  );
}

export default App;
