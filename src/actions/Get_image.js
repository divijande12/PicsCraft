import axios from "axios";
import { GET_IMAGES } from "./types";

export const get_image = (data) => (dispatch) => {
  const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
  const query = "mountains,cars,flowers,bikes,nature,colors";
  axios
    .get(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=25&format=json&nojsoncallback=1&extras=url_s,tags`,
      data
    )
    .then((res) => {
      console.log("action ---", res);
      if (res.status === 200) {
        dispatch({
          type: GET_IMAGES,
          photos: res.data.photos.photo,
          message: "",
        });
      } else {
        dispatch({
          type: GET_IMAGES,
          photos: null,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
