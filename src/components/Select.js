import React from "react";
import { faroCounty } from "../data/countyData";
import { albufeiraParish } from "../data/parishData";

const Select = ({
  handleChange,
  type,
  setVariable,
  setResultArray,
  selectorObject,
}) => {
  return (
    <div>
      <select
        onChange={(e) =>
          handleChange(
            e.target.value,
            type,
            setVariable,
            selectorObject,
            setResultArray
          )
        }
      >
        {selectorObject.map((selector, index) => (
          <option key={index} value={index}>
            {selector.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
