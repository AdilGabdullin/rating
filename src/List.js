import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

export default function List({ questions, fake, clear }) {
  const perPage = 10,
    notEmpty = questions.length > 0,
    last = Math.ceil(questions.length / perPage),
    page = +(useParams().page ?? last),
    history = useHistory(),
    begin = (page - 1) * perPage,
    pageQuestions = questions.slice(begin, begin + perPage),
    pageChange = (page) => {
      history.push(`/${page}`);
    };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>{notEmpty ? "Список вопросов" : "Анкета пуста"}</h1>
        </div>
        <div className="col">
          <Link to="/new">
            <button className="btn btn-primary mt-2">Добавить</button>
          </Link>
        </div>
        <div className="col">
          <button className="btn btn-primary mt-2" onClick={fake}>
            Добавить 50
          </button>
        </div>
        <div className="col">
          <button className="btn btn-primary mt-2" onClick={clear}>
            Очистить
          </button>
        </div>
      </div>
      {notEmpty && (
        <>
          <div className="row">
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Вопрос</th>
                  </tr>
                </thead>
                <tbody>
                  {pageQuestions.map(({ question }, key) => (
                    <tr key={key}>
                      <td>{begin + key + 1}</td>
                      <td>{question}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-md-auto">
              <Pagination
                activePage={page}
                itemsCountPerPage={perPage}
                totalItemsCount={questions.length}
                pageRangeDisplayed={3}
                onChange={pageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
