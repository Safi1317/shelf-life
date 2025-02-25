import "./Card.css";
import Star from "../../components/AddBook/Star";

function Card({ book }) {
  return (
 
      <div
        key={book.bookId}
        className=" bookCard  block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        {book.image ? (
          <img src={book.image} className="bookImage" alt={`The cover for ${book.title}`} />
        ) : null}
        <h5 className="mb-2 text-md  tracking-tight text-gray-900 dark:text-white">
          {book.title}
        </h5>
        <p className=" authors text-gray-700 dark:text-gray-400">
          {" "}
          {book.authors.join(", ")}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {book.comment}{" "}
        </p>

        <div className="star-container">
          {book.rating >= 1 && <Star />} {book.rating >= 2 && <Star />}{" "}
          {book.rating >= 3 && <Star />} {book.rating >= 4 && <Star />}{" "}
          {book.rating >= 5 && <Star />}
        </div>

      </div>
 
  );
}

export { Card };
