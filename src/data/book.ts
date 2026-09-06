import type { Book } from "../types/book";
import { aestheticPhotos } from "./aesthetic";

// ---------- ACOTAR ----------
import acotar from "../assets/covers/acotar.jpg";
import acomaf from "../assets/covers/acomaf.jpg";
import wingsAndRuin from "../assets/covers/acowar.jpg";
import frostAndStarlight from "../assets/covers/acofas.jpg";
import silverFlames from "../assets/covers/acosf.jpg";

// ---------- Throne of Glass ----------
import tog from "../assets/covers/tog.jpg";
import com from "../assets/covers/com.jpg";
import assassinsBlade from "../assets/covers/assasin.jpg";
import heirOfFire from "../assets/covers/hof.jpg";
import queenOfShadows from "../assets/covers/qosh.jpg";
import empireOfStorms from "../assets/covers/eos.jpg";
import towerOfDawn from "../assets/covers/tod.jpg";
import kingdomOfAsh from "../assets/covers/koa.jpg";

// ---------- Harry Potter ----------
import sorcerer from "../assets/covers/sorcerer.jpg";
import chamber from "../assets/covers/chamber.jpg";
import prisoner from "../assets/covers/prisoner.jpg";
import goblet from "../assets/covers/goblet.jpg";
import orderOfPhoenix from "../assets/covers/phoenix.jpg";
import halfBloodPrince from "../assets/covers/prince.jpg";
import deathlyHallows from "../assets/covers/hallows.jpg";

const imagesByBookId = aestheticPhotos.reduce<Record<string, string[]>>(
  (acc, photo) => {
    acc[photo.bookId] = [...(acc[photo.bookId] ?? []), photo.imageUrl];

    return acc;

    // Example result:
    // {
    //   "1": ["forest.jpg", "castle.jpg"],
    //   "2": ["night.jpg"]
    // }
  },
  {},
);

const createBook = ({
  id,
  title,
  author,
  summary,
  coverUrl,
  currentPage,
  totalPages,
  status,
  rating,
}: {
  id: string;
  title: string;
  author: string;
  summary: string;
  coverUrl: string;
  currentPage: number;
  totalPages: number;
  status: "current" | "tbr" | "read";
  rating: number;
}): Book => {
  const quotesByBook: Record<
    string,
    {
      text: string;
      pagePercent: number;
      favorite: boolean;
      createdAt: string;
    }[]
  > = {
    // =====================================================
    // ACOTAR COLLECTION
    // =====================================================

    "1": [
      {
        text: "Sometimes survival is the first step toward discovering who you are.",
        pagePercent: 0.28,
        favorite: true,
        createdAt: "2026-07-01",
      },
      {
        text: "A heart can bloom in the most unexpected places.",
        pagePercent: 0.71,
        favorite: false,
        createdAt: "2026-07-03",
      },
    ],

    "2": [
      {
        text: "Healing does not erase the past. It teaches you how to live beyond it.",
        pagePercent: 0.34,
        favorite: true,
        createdAt: "2026-07-05",
      },
      {
        text: "Love should never require you to become less of yourself.",
        pagePercent: 0.76,
        favorite: true,
        createdAt: "2026-07-07",
      },
    ],

    "5": [
      {
        text: "Strength is sometimes nothing more than choosing to begin again.",
        pagePercent: 0.41,
        favorite: true,
        createdAt: "2026-07-09",
      },
      {
        text: "You are not defined by the pieces of yourself you thought were broken.",
        pagePercent: 0.69,
        favorite: false,
        createdAt: "2026-07-11",
      },
    ],

    // =====================================================
    // THRONE OF GLASS COLLECTION
    // =====================================================

    "6": [
      {
        text: "Every choice leaves a mark, even the ones made in silence.",
        pagePercent: 0.25,
        favorite: false,
        createdAt: "2026-07-13",
      },
    ],

    "7": [
      {
        text: "Freedom is worth fighting for, even when the cost feels impossible.",
        pagePercent: 0.38,
        favorite: true,
        createdAt: "2026-07-15",
      },
      {
        text: "A person can survive what once seemed impossible.",
        pagePercent: 0.73,
        favorite: true,
        createdAt: "2026-07-17",
      },
    ],

    "9": [
      {
        text: "Fire does not only destroy. Sometimes it reveals what was hidden underneath.",
        pagePercent: 0.46,
        favorite: true,
        createdAt: "2026-07-19",
      },
    ],

    "13": [
      {
        text: "The darkest road can still lead somewhere worth fighting for.",
        pagePercent: 0.51,
        favorite: false,
        createdAt: "2026-07-21",
      },
      {
        text: "Hope becomes powerful when people choose to carry it together.",
        pagePercent: 0.89,
        favorite: true,
        createdAt: "2026-07-23",
      },
    ],

    // =====================================================
    // HARRY POTTER COLLECTION
    // =====================================================

    "14": [
      {
        text: "Sometimes the world becomes extraordinary when you finally discover where you belong.",
        pagePercent: 0.22,
        favorite: true,
        createdAt: "2026-07-25",
      },
      {
        text: "The smallest act of courage can open the door to an entirely new world.",
        pagePercent: 0.64,
        favorite: false,
        createdAt: "2026-07-27",
      },
    ],

    "16": [
      {
        text: "The past may explain you, but it does not have to define you.",
        pagePercent: 0.48,
        favorite: true,
        createdAt: "2026-07-29",
      },
    ],

    "17": [
      {
        text: "Growing up means learning that courage and fear can exist at the same time.",
        pagePercent: 0.55,
        favorite: true,
        createdAt: "2026-07-31",
      },
    ],

    "20": [
      {
        text: "Even the longest journey is shaped by the people who walk beside you.",
        pagePercent: 0.84,
        favorite: true,
        createdAt: "2026-08-02",
      },
      {
        text: "Some endings are really beginnings wearing a darker disguise.",
        pagePercent: 0.94,
        favorite: false,
        createdAt: "2026-08-04",
      },
    ],
  };

  const quotes = (quotesByBook[id] ?? []).map((quote, index) => ({
    id: `${id}-${index + 1}`,
    bookId: id,
    text: quote.text,
    page: Math.floor(totalPages * quote.pagePercent),
    favorite: quote.favorite,
    createdAt: quote.createdAt,
    updatedAt: quote.createdAt,
    createdBy: "user",
  }));

  return {
    id,
    title,
    author,
    summary,
    coverUrl,

    aestheticImages: imagesByBookId[id] ?? [],

    currentPage,
    totalPages,

    status,
    rating,

    quotes,
  };
};

export const books: Book[] = [
  // =========================================================
  // ACOTAR — Sarah J. Maas
  // =========================================================

  createBook({
    id: "1",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    summary:
      "A huntress is dragged into a treacherous faerie realm after killing a wolf in the woods, and finds her fate entangled with the immortal Fae lord who claims her as payment.",
    coverUrl: acotar,
    currentPage: 432,
    totalPages: 432,
    status: "read",
    rating: 4,
  }),

  createBook({
    id: "2",
    title: "A Court of Mist and Fury",
    author: "Sarah J. Maas",
    summary:
      "Haunted by what she survived beneath the mountain, Feyre struggles with her new identity while discovering unexpected love, power, and a dangerous new court.",
    coverUrl: acomaf,
    currentPage: 340,
    totalPages: 626,
    status: "read",
    rating: 5,
  }),

  createBook({
    id: "3",
    title: "A Court of Wings and Ruin",
    author: "Sarah J. Maas",
    summary:
      "Feyre returns to the Spring Court on a dangerous mission while the looming war against Hybern forces the courts of Prythian toward an uncertain alliance.",
    coverUrl: wingsAndRuin,
    currentPage: 0,
    totalPages: 703,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "4",
    title: "A Court of Frost and Starlight",
    author: "Sarah J. Maas",
    summary:
      "After the war, Feyre and her friends attempt to rebuild their lives and celebrate the Winter Solstice while confronting the lingering wounds of battle.",
    coverUrl: frostAndStarlight,
    currentPage: 0,
    totalPages: 272,
    status: "tbr",
    rating: 4,
  }),

  createBook({
    id: "5",
    title: "A Court of Silver Flames",
    author: "Sarah J. Maas",
    summary:
      "Nesta Archeron struggles to heal from her past while finding strength, friendship, and a new purpose during intense training alongside Cassian.",
    coverUrl: silverFlames,
    currentPage: 500,
    totalPages: 757,
    status: "current",
    rating: 5,
  }),

  // =========================================================
  // THRONE OF GLASS — Sarah J. Maas
  // =========================================================

  createBook({
    id: "6",
    title: "The Assassin's Blade",
    author: "Sarah J. Maas",
    summary:
      "Five stories follow Celaena Sardothien before Throne of Glass, revealing the missions, friendships, betrayals, and choices that shaped the legendary assassin.",
    coverUrl: assassinsBlade,
    currentPage: 0,
    totalPages: 404,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "7",
    title: "Throne of Glass",
    author: "Sarah J. Maas",
    summary:
      "A legendary assassin is pulled from a labor camp to compete for her freedom as the king's champion, only to find someone is hunting the other competitors.",
    coverUrl: tog,
    currentPage: 0,
    totalPages: 404,
    status: "tbr",
    rating: 4,
  }),

  createBook({
    id: "8",
    title: "Crown of Midnight",
    author: "Sarah J. Maas",
    summary:
      "Now serving as the king's champion, Celaena secretly investigates a growing conspiracy while deadly forces begin closing in around her.",
    coverUrl: com,
    currentPage: 418,
    totalPages: 418,
    status: "read",
    rating: 5,
  }),

  createBook({
    id: "9",
    title: "Heir of Fire",
    author: "Sarah J. Maas",
    summary:
      "Broken by her past, Celaena travels to a distant land to confront her powers and destiny while dark forces gather across the kingdom.",
    coverUrl: heirOfFire,
    currentPage: 0,
    totalPages: 565,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "10",
    title: "Queen of Shadows",
    author: "Sarah J. Maas",
    summary:
      "Celaena returns to Rifthold determined to reclaim her throne and destroy the enemies who have taken everything from her.",
    coverUrl: queenOfShadows,
    currentPage: 0,
    totalPages: 648,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "11",
    title: "Empire of Storms",
    author: "Sarah J. Maas",
    summary:
      "Aelin gathers allies and armies for the war ahead as ancient powers awaken and the fate of Terrasen hangs in the balance.",
    coverUrl: empireOfStorms,
    currentPage: 0,
    totalPages: 689,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "12",
    title: "Tower of Dawn",
    author: "Sarah J. Maas",
    summary:
      "Chaol Westfall travels to a distant kingdom seeking healing, only to become involved in a political struggle and a much greater threat.",
    coverUrl: towerOfDawn,
    currentPage: 0,
    totalPages: 688,
    status: "tbr",
    rating: 4,
  }),

  createBook({
    id: "13",
    title: "Kingdom of Ash",
    author: "Sarah J. Maas",
    summary:
      "Aelin faces her greatest battle as her allies rally across Erilea for a final confrontation that will determine the future of their world.",
    coverUrl: kingdomOfAsh,
    currentPage: 0,
    totalPages: 992,
    status: "tbr",
    rating: 5,
  }),

  // =========================================================
  // HARRY POTTER — J.K. Rowling
  // =========================================================

  createBook({
    id: "14",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    summary:
      "An orphaned boy discovers on his eleventh birthday that he's a wizard and is whisked off to a magical school where an old mystery awaits him.",
    coverUrl: sorcerer,
    currentPage: 150,
    totalPages: 309,
    status: "current",
    rating: 5,
  }),

  createBook({
    id: "15",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    summary:
      "A hidden chamber and a mysterious voice in the walls threaten Hogwarts as Harry uncovers a decades-old secret tied to the school's history.",
    coverUrl: chamber,
    currentPage: 0,
    totalPages: 341,
    status: "tbr",
    rating: 4,
  }),

  createBook({
    id: "16",
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
    summary:
      "Harry learns that a dangerous prisoner has escaped from Azkaban while uncovering secrets about his parents and their connection to his own past.",
    coverUrl: prisoner,
    currentPage: 0,
    totalPages: 435,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "17",
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
    summary:
      "Harry unexpectedly becomes a competitor in the dangerous Triwizard Tournament while a much darker threat begins to return.",
    coverUrl: goblet,
    currentPage: 0,
    totalPages: 734,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "18",
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
    summary:
      "As the magical authorities deny the return of Voldemort, Harry forms a secret group at Hogwarts to prepare students for the coming conflict.",
    coverUrl: orderOfPhoenix,
    currentPage: 0,
    totalPages: 870,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "19",
    title: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
    summary:
      "Harry uncovers secrets about Voldemort's past while tensions at Hogwarts rise and the wizarding world moves closer to open war.",
    coverUrl: halfBloodPrince,
    currentPage: 0,
    totalPages: 652,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "20",
    title: "Harry Potter and the Deathly Hallows",
    author: "J.K. Rowling",
    summary:
      "Harry, Ron, and Hermione leave Hogwarts to find the objects that can destroy Voldemort, leading them toward the final battle.",
    coverUrl: deathlyHallows,
    currentPage: 0,
    totalPages: 759,
    status: "tbr",
    rating: 5,
  }),
];
