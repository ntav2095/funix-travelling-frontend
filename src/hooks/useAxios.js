import { useState, useEffect, useRef, useCallback } from "react";
import axios from "../services/axios";
import { useTranslation } from "react-i18next";

// inject i18n
let i18n;
export const i18nInjector = (injectedObj) => {
  i18n = injectedObj;
};

function useAxios() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const abortController = useRef();
  // const { i18n, t } = useTranslation();
  console.log(i18n.language);

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
          message: error.response.data.message[i18n.language],
        });
      } else if (error.request) {
        if (!window.navigator.onLine) {
          setError({
            httpCode: null,
            message: i18n.t("errorMessage.offline"),
          });
        } else {
          setError({
            httpCode: null,
            message: i18n.t("errorMessage.networkError"),
          });
        }
      } else if (!window.navigator.onLine) {
        setError({
          httpCode: null,
          message: i18n.t("errorMessage.offline"),
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
