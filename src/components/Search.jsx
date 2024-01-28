import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ico from "../assets/41gYkruZM2L.png";

const Search = () => {
  const [search, setSearch] = useState("");
  const hundleSearch = (e) => {
      e.preventDefault();
      console.log("rechercher");
  }
  return <>
    <form class="cont" onSubmit={hundleSearch}>
      <TextField
          className="searchbar"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search"
          variant="outlined"
      />
      <img src={ico} alt="search icon" className="button" />
    </form>
  </>
};

export default Search;
