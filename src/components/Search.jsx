import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ico from "../assets/41gYkruZM2L.png";

const Search = () => {
  const [search, setSearch] = useState("");
  return <>
    <div class="cont">
      <TextField
          className="searchbar"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search"
          variant="outlined"
      />
      <img src={ico} alt="search icon" className="button" />
    </div>
  </>
};

export default Search;
