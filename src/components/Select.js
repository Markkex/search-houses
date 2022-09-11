import React from "react";
import { faroCounty } from "../data/countyData";
import { albufeiraParish } from "../data/parishData";

const Select = ({
  selectorObject = null,
  variable,
  district = null,
  countyCode = null,
  setResultArray = null,
}) => {
  var countyArray = [];
  var parish = [];
  const findCounty = (val) => {
    switch (Number(val)) {
      case 8:
        countyArray = [...faroCounty];
        return true;
      default:
        console.log("not found");
        break;
    }
  };

  const findParish = (val) => {
    switch (Number(val)) {
      case 102:
        parish = [...albufeiraParish];
        return true;
      default:
        console.log("not found");
        break;
    }
  };

  const findObject = (objectKey = null, objectArray, setResultArray = "") => {
    let object;

    if (objectKey !== "") {
      object = Object.keys(objectArray)
        .filter((key) => key == objectKey)
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [0]: objectArray[key],
          });
        }, {});
      variable(objectKey);
    }

    if (setResultArray !== "") {
      assignToResultArray(setResultArray, object);
    }
  };

  const assignToResultArray = (setResultArray, value) => {
    setResultArray(value);
  };
  console.log(district);
  return (
    <div>
      {selectorObject && (
        <select
          onChange={(e) =>
            findObject(e.target.value, selectorObject, setResultArray)
          }
        >
          {selectorObject.map((selector, index) => (
            <option key={index} value={index}>
              {selector.name}
            </option>
          ))}
        </select>
      )}
      {district && findCounty(district) && (
        <select
          onChange={(e) =>
            findObject(e.target.value, countyArray, setResultArray)
          }
        >
          {countyArray.map((selector, index) => (
            <option key={index} value={index}>
              {selector.name}
            </option>
          ))}
        </select>
      )}
      {countyCode && findParish(countyCode) && (
        <select onChange={(e) => variable(e.target.value)}>
          {parish.map((selector, index) => (
            <option key={index} value={index}>
              {selector.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Select;
