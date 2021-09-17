import React from "react";
import "./pagination.css";

export default function Pagination() {
  return (
    <div className="pagination-root">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <div style={{ marginRight: "50px" }}>
            <li className="page-item">
              <a
                className="page-link pagebtn"
                href="bbhbj"
                aria-label="Previous">
                <span aria-hidden="true">&laquo; Prev</span>
              </a>
            </li>
          </div>
          <div>
            <li className="page-item">
              <a className="page-link pagebtn" href="bbhbj" aria-label="Next">
                <span aria-hidden="true">Next &raquo;</span>
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
