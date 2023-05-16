import "./Bookcase.css";
import { Shelf } from "../../compontents";
import { useState } from "react";

import { fakedata, convert } from "../../utils/dragUtils";
import { DragDropContext } from "@hello-pangea/dnd";

function Bookcase() {
  const [books, setBooks] = useState(fakedata);
  const [items, setItems] = useState(convert(fakedata));

  function onDragEnd({ source, destination }) {
    const newBooks = { ...books };

    // determine source and destination shelf, stack
    const { 1: sourceStackId, 2: sourceShelfNum } =
      source.droppableId.split("-");
    const { 1: destStackId, 2: destShelfNum } =
      destination.droppableId.split("-");

    const bSourceStack = [...books.shelves[sourceShelfNum][sourceStackId]];
    const bDestStack =
      source.droppableId === destination.droppableId
        ? bSourceStack
        : [...books.shelves[destShelfNum][destStackId]];

    const [removedBook] = bSourceStack.splice(source.index, 1);
    bDestStack.splice(destination.index, 0, removedBook);

    newBooks.shelves[sourceShelfNum][sourceStackId] = bSourceStack;
    newBooks.shelves[destShelfNum][destStackId] = bDestStack;

    setBooks(newBooks);
    setItems(convert(newBooks));
  }

  return (
    <section id="bookcase">
      <DragDropContext onDragEnd={onDragEnd}>
        {books.shelves.map((shelf, shelfIndex) => {
          return (
            <Shelf
              key={shelfIndex}
              shelfIndex={shelfIndex}
              books={books.shelves[shelfIndex]}
              items={items}
            />
          );
        })}
      </DragDropContext>
    </section>
  );
}

export { Bookcase };
