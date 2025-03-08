import { useState, useEffect } from 'react';
import { data as initialData } from '../assets/data';

// Custom hook for fetching quiz data
export const useQuizData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API

    const fetchData = async () => {
      try {
        // Simulating API delay
        setTimeout(() => {
          setData(initialData);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
