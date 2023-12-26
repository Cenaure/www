import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../main';
import { Container } from 'react-bootstrap';

const Acount = observer(() => {
  const {user} = useContext(Context);
  return (
      <Container fluid>
          <h2>{user.user.email}</h2>
          <h2>{user.user.role}</h2>
      </Container>
  );
});

export default Acount;