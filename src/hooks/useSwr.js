import axios from '../utils/axios';
import useSWR from 'swr';

const useSwr = (url) => {
  const fetcher = () => axios.get(url);
  const { data, error } = useSWR(url, fetcher, { refreshInterval: 30000 });
  return { data, error };
};

export default useSwr;
