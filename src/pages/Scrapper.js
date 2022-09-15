import { useEffect, useState } from "react";
import * as cheerio from "cheerio";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Scrapper = () => {
  const [textUrl, setTextUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchingArray = [];
  const fetchHousesScrapper = () => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append(
      "Access-Control-Allow-Origin",
      "https://search-houses.vercel.app/"
    );
    headers.append("Access-Control-Allow-Credentials", "true");

    headers.append("GET", "POST", "OPTIONS");

    fetch(`${textUrl}`, { method: "GET", headers: headers })
      .then(function (response) {
        // When the page is loaded convert it to text
        return response.text();
      })
      .then(function (html) {
        // Initialize the DOM parser
        var parser = new DOMParser();
        let names = [];
        let link = [];
        let tipology = [];
        let area = [];
        let pricePerMetter = [];
        let offerPrice = [];
        let location = [];
        let images = [];
        // Parse the text
        var doc = parser.parseFromString(html, "text/html");
        let $ = cheerio.load(html);
        // You can now even select part of that html as you would in the regular DOM
        // Example:
        // var docArticle = doc.querySelector('article').innerHTML;
        $(".offer-item-title").each(function (i, element) {
          let name = $(this).prepend().text();
          name = name.replace("\n", "");
          name = name.trim();
          names.push(name);
        });

        $("article .offer-item-details .offer-item-header h3 a").each(function (
          i,
          element
        ) {
          let linkhref = $(this).prepend().attr("href");
          link.push(linkhref);
        });

        $(".offer-item-rooms").each(function (i, element) {
          let tipologyType = $(this).prepend().text();
          tipology.push(tipologyType);
        });

        $(".offer-item-area").each(function (i, element) {
          let areaSize = $(this).prepend().text();
          area.push(areaSize);
        });
        $(".offer-item-price-per-m").each(function (i, element) {
          let perMeter = $(this).prepend().text();
          pricePerMetter.push(perMeter);
        });
        $(".offer-item-price").each(function (i, element) {
          console.log(element);
          let price = $(this).prepend().text();
          price = price.replace("\n", "");
          price = price.trim();
          offerPrice.push(price);
        });
        $(".offer-item-details .offer-item-header p").each(function (
          i,
          element
        ) {
          let locationArea = $(this).prepend().text();
          locationArea = locationArea.replace("\n", "");
          let filtered = locationArea.substring(25);
          locationArea = filtered.trim();
          location.push(locationArea);
        });

        $(".offer-item figure").each(function (i, element) {
          let imagesParsing = $(this).prepend().attr("data-quick-gallery");
          JSON.parse(imagesParsing);
          console.log(imagesParsing);
          imagesParsing = imagesParsing;

          images.push(imagesParsing);
        });

        console.log(images);
        fetchingArray.description = names;
        fetchingArray.links = link;
        fetchingArray.tipology = tipology;
        fetchingArray.area = area;
        fetchingArray.meterPrice = pricePerMetter;
        fetchingArray.offerPrice = offerPrice;
        fetchingArray.location = location;

        console.log(fetchingArray);
      })
      .catch(function (err) {
        console.log("Failed to fetch page: ", err);
      });
    setLoading(false);
  };

  return (
    <div>
      <h1>Scrapper (Imovirtual)</h1>
      <div>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={textUrl}
          onChange={(e) => setTextUrl(e.target.value)}
        />
      </div>
      <div style={{ paddingTop: "20px" }}>
        <Button variant="contained" onClick={() => fetchHousesScrapper()}>
          Contained
        </Button>
      </div>

      {loading !== true && <div>cenas</div>}
    </div>
  );
};

export default Scrapper;
