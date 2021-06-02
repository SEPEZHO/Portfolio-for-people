import React from 'react';
import Bubbles from './Bubbles';
import Tables from './Tables';

import s from './Style/Portfolio.module.sass';

const Portfolio = () => {
  return (
    <div className={s.container}>
      <div className={s.centerContainer}>
        <Bubbles />
        <Tables />
      </div>
    </div>
  );
};

export default Portfolio;
