import { useState } from 'react';
import './BookForm.css';
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
    const [bookData, setBookData] = useState({
        isbn: '',
        title: '',
        author: '',
        description: '',
        publishedAt: '',
        genre: '',
        noOfPages: '',
        imageUrl: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:8585/books', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        const json = await response.json();
       
        if (!json.success){
            alert('Could not create book');
            return;
        }

        const createdBook = json.data;

        navigate(`/books/${createdBook.id}`);
    }

    return (
        <form onSubmit={handleSubmit}>
          <h1>Book Form</h1>
          <input
            required
            type="text"
            name="isbn"
            value={bookData.isbn}
            onInput={(e) => setBookData({ ...bookData, isbn: e.target.value })}
            placeholder="ISBN"
          />
          <input
            required
            type="text"
            name="title"
            value={bookData.title}
            onInput={(e) => setBookData({ ...bookData, title: e.target.value })}
            placeholder="Title"
          />
          <input
            required
            type="text"
            name="author"
            value={bookData.author}
            onInput={(e) => setBookData({ ...bookData, author: e.target.value })}
            placeholder="Author"
          />
          <input
            required
            type="text"
            name="description"
            value={bookData.description}
            onInput={(e) =>
              setBookData({ ...bookData, description: e.target.value })
            }
            placeholder="Description"
          />
          <input
            required
            type="date"
            name="publishedAt"
            value={bookData.publishedAt}
            onInput={(e) =>
              setBookData({ ...bookData, publishedAt: e.target.value })
            }
          />
          <select
            value={bookData.genre}
            onChange={(e) => setBookData({ ...bookData, genre: e.target.value })}
          >
            <option value="">No Genre</option>
            <option value="romance">Romance</option>
            <option value="dystopian">Dystopian</option>
            <option value="horror">Horror</option>
            <option value="historical">Historical</option>
            <option value="philosophical">Philosophical</option>
            <option value="psychological">Psychological</option>
            <option value="classic">Classic</option>
            <option value="satire">Satire</option>
            <option value="biography">Biography</option>
            <option value="fantasy">Fantasy</option>
            <option value="adventure">Adventure</option>
            <option value="fiction">Fiction</option>
          </select>
          <input
            required
            type="number"
            name="noOfPages"
            value={bookData.noOfPages}
            onInput={(e) => setBookData({ ...bookData, noOfPages: e.target.value })}
            placeholder="Number of Pages"
          />
          <input
            required
            type="url"
            name="imageUrl"
            value={bookData.imageUrl}
            onInput={(e) => setBookData({ ...bookData, imageUrl: e.target.value })}
            placeholder="Image URL"
          />
          <button type="submit" value="Save">
            Submit
          </button>
        </form>
      );
}

export default BookForm;