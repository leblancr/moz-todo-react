import React from 'react';

// Define the props interface
interface FilterButtonProps {
  name: string;
  isPressed: boolean;
  setFilter: (name: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = (props) => {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={!props.isPressed}  // Fixed aria-pressed value
      onClick={() => props.setFilter(props.name)}>
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;