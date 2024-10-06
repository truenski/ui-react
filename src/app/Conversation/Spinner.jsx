import React from 'react';
import './style/Spinner.scss'; // Assuming the SCSS is in the same directory

const Spinner = ({ size = 'small' }) => (
  <span className={`spinner ${size}`}></span>
);

export default Spinner;