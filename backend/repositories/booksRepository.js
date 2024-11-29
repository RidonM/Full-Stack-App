const { generateRandomString } = require("../utils");
const mysql2 = require('mysql2/promise');

let books = [
  {
    id: 1,
    isbn: "123-afds-9",
    title: "Kronike ne gur",
    author: "Ismail Kadare",
    publishedAt: "1972",
    genre: "biography",
    rating: 4.5,
    noOfPages: 250,
    imageUrl:
      "https://www.kultplus.com/wp-content/uploads/2018/09/kronike-ne-gur-ismail-kadare-670x1024.jpg",
    description:
      "Kronikë në gur është një prej romaneve të hershëm të Ismail Kadaresë, i botuar së pari më 1971, flet për qytetin e Gjirokastrës e traditat e saj. Motivet autobiografike çojnë drejt fëmijërisë së autorit aty gjatë Luftës së Dytë Botërore.",
  },
  {
    id: 2,
    isbn: "456-bhkd-3",
    title: "1984",
    author: "George Orwell",
    publishedAt: "1949",
    genre: "dystopian",
    rating: 4.9,
    noOfPages: 328,
    imageUrl:
      "https://prodimage.images-bn.com/pimages/9780452262935_p0_v5_s1200x630.jpg",
    description:
      "A chilling vision of a totalitarian future, 1984 depicts a world of surveillance and repression under the Party, where independent thought is a crime, and the truth is constantly rewritten.",
  },
  {
    id: 3,
    isbn: "789-jhgl-2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedAt: "1960",
    genre: "fiction",
    rating: 4.8,
    noOfPages: 281,
    imageUrl:
      "https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg",
    description:
      "A gripping, heart-wrenching tale of prejudice and justice in the American South, Harper Lee’s classic novel explores themes of racism, morality, and innocence through the eyes of young Scout Finch.",
  },
  {
    id: 4,
    isbn: "101-asdf-7",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publishedAt: "1813",
    genre: "romance",
    rating: 4.7,
    noOfPages: 279,
    imageUrl:
      "https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF1000,1000_QL80_.jpg",
    description:
      "A witty and romantic tale of love and social standing, Jane Austen’s Pride and Prejudice introduces Elizabeth Bennet and her journey to overcome first impressions, especially of the enigmatic Mr. Darcy.",
  },
  {
    id: 5,
    isbn: "112-ghjk-5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedAt: "1925",
    genre: "classic",
    rating: 4.4,
    noOfPages: 180,
    imageUrl:
      "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
    description:
      "F. Scott Fitzgerald’s novel of the Jazz Age tells the tragic story of Jay Gatsby and his obsessive love for Daisy Buchanan, set against a backdrop of wealth, class, and idealism.",
  },
  {
    id: 6,
    isbn: "134-uwqe-6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publishedAt: "1951",
    genre: "fiction",
    rating: 4.3,
    noOfPages: 214,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
    description:
      "The story of Holden Caulfield, a disenchanted teenager, who wanders through New York City, grappling with the harshness of adulthood and searching for identity and meaning.",
  },
  {
    id: 7,
    isbn: "156-bvnm-3",
    title: "Moby-Dick",
    author: "Herman Melville",
    publishedAt: "1851",
    genre: "adventure",
    rating: 3.9,
    noOfPages: 635,
    imageUrl:
      "https://m.media-amazon.com/images/I/91EQgLKb1TL._AC_UF1000,1000_QL80_.jpg",
    description:
      "Herman Melville’s epic of adventure and obsession follows Captain Ahab’s relentless pursuit of the white whale Moby-Dick, exploring themes of revenge, fate, and the limits of human knowledge.",
  },
  {
    id: 8,
    isbn: "178-xcnd-4",
    title: "War and Peace",
    author: "Leo Tolstoy",
    publishedAt: "1869",
    genre: "historical",
    rating: 4.8,
    noOfPages: 1225,
    imageUrl:
      "https://m.media-amazon.com/images/I/81oHM-dzefL._AC_UF350,350_QL50_.jpg",
    description:
      "Tolstoy’s sweeping saga set during the Napoleonic Wars follows the lives of five families and explores the complex interplay between personal lives and historical events.",
  },
  {
    id: 9,
    isbn: "190-pmws-5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publishedAt: "1937",
    genre: "fantasy",
    rating: 4.7,
    noOfPages: 310,
    imageUrl:
      "https://m.media-amazon.com/images/I/811N1WnBP8L._AC_UF1000,1000_QL80_.jpg",
    description:
      "An enchanting tale of adventure and bravery, Bilbo Baggins, a reluctant hobbit, sets off on an epic quest to win a share of treasure guarded by the fearsome dragon Smaug.",
  },
  {
    id: 10,
    isbn: "202-vbhk-7",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    publishedAt: "1954",
    genre: "fantasy",
    rating: 4.9,
    noOfPages: 423,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/The_Fellowship_of_the_Ring_cover.gif/220px-The_Fellowship_of_the_Ring_cover.gif",
    description:
      "The first book in Tolkien’s epic trilogy follows Frodo Baggins and his friends as they embark on a perilous journey to destroy the One Ring and prevent the Dark Lord Sauron from ruling Middle-earth.",
  },
  {
    id: 11,
    isbn: "214-zxbd-8",
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    publishedAt: "1947",
    genre: "biography",
    rating: 4.8,
    noOfPages: 283,
    imageUrl:
      "https://m.media-amazon.com/images/I/8126p2BWjxL._AC_UF1000,1000_QL80_.jpg",
    description:
      "The Diary of a Young Girl is a deeply moving, first-person account of a Jewish teenager hiding from the Nazis during World War II. Anne Frank's entries provide insight into her thoughts, emotions, and the challenges she faced in hiding.",
  },
  {
    id: 12,
    isbn: "226-nmjd-2",
    title: "Brave New World",
    author: "Aldous Huxley",
    publishedAt: "1932",
    genre: "dystopian",
    rating: 4.6,
    noOfPages: 268,
    imageUrl:
      "https://m.media-amazon.com/images/I/81p56WUuDbL._AC_UF1000,1000_QL80_.jpg",
    description:
      "Brave New World is a dystopian novel exploring a future society dominated by technological advancements and strict social control. Aldous Huxley examines themes of freedom, individuality, and the cost of a superficially perfect society.",
  },
  {
    id: 13,
    isbn: "238-oiuy-9",
    title: "Catch-22",
    author: "Joseph Heller",
    publishedAt: "1961",
    genre: "satire",
    rating: 4.3,
    noOfPages: 453,
    imageUrl:
      "https://m.media-amazon.com/images/I/71Ym0vDDWsL._AC_UF1000,1000_QL80_.jpg",
    description:
      "Catch-22 is a satirical novel set during World War II, following the absurd and often contradictory experiences of Captain John Yossarian. Joseph Heller's work humorously critiques the nature of war and bureaucracy.",
  },
  {
    id: 14,
    isbn: "250-rtfg-0",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    publishedAt: "1890",
    genre: "classic",
    rating: 4.2,
    noOfPages: 254,
    imageUrl:
      "https://m.media-amazon.com/images/I/71q3FNqEIQL._AC_UF1000,1000_QL80_.jpg",
    description:
      "The Picture of Dorian Gray explores themes of vanity, moral corruption, and the pursuit of eternal youth. Oscar Wilde's only novel examines the consequences of a man who sells his soul to remain young while his portrait ages.",
  },
  {
    id: 15,
    isbn: "262-kjhg-1",
    title: "Frankenstein",
    author: "Mary Shelley",
    publishedAt: "1818",
    genre: "horror",
    rating: 4.5,
    noOfPages: 280,
    imageUrl:
      "https://m.media-amazon.com/images/I/515zE1GxvAL._AC_UF1000,1000_QL80_.jpg",
    description:
      "Frankenstein is a horror novel that tells the story of Victor Frankenstein, a scientist who creates life only to be horrified by his own creation. Mary Shelley's work is a cautionary tale about the dangers of playing god and unchecked scientific ambition.",
  },
  {
    id: 16,
    isbn: "274-dfgh-2",
    title: "Dracula",
    author: "Bram Stoker",
    publishedAt: "1897",
    genre: "horror",
    rating: 4.4,
    noOfPages: 418,
    imageUrl:
      "https://ih1.redbubble.net/image.497357846.1091/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg",
    description:
      "Dracula follows the story of Count Dracula's attempt to move from Transylvania to England, and the efforts of a small group to stop him. Bram Stoker's novel is a classic of horror and helped establish many conventions of vampire fiction.",
  },
  {
    id: 17,
    isbn: "286-qwer-3",
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    publishedAt: "1880",
    genre: "philosophical",
    rating: 4.7,
    noOfPages: 796,
    imageUrl:
      "https://m.media-amazon.com/images/I/71OZJsgZzQL._AC_UF1000,1000_QL80_.jpg",
    description:
      "The Brothers Karamazov is a philosophical novel that delves into themes of faith, free will, and family dynamics. Fyodor Dostoevsky’s complex narrative explores the lives and inner conflicts of the Karamazov family.",
  },
  {
    id: 18,
    isbn: "298-tyui-4",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    publishedAt: "1866",
    genre: "psychological",
    rating: 4.8,
    noOfPages: 430,
    imageUrl:
      "https://m.media-amazon.com/images/I/51h-RSUVvvL._AC_UF1000,1000_QL80_.jpg",
    description:
      "Crime and Punishment follows Raskolnikov, a young man who commits murder and grapples with guilt, redemption, and existential crises. Dostoevsky examines the psychological torment and moral dilemmas of his protagonist.",
  },
  {
    id: 19,
    isbn: "310-hjkl-5",
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    publishedAt: "1877",
    genre: "romance",
    rating: 4.6,
    noOfPages: 864,
    imageUrl:
      "https://www.readandcobooks.co.uk/wp-content/uploads/anna-karenina-tolstoy-9781528718196-cover.jpg",
    description:
      "Anna Karenina is a novel about love, betrayal, and social expectations in 19th-century Russia. Leo Tolstoy's work explores the complexities of human relationships through the tragic story of Anna, who defies societal norms.",
  },
  {
    id: 20,
    isbn: "322-wxyz-6",
    title: "Les Misérables",
    author: "Victor Hugo",
    publishedAt: "1862",
    genre: "historical",
    rating: 4.8,
    noOfPages: 1232,
    imageUrl:
      "https://m.media-amazon.com/images/I/81l16Mkmv0L._AC_UF1000,1000_QL80_.jpg",
    description:
      "Les Misérables is an epic novel that tells the story of ex-convict Jean Valjean's redemption, set against the social and political backdrop of 19th-century France. Victor Hugo examines themes of justice, mercy, and human resilience.",
  },
];

exports.getBookById = (id) => {
  return books.find((b) => b.id == id);
};

exports.getAllBooks = async () => {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bookmanagement'
  });

  let query = 'SELECT b.id, b.isbn, b.title, b.description, b.rating, a.fullName author, g.name genre FROM books b JOIN authors a ON b.authorId = a.id JOIN genres g ON b.genreId = g.id';

  try{
      const [books] = await connection.execute(query);
      return books;
  }
  catch(e){
      console.error(e);
  }
  finally{
      connection.destroy();
  }
};

exports.createBook = (book) => {
  let newId = generateRandomString(10);

  book.id = newId;
  books.push(book);

  return book;
};

exports.editBookBy = (id, book) => {
  const index = books.findIndex((b) => b.id === id);

  if (index !== -1) {
    books[index] = { ...books[index], ...book };
    return books[index];
  }
  return null;
};

exports.deleteBookBy = (id) => {
  books = books.filter((b) => b.id != id);
};
