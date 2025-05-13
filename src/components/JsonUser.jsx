import React, { useEffect, useState } from "react";

export default function JsonUser() {
  const [fetchedData, setFetchedData] = useState([]);
  const [searched, setSearched] = useState("");

  // ! promise .then
  // function fetchData() {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res.json())
  //     .then((data) => setFetchedData(data))
  //     .catch((err) => console.log(err));
  // }

  // ! async await

  const fetchData = async () => {
    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!data.ok) {
        throw new Error("error is there");
      }
      const jsonData = await data.json();
      console.log(jsonData);
      setFetchedData(jsonData);
      console.log(fetchedData);
    } catch (e) {
      console.log("error", e.message);
    }
  };

  useEffect(() => {
    if (searched === "") fetchData();
  }, [searched]);

  useEffect(() => {
    if (searched) {
      // !using.includes;

      const new_data = fetchedData.filter((item) => {
        return item.name.toLowerCase().includes(searched.toLowerCase());
      });

      //  // ! using .indexOf

      // const new_data = fetchedData.filter((item) => {
      //   return item.name.toLowerCase().indexOf(searched.toLowerCase()) > -1;
      // });

      setFetchedData(new_data);
    }
  }, [searched]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search by name"
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
      />
      <table>
        <th style={{ paddingLeft: "0px" }}>ID</th>
        <th style={{ paddingLeft: "50px" }}>Name</th>
        <th style={{ paddingLeft: "100px" }}>Username</th>
        <th style={{ paddingLeft: "60px" }}>City</th>
      </table>
      <tbody>
        {fetchedData.map((item, i) => {
          return (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.address.city}</td>
            </tr>
          );
        })}
      </tbody>
    </div>
  );
}
