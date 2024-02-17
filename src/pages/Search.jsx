import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Friends from "../components/Friends";
import PendingFriends from "../components/PendingFriends";
import AnotherPeople from "../components/AnotherPeople";

const Search = () => {
  const [search, setSearch] = useState(""); // input to search
  const [data, setData] = useState([]); // Data fetched
  const [activeUser, setActiveUser] = useState([]); // the information of user active
  const [loaded, setLoading] = React.useState(false); // Chech if all user is already fetched
  const [myFriends, setMyfriends] = useState({});
  const [retry, setRetry] = useState(true);

  useEffect(() => {
    // Start to get the user active informations
    if (!loaded) {
      axios.get("http://localhost:8081/").then((res) => {
        setActiveUser(res.data);
        setLoading(true);
      });
    }
  }, []);
  useEffect(() => {
    // Get user friend
    axios
      .get("http://localhost:8081/friend")
      .then((res) => {
        setMyfriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [retry]);

  const redoFetch = () => {
    setRetry(false);
  };

  // get all users
  useEffect(() => {
    // Getting all users
    axios
      .get("http://localhost:8081/all")
      .then((res) => {
        setData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="search page">
      <form className="searchBar">
        <TextField
          className="searchbar"
          required
          value={search}
          onChange={handleSearch}
          label="Search"
          variant="outlined"
        />
        {/* <img src={ico} alt="search icon" className="searchBtn" /> */}
      </form>
      <h4>Friends : </h4>
      <Friends myFriends={myFriends} activeUser={activeUser} />
      <h4>Pending : </h4>
      <PendingFriends
        myFriends={myFriends}
        activeUser={activeUser}
        search={search}
      />
      <h4>Another person : </h4>
      <AnotherPeople
        data={data}
        search={search}
        activeUser={activeUser}
        myFriends={myFriends}
        onRedoFetch={redoFetch}
      />
    </div>
  );
};

export default Search;
