import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../main';

const Acount = observer(() => {
  const {user} = useContext(Context);
  return (
      <div>
          <h2>{user.user.email}</h2>
      </div>
  );
});

export default Acount;