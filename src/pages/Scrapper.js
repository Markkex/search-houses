import { useEffect, useState } from "react";
import * as cheerio from "cheerio";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Scrapper = () => {
  const [textUrl, setTextUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [arrayDisplay, setArrayDisplay] = useState([]);
  const fetchingArray = [];

  const fetchHousesScrapper = () => {
    setLoading(true);
    fetch(`https://radiant-sands-98531.herokuapp.com/${textUrl}`)
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
        /*
        $(".offer-item figure").each(function (i, element) {
          let imagesParsing = $(this).prepend().attr("data-quick-gallery");
          JSON.parse(imagesParsing);

          //          imagesParsing = imagesParsing.replace(/\\/g, "");

          imagesParsing = imagesParsing.substring(11, 250);

          images.push(imagesParsing);
        });
        */ /*
        console.log("fora");
        for (let i = 0; i < images.length; i++) {
          console.log("aquii");
          do {
            images[i] = images[i].slice(0, -1);
          } while (images[i].search(/["]/g) != -1);
        }
        */ /*fetchingArray.description = names;
        fetchingArray.links = link;
        fetchingArray.tipology = tipology;
        fetchingArray.area = area;
        fetchingArray.meterPrice = pricePerMetter;
        fetchingArray.offerPrice = offerPrice;
        fetchingArray.location = location;
        
        */ for (let i = 0; i < names.length; i++) {
          fetchingArray[i] = {
            description: names[i],
            links: link[i],
            tipology: tipology[i],
            area: area[i],
            meterPrice: pricePerMetter[i],
            offerPrice: offerPrice[i],
            location: location[i],
          };
        }
        setArrayDisplay(fetchingArray);
        setLoading(false);
      })
      .catch(function (err) {
        console.log("Failed to fetch page: ", err);
      });
  };
  console.log(arrayDisplay);
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

      {loading == false && arrayDisplay.length > 0 && (
        <div style={{ paddingTop: "20px" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Descrição</TableCell>
                  <TableCell align="right">Tipologia</TableCell>
                  <TableCell align="right">Area</TableCell>
                  <TableCell align="right">Preço Final</TableCell>
                  <TableCell align="right">Localização</TableCell>
                  <TableCell align="right">Preço m/2</TableCell>
                  <TableCell align="right">Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {arrayDisplay.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell align="right">{row.tipology}</TableCell>
                    <TableCell align="right">{row.area}</TableCell>
                    <TableCell align="right">{row.offerPrice}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.meterPrice}</TableCell>
                    <TableCell align="right">
                      <a target="_blank" href={row.links}>
                        {row.links}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Scrapper;
