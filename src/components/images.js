import axios from "axios";
import React, { useEffect, useState } from "react";
import "./images.css";

export default function Images() {
  const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
  const query = "mountains,trees,animals,cars,nature";
  const [imageData, setImageData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=25&format=json&nojsoncallback=1&extras=url_s`
      )
      .then((res) => {
        setImageData(res.data.photos.photo);
        console.log(res);
        // res.data.photos.photo.map((item) => console.log(item.url_s));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="root">
        <nav className="navbar-custom">
          <div className="container-fluid container-nav">
            <div className="d-flex">
              <img src="/images/logo-web.png" className="logo-style" alt="" />
              <h1 className="navbar-brand mb-0 h1 navbar-heading">PicsCraft</h1>
            </div>
            <div className="searchInput">
              <div className="input-group search">
                <button
                  style={{ color: "black", fontWeight: "500" }}
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1">
                  Search
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="content-container">
        <div className="container">
          <div className="grid-parent">
            {imageData.map((item) => (
              <img
                className="image"
                src={item.url_s}
                height="120"
                width="170"
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
