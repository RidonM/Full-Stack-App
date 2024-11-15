import { useEffect, useState } from "react";
import "./App.css";
import BookRow from "./components/BookRow";
import Header from "./components/Header";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch("http://localhost:8585/books");
      const json = await response.json();

      if (json.success) {
        setBooks(json.data);
      }
    };

    getBooks();
  }, []);

  return (
    <>
      <Header />
      <main>
        {books.map((book) => (
          <BookRow key={book.id} id={book.id} book={book} />
        ))}
      </main>
    </>
  );
}

export default App;
