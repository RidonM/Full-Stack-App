import { useNavigate } from "react-router-dom";

const BookRow = ({ book, id }) => {
  const navigate = useNavigate();

  function goToDetails(id) {
    navigate(`/books/${id}`);
  }

  return (
    <>
      <div onClick={() => goToDetails(id)} className="book-row">
        <div className="book-info">
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>Rating:</strong> {book.rating} / 5 ⭐
          </p>
        </div>
      </div>
    </>
  );
};

export default BookRow;
