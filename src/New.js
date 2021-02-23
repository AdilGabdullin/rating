import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function New({ add }) {
  const [area, setArea] = useState(""),
    [input, setInput] = useState(""),
    [answers, setAnswers] = useState([]),
    areaChange = (event) => setArea(event.target.value),
    inputChange = (event) => setInput(event.target.value),
    history = useHistory(),
    addAnswer = () => {
      if (input === "") {
        window.alert('Поле "Ответ" не должно быть пустым.');
        return;
      }
      setAnswers([...answers, input]);
      setInput("");
    },
    save = () => {
      if (area.length < 20) {
        window.alert(
          'поле "Новый вопрос", обязательное к заполнению, минимум 20 символов.'
        );
        return;
      }
      if (answers.length < 2) {
        window.alert("минимум 2 варианта ответа.");
        return;
      }
      add({ question: area, answers });
      history.push("/");
    };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Новый вопрос</h1>
        </div>
      </div>
      <div className="row">
        <textarea
          name="text"
          id=""
          cols="30"
          rows="5"
          value={area}
          onChange={areaChange}
        />
      </div>
      <div className="row">
        <hr className="mt-4" />
      </div>
      <div className="row">
        <ul style={{ listStyle: "none" }}>
          {answers.map((option, key) => (
            <li key={key}>{option}</li>
          ))}
        </ul>
      </div>
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={inputChange}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={addAnswer}>
            Добавить
          </button>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-2">
          <button className="btn btn-primary" onClick={save}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
