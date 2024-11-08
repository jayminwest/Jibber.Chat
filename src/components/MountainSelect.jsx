import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  margin-top: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
`;

function MountainSelect({ selectedMountain, setSelectedMountain }) {
  return (
    <SelectContainer>
      <h3>Select Your Mountain</h3>
      <Select
        value={selectedMountain}
        onChange={(e) => setSelectedMountain(e.target.value)}
      >
        <option value="">Choose a mountain</option>
        <option value="vail">Vail</option>
        <option value="whistler">Whistler</option>
        <option value="park-city">Park City</option>
      </Select>
    </SelectContainer>
  );
}

export default MountainSelect;
