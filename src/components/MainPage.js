import Containerr from "./Container";
import React, { useContext } from "react";
import { ChapterContext } from "../contexts/ChapterContext";
import { EmptyButton } from "../containers";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export function MainPage() {
  const contextType = useContext(ChapterContext);
  return (
    <div>
      <Containerr></Containerr>
      <Link
        to={{
          pathname: "/chapters",
          state: contextType.finalTree, // your data array of objects
        }}
      >
        <EmptyButton>Enviar</EmptyButton>
      </Link>
    </div>
  );
}
