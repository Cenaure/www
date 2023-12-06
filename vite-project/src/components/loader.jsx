import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Loader;