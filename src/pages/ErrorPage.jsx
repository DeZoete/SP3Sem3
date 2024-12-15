import { useOutletContext } from 'react-router-dom';

const ErrorProvoker = () => {
  const { setErrorMessage } = useOutletContext();
  const handleThrowError = () => {
    try {
      throw new Error('An error was thrown in the ErrorProvoker component');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleHttpError = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/404');
      if (!response.ok) {
        throw new Error(
          'HTTP error, status = ' + response.status + ' ' + response.statusText
        );
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <button onClick={handleThrowError}> Trigger a JS error</button>
      <button onClick={handleHttpError}> Trigger a Async error</button>
    </>
  );
};

export default ErrorProvoker;
