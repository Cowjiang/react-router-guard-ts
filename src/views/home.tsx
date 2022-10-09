import React, {FC, useState} from 'react';
import {useParams} from 'react-router-dom';

const Home: FC = (): JSX.Element => {
  const id = useParams().id ?? ''

  return (
    <div className="text-orange-400 text-xl">
      Home Page
      <br/>
      {id}
    </div>
  );
}

export default Home;