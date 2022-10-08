import React, {FC, useState} from 'react';
import {useParams} from 'react-router-dom';

const Home: FC = (): JSX.Element => {
  const [name, setName] = useState('Cowjiang');
  const id = useParams().id ?? ''

  return (
    <div className="text-orange-400 text-xl">
      {name}
      {id}
    </div>
  );
}

export default Home;