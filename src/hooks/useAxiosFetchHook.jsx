import axios from "axios";
import { useEffect, useState } from "react";

export const useAxiosFetch = (dataURL) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (URL) => {
      setIsLoading(true);
      try {
        const res = await axios.get(URL, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(res.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
      // } finally {
      //     isMounted && setTimeout(() => {
      //         setIsLoading(false)
      //     }, 3000);;
      // }
    };

    fetchData(dataURL);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };
    return cleanUp;
  }, [dataURL]);

  return { data, fetchError, isLoading };
};
