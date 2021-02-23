import React, { useState } from "react";
import List from "./List";
import New from "./New";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  const initialState = JSON.parse(localStorage.getItem("questionnaire")),
    [state, setState] = useState(initialState ?? []),
    update = (next) => {
      setState(next);
      localStorage.setItem("questionnaire", JSON.stringify(next));
    },
    add = (newQuestion) => update([...state, newQuestion]),
    clear = () => update([]),
    fake = () =>
      update([
        ...state,
        ...[...Array(50).keys()].map((key) => ({
          question: `вопрос ${state.length + key + 1}`,
          answers: ["да", "нет"],
        })),
      ]);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/new">
            <New add={add} />
          </Route>
          <Route path="/:page(\d+)?">
            <List questions={state} fake={fake} clear={clear} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
