import React, { Component } from "react";
import "./images.css";
import axios from "axios";
import { saveAs } from "file-saver";

const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
const TAGS = [
  "Cricket",
  "Nature",
  "Mountains",
  "Beach",
  "Dessert",
  "Football",
  "Animals",
];

export class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      displayData: [],
      pageNumber: 1,
      tags: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (from = "default", tagsText) => {
    let URL = "";
    if (from === "default") {
      URL = ` https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&extras=url_s&per_page=28&page=${this.state.pageNumber}&format=json&nojsoncallback=1`;
    } else {
      if (tagsText === "tags") {
        URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.state.tags}&extras=url_s&per_page=28&page=${this.state.pageNumber}&format=json&nojsoncallback=1`;
      } else {
        URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.state.searchText}&extras=url_s&per_page=28&page=${this.state.pageNumber}&format=json&nojsoncallback=1`;
      }
    }
    axios
      .get(URL)
      .then((res) => {
        console.log("fetchDefaultData() - res - ", res);
        this.setState({
          displayData: res.data.photos.photo,
          totalPages: res.data.photos.pages,
        });
      })
      .catch((err) => {
        console.log("fetchDefaultData() - catch - ", err);
      });
  };

  onSearchTextChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  onPageChange = (from) => {
    if (
      this.state.pageNumber + from > 0 &&
      this.state.pageNumber + from <= this.state.totalPages
    ) {
      this.setState(
        (prev) => ({ pageNumber: prev.pageNumber + from }),
        () => {
          if (this.state.searchText === "" && this.state.tags === "") {
            this.fetchData();
          } else if (
            this.state.searchText !== "" &&
            (this.state.tags === "" || this.state.tags === "clear")
          ) {
            this.fetchData("search", "text");
          } else if (
            this.state.searchText === "" &&
            (this.state.tags !== "" || this.state.tags !== "clear")
          ) {
            this.fetchData("search", "tags");
          }
        }
      );
    }
  };
  selectTag = (e) => {
    e.preventDefault();
    const { id } = e.target;
    this.setState(
      { tags: id === "clear" ? "" : id, pageNumber: 1, searchText: "" },
      () => {
        if (this.state.tags !== "") {
          this.fetchData("filter", "tags");
        } else {
          this.fetchData();
        }
      }
    );
  };

  onSearchClick = (e) => {
    e.preventDefault();
    if (this.state.searchText !== "") {
      this.setState({ pageNumber: 1, tags: "clear" }, () =>
        this.fetchData("search", "text")
      );
    }
  };

  onDownloadImage = (url, id) => {
    let extension = url.split(".");
    extension = extension[extension.length - 1];
    saveAs(url, `${id}.${extension}`);
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <div className="root">
            <nav className="navbar-custom">
              <div className="container-fluid container-nav">
                <div className="d-flex">
                  <img
                    src="/images/logo-web.png"
                    className="logo-style"
                    alt=""
                  />
                  <h1 className="navbar-brand mb-0 h1 navbar-heading">
                    PicsCraft
                  </h1>
                </div>
                <div className="searchInput">
                  <div className="input-group search">
                    <input
                      type="text"
                      onChange={this.onSearchTextChange}
                      name="search"
                      className="form-control"
                      placeholder=""
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                    />
                    <button
                      style={{ color: "black", fontWeight: "500" }}
                      onClick={this.onSearchClick}
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="content-container">
            <div className="container">
              <div className="tagContainer">
                {TAGS.map((item) => (
                  <button
                    className="btn btn-outline-secondary tagBtn"
                    id={item}
                    onClick={this.selectTag}>
                    {item}
                  </button>
                ))}
                <button
                  className="btn btn-outline-danger tagBtn clear-button"
                  id="clear"
                  onClick={this.selectTag}>
                  Clear Tags
                </button>
              </div>
              <div className="grid-parent">
                {this.state.displayData.map((item) => (
                  <div className="imageContainer">
                    <img
                      className="image"
                      src={item.url_s}
                      height="210"
                      width="280"
                      alt=""
                    />
                    <div className="middle">
                      <ion-icon
                        name="arrow-down-circle"
                        style={{
                          fontSize: "45px",
                          cursor: "pointer",
                          color: "#E7770D",
                        }}
                        onClick={() =>
                          this.onDownloadImage(item.url_s, item.id)
                        }></ion-icon>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pagination-container">
              <div className="change-page-container">
                <ion-icon
                  className="arrow-icon"
                  onClick={(e) => this.onPageChange(-1)}
                  name="chevron-back-outline"></ion-icon>
                <span style={{ color: "white" }}>{this.state.pageNumber}</span>
                <ion-icon
                  className="arrow-icon"
                  onClick={(e) => this.onPageChange(1)}
                  name="chevron-forward-outline"></ion-icon>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default Images;
