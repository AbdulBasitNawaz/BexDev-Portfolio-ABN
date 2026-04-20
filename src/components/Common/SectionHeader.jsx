import React from 'react';
import './SectionHeader.css';

const SectionHeader = ({ title, align = 'left' }) => {
  return (
    <div className={`section-header-wrap ${align}`}>
      <h2 className="section-h2">{title}</h2>
    </div>
  );
};

export default SectionHeader;
