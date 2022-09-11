import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

import Select from "./components/Select";

//Data
import { typeOfPurchaseData } from "./data/purchaseData";
import { typeOfHouseData } from "./data/typeOfHouseData";
import { districtData } from "./data/districtData";
import { faroCounty } from "./data/countyData";
import { albufeiraParish } from "./data/parishData";

function App() {
  const [countyArray, setCountyArray] = useState([]);
  const [parishArray, setParishArray] = useState([]);
  const [countyLoading, setCountyLoading] = useState(true);
  const [parishLoading, setParishLoading] = useState(true);
  const [typeOfSell, setTypeOfSell] = useState(null);
  const [typeOfHouse, setTypeOfHouse] = useState(null);
  const [district, setDistrict] = useState(null);
  const [county, setCounty] = useState(null);
  const [parish, setParish] = useState(null);

  //object given by district, county an parish
  const [resultTypeOfSell, setResultTypeOfSell] = useState("");
  const [resultTypeOfHouse, setResultTypeOfHouse] = useState("");
  const [resultDistrict, setResultDistrict] = useState("");
  const [resultParish, setResultParish] = useState("");
  const [resultCounty, setResultCounty] = useState("");

  const [imovirtualLink, setImovirtualLink] = useState(null);

  const generateLinks = () => {
    let websites = [];
    setImovirtualLink(generateImovirtualLink());
  };

  const generateImovirtualLink = () => {
    let imovirtualUrl = "https://www.imovirtual.com/";

    if (typeOfSell !== null) {
      imovirtualUrl += `${resultTypeOfSell[0].value}/`;
    }
    if (typeOfHouse !== null) {
      imovirtualUrl += `${resultTypeOfHouse[0].value}/`;
    }

    if (district !== null) {
      imovirtualUrl += `?search%5Bregion_id%5D=${resultDistrict[0].value}`;
    }

    if (county !== null) {
      imovirtualUrl += `&search%5Bsubregion_id%5D=${resultCounty[0].value}`;
    }

    if (parish !== null) {
      imovirtualUrl += `&search%5Bcity_id%5D=${resultParish[0].value}`;
    }
    console.log(imovirtualUrl);
    return imovirtualUrl;
  };

  const findCounty = (val) => {
    switch (Number(val)) {
      case 8:
        setCountyArray(faroCounty);
        setCountyLoading(false);
        break;
      default:
        console.log("not found");
        break;
    }
  };

  const findParish = (val) => {
    console.log(val);
    switch (Number(val)) {
      case 1:
        setParishArray(albufeiraParish);
        setParishLoading(false);
        console.log(parishArray);
        break;
      default:
        console.log("not found");
        break;
    }
  };

  const handleChange = (
    targetValue,
    type = null,
    setVariable,
    objectArray,
    setResultArray
  ) => {
    findObject(setVariable, targetValue, objectArray, setResultArray);
    console.log("target value", targetValue);
    if (type !== null) {
      if (type == "SEARCHCOUNTY") {
        findCounty(targetValue);
      }
      if (type == "SEARCHPARISH") {
        console.log("here");
        findParish(targetValue);
      }
    }
  };

  const findObject = (
    setVariable,
    objectKey = null,
    objectArray,
    setResultArray = ""
  ) => {
    let object;

    if (objectKey !== "") {
      object = Object.keys(objectArray)
        .filter((key) => key == objectKey)
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [0]: objectArray[key],
          });
        }, {});
      setVariable(objectKey);
    }

    if (setResultArray !== "") {
      assignToResultArray(setResultArray, object);
    }
  };

  const assignToResultArray = (setResultArray, value) => {
    setResultArray(value);
  };

  return (
    <div className="App">
      <Select
        handleChange={handleChange}
        type={null}
        selectorObject={typeOfPurchaseData}
        setVariable={setTypeOfSell}
        setResultArray={setResultTypeOfSell}
      />
      <Select
        handleChange={handleChange}
        type={null}
        selectorObject={typeOfHouseData}
        setVariable={setTypeOfHouse}
        setResultArray={setResultTypeOfHouse}
      />
      <Select
        handleChange={handleChange}
        type={"SEARCHCOUNTY"}
        selectorObject={districtData}
        setVariable={setDistrict}
        setResultArray={setResultDistrict}
      />
      {district && countyLoading == false && (
        <Select
          handleChange={handleChange}
          type={"SEARCHPARISH"}
          selectorObject={countyArray}
          setVariable={setCounty}
          setResultArray={setResultCounty}
        />
      )}
      {county && parishLoading == false && (
        <Select
          handleChange={handleChange}
          type={null}
          setVariable={setParish}
          selectorObject={parishArray}
          setResultArray={setResultParish}
        />
      )}

      <button onClick={() => generateLinks()}>Generate</button>
      {imovirtualLink !== null && (
        <div>
          <a target="_blank" href={imovirtualLink}>
            Imovirtual
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
