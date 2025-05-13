/*
Fetch data
Handle load, error case

Fetch api, useEffect, state management, conditional rendering 
https://jsonplaceholder.typicode.com/posts
*/

import React, { useState, useEffect } from "react";

export default function JsonPosts() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Network response was not okay!");
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div className="App">
      <ul>
        {data.map((item, i) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
