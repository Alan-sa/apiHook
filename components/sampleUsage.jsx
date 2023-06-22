import useApi from './useApi';

const MyComponent = () => {
  const {query, mutation} = useApi(
    '/endpoint',
    'post',
    {key: 'value'},
    'my-token',
  );

  // Use query and mutation in your component...

  return null;
};
