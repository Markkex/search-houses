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
    console.log(typeOfSell);
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
