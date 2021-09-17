/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./images.css";
import { get_image } from "../actions/Get_image";
import { connect } from "react-redux";
import Pagination from "./pagination/pagination";
import axios from "axios";

function Images(props) {
  const [search, setSearch] = useState([]);
  const [Data, setData] = useState(true);
  const [text, setText] = useState("");
  console.log("divij props -- ", props);
  useEffect(() => {
    props.get_image();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${text}&per_page=25&format=json&nojsoncallback=1&extras=url_s,tags`
      )
      .then((res) => {
        console.log("inside then", res);
        const searchText = res.data.photos.photo.filter((item) => {
          console.log("value", item);
          return item.tags.toLowerCase().includes(text.toLowerCase());
        });
        setSearch(searchText);
        console.log("text", text);

        if (searchText.length === 0) {
          setData(false);
        } else {
          setData(true);
        }
      });
  };
  const searchImage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "search") {
      setText(value);
    }
  };

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
                  onClick={submit}
                  id="button-addon1">
                  Search
                </button>
                <input
                  type="text"
                  name="search"
                  onChange={searchImage}
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
            {search.length !== 0
              ? search.map((item) => (
                  <img
                    className="image"
                    src={item.url_s}
                    height="120"
                    width="170"
                    alt=""
                  />
                ))
              : props.photos.photos !== 0 &&
                props.photos.photos.map((item) => (
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
        <Pagination />
      </div>
    </React.Fragment>
  );
}

const MapStateToProps = (state) => ({
  photos: state.photos,
});
export default connect(MapStateToProps, { get_image })(Images);
