# EPTIVO AI

`EPTIVO AI` is a **front-end-only** content idea generator for Instagram content planning.

It helps users pick a **niche + goal + effort**, generates ranked content ideas, and learns preferences from
likes/dislikes. It also includes a Live chat experience, a simple profile (name/username/photo), and a saved
ideas list.

**Where data lives:** There is no server database. All accounts, preferences, saved ideas, feedback, and profile data are stored in the browser using **`localStorage`**. Data stays on that device and browser unless you add your own backend later.

## What this MVP includes

- **Accounts**: register/login with roles `Creator`, `Social Media Manager`, `Small Business Owner` (saved in **`localStorage`**).
- **Idea generator**: choose `Niche` + `Goal` + `Effort` and generate ranked suggestions.
- **Custom topic**: optionally type a specific topic and request how many ideas to generate.
- **Preference learning**: Like/Dislike updates your preference weights and shows charts in “Preference learning”.
- **Saved ideas**: Save ideas to a local list.
- **Live chat**: a “ChatGPT-like” typing effect; replies format ideas into structured blocks.
- **Profile**: avatar (photo/initials), name, and username.
- **Feedback**: text feedback is stored in **`localStorage`** (no backend or email by default).

## How to run

### Local run (recommended)
Serve the folder with any static web server, for example:


Then open `http://localhost:8000`.

Main files: `index.html`, `styles.css`, and `script.js`. Optional helpers (`niches.html`, `feedback.html`, `preferences.html`, `eptivo.html`) redirect into `index.html` with the right hash.

Navigation uses URL fragments (for example `#niches-page`), so you can bookmark or link straight to a section.

## Data storage (`localStorage`)

This app has **no backend**. Persistence uses the browser’s **`localStorage`** API:

| Key | What it holds |
| --- | --- |
| `eptivo_users` | All registered users and their data (likes, dislikes, saved ideas, feedback, profile, preferences) |
| `eptivo_session` | Which user is currently logged in (username) |

Clearing site data or using another browser/device starts with an empty store. To sync or collect feedback centrally, add an external service or your own server.
