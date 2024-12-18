import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffcccc;
  color: #990000;
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  text-align: center;
`;

const ErrorMessage = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
`;

function ErrorPage() {
  return (
    <ErrorContainer>
      <ErrorMessage>Something went wrong</ErrorMessage>
      <ErrorDescription>Please try again later.</ErrorDescription>
    </ErrorContainer>
  );
}

export default ErrorPage;
