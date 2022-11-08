import { useState, useEffect, useRef, useCallback } from "react";
import axios from "../services/axios";

function useAxios() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const abortController = useRef();

  const sendRequest = useCallback(async (config) => {
    try {
      setIsLoading(true);
      setError(null);
      if (abortController.current) {
        abortController.current.abort();
      }

      abortController.current = new AbortController();
      const response = await axios({
        ...config,
        signal: abortController.current.signal,
      });

      setData(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError({
          httpCode: error.response.status,
          message: error.response.data.message,
        });
      } else if (!window.navigator.onLine) {
        setError({
          httpCode: null,
          message: "You are offline. Please check your internet connection.",
        });
      } else {
        setError({
          httpCode: null,
          message: error.message,
        });
      }
    }
  });

  useEffect(() => {
    if (error || data) {
      setIsLoading(false);
    }
  }, [error, data]);

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  return [sendRequest, isLoading, data, error];
}

export default useAxios;
