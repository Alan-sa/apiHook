import {useState, useEffect} from 'react';
import {NetInfo} from '@react-native-community/netinfo';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

// Global Error Handler
const errorHandler = (e, isFatal) => {
  console.log(e, isFatal);
};
setJSExceptionHandler(errorHandler, true);
setNativeExceptionHandler(errorHandler);

const useApi = (url, method = 'get', data = null, token = null, retry = 2) => {
  const [isConnected, setIsConnected] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);

  const instance = axios.create({
    baseURL: 'https://myapi.com/', // use your api url here
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 5000,
  });

  const queryFunction = async () => {
    try {
      const response = await instance({
        method,
        url,
        data,
      });

      return response.data;
    } catch (error) {
      throw new Error(`API request failed: ${error}`);
    }
  };

  const mutationFunction = async () => {
    try {
      const response = await instance({
        method,
        url,
        data,
      });

      return response.data;
    } catch (error) {
      throw new Error(`API request failed: ${error}`);
    }
  };

  const queryConfig = {
    enabled: isConnected,
    retry,
    onError: error => {
      console.error(`API request failed: ${error}`);
    },
  };

  const mutationConfig = {
    ...queryConfig,
    onSuccess: () => {
      queryClient.invalidateQueries(url);
    },
  };

  const query = useQuery(url, queryFunction, queryConfig);
  const mutation = useMutation(mutationFunction, mutationConfig);

  return {query, mutation};
};

export default useApi;
