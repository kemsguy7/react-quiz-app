import React, { useRef, useState, useEffect } from 'react';
import './index.css';
import { data } from '../../assets/data';
import { useQuizData } from '../Hooks'; // Custom hook for data fetching

const Quiz = () => {
  // State management
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // References for options
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  // Update question when index changes
  useEffect(() => {
    if (index < data.length) {
      setQuestion(data[index]);
    } else {
      setQuizCompleted(true);
    }
  }, [index]);

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        setLock(true);
        option_array[question.ans - 1].current.classList.add('correct'); // Add correct class to correct option if wrong option is selected
      }
    }
  };

  const next = () => {
    //next button functionality
    if (lock === true) {
      // Reset option classes
      option_array.forEach((option) => {
        // Remove all classes from options before moving to next question
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
      });

      // Check if quiz is completed
      if (index === data.length - 1) {
        setQuizCompleted(true);
        return;
      }

      // Move to next question
      setIndex((prevIndex) => prevIndex + 1);
      setLock(false);
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setQuizCompleted(false);
  };

  const toggleScoreDisplay = () => {
    setShowScore(!showScore);
  };

  if (quizCompleted) {
    return (
      <div className='container'>
        <h1>Quiz Completed!</h1>
        <hr />
        <h2>
          Your Final Score: {score} out of {data.length}
        </h2>
        <button onClick={resetQuiz}>Try Again</button>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />

      {/* Score display toggle */}
      <div className='score-section'>
        <button onClick={toggleScoreDisplay}>{showScore ? 'Hide Score' : 'Show Score'}</button>
        {showScore && (
          <p>
            Current Score: {score} / {data.length}
          </p>
        )}
      </div>

      <h2>
        {' '}
        {index + 1} . {question.question}{' '}
      </h2>
      <ul>
        <li
          ref={Option1}
          onClick={(e) => {
            checkAns(e, 1);
          }}
        >
          {question.option1}
        </li>
        <li
          ref={Option2}
          onClick={(e) => {
            checkAns(e, 2);
          }}
        >
          {question.option2}
        </li>
        <li
          ref={Option3}
          onClick={(e) => {
            checkAns(e, 3);
          }}
        >
          {question.option3}
        </li>
        <li
          ref={Option4}
          onClick={(e) => {
            checkAns(e, 4);
          }}
        >
          {question.option4}
        </li>
      </ul>
      <button onClick={next}>Next</button>
      <div className='index'>
        {index + 1} of {data.length} questions{' '}
      </div>
    </div>
  );
};

export default Quiz;
