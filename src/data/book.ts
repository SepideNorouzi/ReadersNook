import type { Book } from "../types/book";
import img1 from "../assets/hero.jpg";

const createBook = ({
  id,
  title,
  author,
  summary,
  currentPage,
  totalPages,
  status,
  rating,
}: {
  id: string;
  title: string;
  author: string;
  summary: string;
  currentPage: number;
  totalPages: number;
  status: "current" | "tbr" | "read";
  rating: number;
}): Book => ({
  id,
  title,
  author,
  summary,

  coverUrl: img1,

  aestheticImages: [img1, img1, img1],

  currentPage,
  totalPages,

  status,
  rating,

  quotes: [
    {
      id: `${id}-1`,
      text: "The smallest choices shape the largest stories.",
      page: Math.floor(totalPages * 0.25),
      favorite: true,
      createdAt: "2026-07-01",
    },
    {
      id: `${id}-2`,
      text: "Every page changes the reader a little.",
      page: Math.floor(totalPages * 0.65),
      favorite: false,
      createdAt: "2026-07-05",
    },
  ],
});

export const books: Book[] = [
  // ---------- Currently reading (2) ----------
  createBook({
    id: "1",
    title: "Piranesi",
    author: "Susanna Clarke",
    summary:
      "A mysterious man lives in an endless house filled with statues and flooded halls while searching for the truth of his existence.",
    currentPage: 88,
    totalPages: 245,
    status: "current",
    rating: 5,
  }),
  createBook({
    id: "2",
    title: "The Midnight Library",
    author: "Matt Haig",
    summary:
      "Between life and death lies a library where every book represents another version of your life.",
    currentPage: 182,
    totalPages: 304,
    status: "current",
    rating: 4,
  }),

  // ---------- TBR (20) — unlocks Future Reader + Adventure Awaits ----------
  createBook({
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    summary:
      "A practical guide to building good habits through small daily improvements.",
    currentPage: 0,
    totalPages: 320,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "4",
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    summary:
      "Bilbo Baggins leaves the comfort of home for an unforgettable adventure.",
    currentPage: 0,
    totalPages: 366,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "5",
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    summary: "A nostalgic story about love, loss, and growing into adulthood.",
    currentPage: 0,
    totalPages: 296,
    status: "tbr",
    rating: 4,
  }),
  createBook({
    id: "6",
    title: "The Secret History",
    author: "Donna Tartt",
    summary:
      "A murder among classics students slowly unravels into obsession and guilt.",
    currentPage: 0,
    totalPages: 559,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "7",
    title: "Dune",
    author: "Frank Herbert",
    summary:
      "Politics, prophecy and survival collide on the desert planet Arrakis.",
    currentPage: 0,
    totalPages: 688,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "8",
    title: "The Book Thief",
    author: "Markus Zusak",
    summary: "A young girl discovers the power of books during World War II.",
    currentPage: 0,
    totalPages: 552,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "12",
    title: "Circe",
    author: "Madeline Miller",
    summary:
      "The witch of Aiaia tells her own story of exile, power, and transformation.",
    currentPage: 0,
    totalPages: 393,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "13",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    summary:
      "An artificial friend watches the world with quiet devotion and unsettling insight.",
    currentPage: 0,
    totalPages: 303,
    status: "tbr",
    rating: 4,
  }),
  createBook({
    id: "14",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    summary:
      "A gifted young man recounts the legendary beginnings of his life as a hero.",
    currentPage: 0,
    totalPages: 662,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "15",
    title: "Normal People",
    author: "Sally Rooney",
    summary:
      "Two classmates circle each other through love, class, and quiet misunderstandings.",
    currentPage: 0,
    totalPages: 273,
    status: "tbr",
    rating: 4,
  }),
  createBook({
    id: "16",
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    summary:
      "A count under house arrest turns a hotel into a world of dignity and friendship.",
    currentPage: 0,
    totalPages: 462,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "17",
    title: "The Overstory",
    author: "Richard Powers",
    summary:
      "Interwoven lives of people who discover the secret language of trees.",
    currentPage: 0,
    totalPages: 502,
    status: "tbr",
    rating: 4,
  }),
  createBook({
    id: "18",
    title: "Babel",
    author: "R. F. Kuang",
    summary:
      "Oxford translators learn that language itself can be a weapon of empire.",
    currentPage: 0,
    totalPages: 544,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "19",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    summary:
      "Two friends build games—and a lifelong creative partnership—across decades.",
    currentPage: 0,
    totalPages: 401,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "20",
    title: "The Priory of the Orange Tree",
    author: "Samantha Shannon",
    summary:
      "Queens, dragons, and spies collide in an epic fantasy of divided worlds.",
    currentPage: 0,
    totalPages: 848,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "21",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    summary:
      "A brilliant chemist turns a 1960s cooking show into a quiet revolution.",
    currentPage: 0,
    totalPages: 400,
    status: "tbr",
    rating: 4,
  }),
  createBook({
    id: "22",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    summary:
      "Two young magicians compete inside a circus that only appears at night.",
    currentPage: 0,
    totalPages: 387,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "23",
    title: "Anxious People",
    author: "Fredrik Backman",
    summary:
      "A failed bank robbery turns into an unexpected study of human connection.",
    currentPage: 0,
    totalPages: 352,
    status: "tbr",
    rating: 4,
  }),
  createBook({
    id: "24",
    title: "The House in the Cerulean Sea",
    author: "T. J. Klune",
    summary:
      "A by-the-book caseworker finds home among magical children on a remote island.",
    currentPage: 0,
    totalPages: 398,
    status: "tbr",
    rating: 5,
  }),
  createBook({
    id: "25",
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    summary:
      "War college survival means bonding with dragons—or dying in the attempt.",
    currentPage: 0,
    totalPages: 498,
    status: "tbr",
    rating: 4,
  }),

  // ---------- Read (12) — unlocks Bookworm + yearly goal (and Halfway There) ----------
  createBook({
    id: "9",
    title: "Project Hail Mary",
    author: "Andy Weir",
    summary: "A lone astronaut awakens with no memory and must save humanity.",
    currentPage: 476,
    totalPages: 496,
    status: "read",
    rating: 5,
  }),
  createBook({
    id: "10",
    title: "The Alchemist",
    author: "Paulo Coelho",
    summary:
      "A shepherd travels the world in search of treasure and discovers himself.",
    currentPage: 208,
    totalPages: 208,
    status: "read",
    rating: 4,
  }),
  createBook({
    id: "11",
    title: "Educated",
    author: "Tara Westover",
    summary:
      "A memoir about education, identity, and the courage to redefine yourself.",
    currentPage: 352,
    totalPages: 352,
    status: "read",
    rating: 5,
  }),
  createBook({
    id: "26",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    summary:
      "A girl raised in the marsh becomes the center of a small-town murder mystery.",
    currentPage: 368,
    totalPages: 368,
    status: "read",
    rating: 4,
  }),
  createBook({
    id: "27",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    summary:
      "A psychotherapist becomes obsessed with a famous painter who never speaks.",
    currentPage: 336,
    totalPages: 336,
    status: "read",
    rating: 4,
  }),
  createBook({
    id: "28",
    title: "//TODO: Never Let Me Go",
    author: "Kazuo Ishiguro",
    summary:
      "Friends at a mysterious English boarding school slowly learn the truth of their fate.",
    currentPage: 288,
    totalPages: 288,
    status: "read",
    rating: 5,
  }),
  createBook({
    id: "29",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    summary:
      "A reclusive Hollywood icon finally tells the truth about love and ambition.",
    currentPage: 400,
    totalPages: 400,
    status: "read",
    rating: 5,
  }),
  createBook({
    id: "30",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    summary:
      "A sweeping history of humankind from foragers to the modern age.",
    currentPage: 443,
    totalPages: 443,
    status: "read",
    rating: 5,
  }),
  createBook({
    id: "31",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    summary:
      "Patroclus retells the Iliad as a story of love, glory, and inevitable loss.",
    currentPage: 416,
    totalPages: 416,
    status: "read",
    rating: 5,
  }),
  createBook({
    id: "32",
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    summary:
      "Indigenous wisdom and science meet in essays on reciprocity with the living world.",
    currentPage: 408,
    totalPages: 408,
    status: "read",
    rating: 5,
  }),
  createBook({
    id: "33",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    summary:
      "Wealth, desire, and illusion collide on Long Island in the Jazz Age.",
    currentPage: 180,
    totalPages: 180,
    status: "read",
    rating: 4,
  }),
  createBook({
    id: "34",
    title: "Station Eleven",
    author: "Emily St. John Mandel",
    summary:
      "A traveling theater troupe preserves art after a pandemic reshapes the world.",
    currentPage: 333,
    totalPages: 333,
    status: "read",
    rating: 5,
  }),
];
