import React from 'react';

const CardFront = ({ img }) => {
  return (
    <div className="card-front">
      <img src={img} alt="Card Front" />
    </div>
  );
};

export default CardFront;
