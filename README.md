# 📚 Reader's Nook

> **Your books. Your progress. Your little corner of the reading world.**

**Reader's Nook** is a modern, cozy digital library designed to make managing your reading life simple and enjoyable.

From keeping track of the books you own to following your current reading progress and saving your favorite quotes, Reader's Nook brings your personal library into one organized space.

---

## Features

 * **Personal Library**
  Organize and browse your books in one place.

*  **Reading Progress**
  Keep track of the books you're currently reading and your progress.

*  **Collections**
  Group books into custom collections and reading lists.

*  **Saved Quotes**
  Save meaningful quotes from the books you love.

*  **Reading Goals**
  Set personal reading goals and keep yourself motivated.

*  **Reading Statistics**
  View useful statistics about your reading activity and progress.

*  **Profile & Settings**
  Manage your profile, preferences, and reading goals.

*  **Responsive Design**
  Built with a mobile-first approach while providing a polished desktop experience.

---

##  Design

Reader's Nook follows a warm, cozy visual style inspired by the feeling of sitting down with a good book and a cup of coffee.

The interface uses a **Cinnamon Latte-inspired color palette**, soft gradients, subtle shadows, glowing details, and rounded components to create a comfortable reading-focused atmosphere.

The goal is to make the application feel less like a database of books and more like a **personal digital reading space**.

---

##  Tech Stack

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **TanStack Query**
* **Zustand**
* **React Hook Form**
* **Zod**

### Backend

The application communicates with a **Django REST API** for authentication and application data.

---

##  Architecture

Reader's Nook follows a feature-oriented frontend architecture designed to keep the application modular and maintainable.

The project separates concerns such as:

* Authentication
* Books
* Collections
* Settings
* Reading progress
* UI state
* API communication

Server state is managed with **TanStack Query**, while lightweight client-side state is handled with **Zustand**.

---

##  Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/readers-nook.git
```

Navigate into the project:

```bash
cd readers-nook
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application should now be available at the local development URL provided by Vite.

---

##  Environment Variables

Create a `.env` file in the project root and add the environment variables required by the application.

Example:

```env
VITE_API_URL=your_api_url
```

##  Development

Run the development server:

```bash
npm run dev
```

Run the production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run tests:

```bash
npm run test
```

---

##  Project Structure

A simplified overview of the frontend structure:

```text
src/
├── auth/
├── components/
├── features/
│   ├── books/
│   ├── collections/
│   ├── settings/
│   └── ...
├── hooks/
├── layouts/
├── pages/
├── queries/
├── services/
├── store/
├── types/
└── main.tsx
```

The project uses feature-based organization where possible, allowing related UI, logic, state, and API functionality to remain close together.

---

##  Authentication

Reader's Nook supports authenticated user sessions through the backend API.

The frontend handles authentication state and communicates with the backend for operations such as:

* Registration
* Login
* Session restoration
* Token refresh
* Logout
* Fetching the authenticated user's profile

Authentication-related server state is coordinated through **TanStack Query** and the application's auth store.

---

##  Responsive Experience

Reader's Nook is designed **mobile-first**.

The interface adapts between:

**Mobile**

* Compact navigation
* Single-column layouts
* Touch-friendly components
* Optimized book cards

**Desktop**

* Expanded navigation
* Multi-section dashboard layouts
* More spacious content areas
* Enhanced library browsing experience

---

##  Roadmap

Some ideas for future development include:

* [ ] Advanced search and filtering
* [ ] More detailed reading analytics
* [ ] Book recommendations
* [ ] Reading streak tracking
* [ ] Expanded collection management
* [ ] Social reading features
* [ ] More personalization options
* [ ] Improved accessibility
* [ ] Progressive Web App support

---

##  Contributing

Contributions, ideas, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "feat: add my feature"
```

5. Push the branch.

```bash
git push origin feature/my-feature
```

6. Open a Pull Request.

---

## License

This project is currently intended as a personal/educational project.

---

## About the Project

Reader's Nook was created as a frontend development project focused on building a real-world application with modern React architecture, responsive UI design, state management, authentication, and API integration.

The project combines **frontend engineering and visual design** to create a practical application that feels pleasant to use rather than merely functional.

---

<p align="center">
  Made with ☕, 📚 and a slightly unreasonable amount of Figma screen time.
</p>
