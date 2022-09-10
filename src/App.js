import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

import Select from "./components/Select";

//Data
import { typeOfPurchaseData } from "./data/purchaseData";
import { typeOfHouseData } from "./data/typeOfHouseData";
import { districtData } from "./data/districtData";
import { faroCounty } from "./data/countyData";
function App() {
  const [typeOfSell, setTypeOfSell] = useState("");
  const [typeOfHouse, setTypeOfHouse] = useState("");
  const [district, setDistrict] = useState("");
  const [county, setCounty] = useState("");
  const [parish, setParish] = useState("");

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
    console.log("district", resultDistrict[0].value);
  };

  const generateImovirtualLink = () => {
    let imovirtualUrl = "https://www.imovirtual.com/";

    if (typeOfSell !== "") {
      imovirtualUrl += `${typeOfSell}/`;
    }
    if (typeOfHouse !== "") {
      imovirtualUrl += `${typeOfHouse}/`;
    }

    if (district !== "") {
      imovirtualUrl += `?search%5Bregion_id%5D=${district}`;
    }

    if (county !== "") {
      imovirtualUrl += `&search%5Bsubregion_id%5D=${county}`;
    }

    if (parish !== "") {
      imovirtualUrl += `&search%5Bcity_id%5D=${parish}`;
    }
    console.log(imovirtualUrl);
    return imovirtualUrl;
  };

  return (
    <div className="App">
      <Select
        selectorObject={typeOfPurchaseData}
        variable={setTypeOfSell}
        setResultArray={setResultTypeOfSell}
      />
      <Select
        selectorObject={typeOfHouseData}
        variable={setTypeOfHouse}
        setResultArray={setResultTypeOfHouse}
      />
      <Select
        selectorObject={districtData}
        variable={setDistrict}
        setResultArray={setResultDistrict}
      />

      {district && (
        <Select
          variable={setCounty}
          district={district}
          setResultArray={setResultCounty}
        />
      )}

      {county && (
        <Select
          variable={setParish}
          countyCode={county}
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
