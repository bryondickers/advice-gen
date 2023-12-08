import React from "react";
import btn from "../images/icon-dice.svg";
import { useQuery } from "@tanstack/react-query";
import "./index.css";
import mobileDivider from "../images/pattern-divider-mobile.svg";
import axios from "axios";

export default function App() {
  const { data, isLoading, error, refetch, isRefetchError } = useQuery({
    queryKey: ["advice"],
    queryFn: () => {
      return axios.get("https://api.adviceslip.com/advice").then((res) => res);
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || isRefetchError) {
    return <h1>Server is down at the momemnt</h1>;
  }
  const { id, advice } = data.data.slip;

  return (
    <main>
      <h1>{`Advice #${id}`}</h1>
      <p>{'"' + advice + '"'}</p>
      <img className="quoteImage" src={mobileDivider} />
      <button
        onClick={() => {
          refetch();
        }}
      >
        <img src={btn} />
      </button>
    </main>
  );
}
