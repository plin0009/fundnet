import React from "react";

const Tiles = ({ children, columns = 3 }) => {
  const childrenInColumns = [];
  for (let i = 0; i < columns; i++) {
    childrenInColumns.push([]);
  }
  for (let j = 0; j < children.length; j++) {
    childrenInColumns[j % columns].push(children[j]);
  }
  const columnSize = 12 / columns;
  return (
    <div className="columns">
      {childrenInColumns.map((childrenInColumn) => (
        <div className={`column is-${columnSize}`}>
          <div className="columns is-multiline">
            {childrenInColumn.map((child) => (
              <div className="column is-12">{child}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tiles;
