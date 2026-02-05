
![Overview of the app arcitecture](image.png)

![hooksuseHotelSearch ts](https://github.com/user-attachments/assets/d2dd6f11-555e-4dfb-b934-d5fb294acf10)



# Github repo: https://github.com/IsabelleLof/hotel-booking-app 

# Delivery 2 – Documentation and Technical Reflection

**Project:** StayEase (Hotel Finder / Booking App)
**Tech:** Next.js (App Router) + React + TypeScript + Tailwind + Amadeus API (or Mock)
**Course:** Framework & Component-based Development (Frontend)

---

## 1. Project Description and User Needs

### Summary

StayEase is a hotel booking-style application where users can search for hotels by city and dates, view results as hotel cards, navigate to a hotel details page, and manage bookings (simulated). The project demonstrates component-based development, routing, state handling, API integration, and basic testing.

### Target Audience

Users who want to quickly explore hotels in a specific city and compare options before deciding to proceed with a booking on a real provider’s website (or within a booking flow).

### Intended Use Cases

* Search for hotels by city and optionally check-in/check-out dates and number of guests.
* View search results with loading state (skeleton) and error handling.
* Click a hotel card to open a details page with more information and amenities.
* Create a simulated booking and review it in the profile section (if signed in).
* Sign in using Google or a demo user.

---

## StayEase – Hotel Booking Application (Project Overview)

StayEase is built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It features hotel search, a hotel details view, booking management (simulated), and authentication.

### Key Features

* **Search:** Find hotels by location, check-in/check-out dates, and guests.
* **Details:** View hotel description, amenities, and basic location info.
* **Booking (simulated):** Create bookings and view them in the profile section.
* **Authentication:** Sign in with Google or use a demo user for testing.
* **Responsive UI:** Mobile-first layout with a modern, clean design.

### Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** Zustand
* **Authentication:** NextAuth.js
* **Testing:** Jest & React Testing Library
* **Icons:** React Icons
* **Animations:** Framer Motion

### Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

* `http://localhost:3000`

### API & Data

The application can run with a **Mock API** (`src/lib/api.ts`) to simulate external data fetching. This allows the app to work end-to-end without requiring API keys.

To switch to a real provider (e.g., **Amadeus**), you would:

1. Obtain an API key from the provider.
2. Update the app to call real endpoints (preferably via Next.js API routes).
3. Add environment variables in `.env.local`.

> Note: API routes are preferred when using real credentials to avoid exposing API keys and to reduce CORS-related issues.

### Authentication

For Google login, add credentials to `.env.local`:

```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_SECRET=your-secret-key
```

For demo/testing, the app supports a **“Sign in as Demo User”** option.

### Testing

Run tests with:

```bash
npm test
```

---

## 2. Architecture and Routing

### Pages and Navigation Structure

(Adjust the names if your final routes differ)

* `/` – Home (entry point / introduction / search shortcut)
* `/search` – Search results page (hotel list)
* `/hotels/[id]` – Hotel details page (dynamic route)
* `/login` – Authentication page
* `/profile` – Profile & bookings overview (authenticated users)

### Why This Structure

I chose **Next.js App Router** because it provides a clear folder-based routing structure and makes dynamic routing straightforward (e.g., `/hotels/[id]`). It also supports API routes within the same project, which fits well for external API integration and keeping secrets server-side.

---

## 3. Component Structure

### Core Components

(Example list—adapt to your repo)

* `Navbar` – Main navigation and active link state
* `SearchForm` – Search input (city, dates, guests)
* `SearchResults` – Result list rendering + empty/error/loading states
* `HotelCard` – Reusable card component used to display hotel information
* `BookingSection` – Booking UI (simulated) on the hotel details page
* `StarRating` / UI components – Small reusable UI parts

### Example Reusable Component: `HotelCard`

`HotelCard` is reusable and used wherever hotels are displayed (search list and potentially profile/favorites). It receives a typed `Hotel` object via props and is responsible only for rendering and navigation interaction, not for data fetching. This separation makes the component reusable and easier to test.

---

## 4. State Management and Hooks

### Local State (What and Why)

Local state is used for UI-specific concerns that don’t need to be shared globally, such as:

* Form inputs
* UI toggles (open/close menu)
* Component-level loading states (if not handled centrally)

### Global State (What and Why)

Global state (e.g., Zustand) is suited for data shared across multiple parts of the app, such as:

* Bookings / saved items
* User session-related UI behavior
* Shared search filters or “last search” (if used across pages)

### Custom Hook (Requirement)

A custom hook (e.g., `useHotelSearch`) was created to encapsulate:

* Fetching data from the API route
* Handling loading state (including skeleton UI)
* Handling errors
* Returning the final hotel results

**Why a hook?**
Hooks help separate logic from UI. This reduces duplication (same fetching logic in multiple components), improves readability, and makes it easier to test or refactor later.

---

## 5. Code Structure and Project Organization

### Folder Structure (Example)

* `src/app/` – Pages/routes using Next.js App Router
* `src/app/api/` – API routes (server-side integration)
* `src/components/` – Reusable UI and feature components
* `src/hooks/` – Custom hooks (e.g., `useHotelSearch`)
* `src/lib/` – API helpers, utilities, transformations
* `src/types/` – TypeScript types/interfaces (`Hotel`, etc.)

### Why This Organization

The goal was to keep responsibilities clear:

* UI components focus on rendering and interactions
* Hooks and lib functions encapsulate data-fetching logic and transformations
* API routes isolate external API integrations and keep secrets secure

---

## 6. Testing

### What I Tested and Why

* **Component tests** for reusable UI components (e.g., Button renders correctly, handles click events, and applies the correct variant styling).

These tests verify core UI behavior such as accessibility (rendering with correct role and label), interaction (click handling), and visual consistency (Tailwind variant classes).

These tests provide quick feedback during development and help prevent regressions when refactoring shared UI components that are used across multiple pages.

### What I Would Test Next

* Tests for the custom hook (`useHotelSearch`) with mocked `fetch` calls
* Integration test of the full flow: search → results → click card → details page
* API route tests with mocked Amadeus responses to validate transformations and error handling

---

## 7. Technical Choices, Trade-offs, and Reflection

### Why Next.js + React + TypeScript

* React supports component-based architecture and reusable UI patterns.
* Next.js App Router provides built-in routing and server capabilities (API routes).
* TypeScript adds type safety and helps keep a consistent `Hotel` model from API to UI.

### API Choice and Limitations

The project integrates with a hotel search API (Amadeus). A trade-off is that external APIs often have limitations (e.g., incomplete data such as missing images/ratings or inconsistent fields). To handle this, I implemented fallbacks (default images, simplified rating, safe optional chaining).

### Server vs Client Trade-off

I used **Next.js API routes** as a server layer between the client and the external API:

* **Pros:** protects API keys, reduces CORS issues, allows consistent response transformation
* **Cons:** adds an extra layer of code and complexity

### Short-term vs Long-term Impact

* Short-term: slower to implement because the data flow must be correct (URL → hook → API route → transformation → UI).
* Long-term: easier to maintain, test, and extend (switch provider, add caching, improve booking).

### What I Would Improve in a New Iteration

* Improve images by combining providers or maintaining a mapping dataset
* Stronger error handling and UX for edge cases
* Add caching strategies for repeated searches
* Further simplify and standardize data transformation logic

Write more of:
* Scalability? Be more clearer on WHY (underhållbarhet?) trade-offs?

---

## Note on AI Tools

I used AI tools primarily as support for debugging and exploring solution alternatives—especially for issues related to Next.js dynamic routing (`/hotels/[id]`), server/client boundaries, and API integration with Amadeus (choosing the correct SDK method and aligning request/response formats).

To ensure I understood and controlled the code, I always validated suggestions by reading terminal errors, testing the full user flows locally (search → click → details page), inspecting API responses, and refactoring the final implementation into a structure I can explain and defend during code review.

---

# Appendix (Optional) – How to Run Locally (Quick)

```bash
npm install
npm run dev
```

Open:

* `http://localhost:3000`

Tests:

```bash
npm test
```



Leverans 2 – Dokumentation och teknisk reflektion

Projekt: StayEase (Hotell­sökning / Bokningsapp)
Teknik: Next.js (App Router) + React + TypeScript + Tailwind CSS + Amadeus API (eller Mock)
Kurs: Ramverk och komponentbaserad utveckling (Frontend)

1. Projektbeskrivning och användarbehov
Sammanfattning

StayEase är en hotellbokningsliknande applikation där användare kan söka hotell baserat på stad och datum, visa resultat som hotellkort, navigera till en detaljsida för varje hotell och hantera bokningar (simulerade). Projektet demonstrerar komponentbaserad utveckling, routing, state-hantering, API-integration samt grundläggande testning.

Målgrupp

Användare som snabbt vill utforska hotell i en specifik stad och jämföra alternativ innan de går vidare till en riktig bokningsleverantörs webbplats (eller ett framtida bokningsflöde).

Tänkta användarfall

Söka hotell baserat på stad samt valfritt in- och utcheckningsdatum och antal gäster

Visa sökresultat med laddningsstatus (skeleton) och felhantering

Klicka på ett hotellkort för att visa en detaljsida med mer information och bekvämligheter

Skapa en simulerad bokning och visa den i profilsidan (om användaren är inloggad)

Logga in med Google eller en demo-användare

StayEase – Hotellbokningsapplikation (Projektöversikt)

StayEase är byggd med Next.js (App Router), TypeScript och Tailwind CSS. Applikationen innehåller hotellsök, hotelldetaljer, bokningshantering (simulerad) och autentisering.

Huvudfunktioner

Sök: Hitta hotell baserat på plats, in-/utcheckningsdatum och antal gäster

Detaljer: Visa hotellbeskrivning, bekvämligheter och grundläggande platsinformation

Bokning (simulerad): Skapa bokningar och visa dem i profilsidan

Autentisering: Logga in med Google eller använd en demo-användare

Responsivt gränssnitt: Mobilförst-design med ett modernt och rent utseende

Teknikstack

Ramverk: Next.js 14 (App Router)

Språk: TypeScript

Styling: Tailwind CSS

State-hantering: Zustand

Autentisering: NextAuth.js

Testning: Jest & React Testing Library

Ikoner: React Icons

Animationer: Framer Motion

Kom igång

Installera beroenden:

npm install


Starta utvecklingsservern:

npm run dev


Öppna:

http://localhost:3000

API och data

Applikationen kan köras med ett Mock API (src/lib/api.ts) för att simulera extern datahämtning. Detta gör att appen fungerar end-to-end utan att kräva API-nycklar.

För att byta till en riktig leverantör (t.ex. Amadeus) krävs att du:

Skapar en API-nyckel hos leverantören

Uppdaterar applikationen till att anropa riktiga endpoints (helst via Next.js API-routes)

Lägger till miljövariabler i .env.local

Notering: API-routes rekommenderas vid användning av riktiga API-nycklar för att undvika att exponera hemligheter i klienten och för att minska CORS-problem.

Autentisering

För Google-inloggning krävs följande variabler i .env.local:

GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_SECRET=your-secret-key


För demo- och testsyfte finns även alternativet “Sign in as Demo User”.

Testning

Kör tester med:

npm test

2. Arkitektur och routing
Sidor och navigationsstruktur

(Justera vid behov om slutliga routes skiljer sig)

/ – Startsida (introduktion / genväg till sök)

/search – Sökresultatsida (hotellista)

/hotels/[id] – Hotelldetaljsida (dynamisk route)

/login – Inloggningssida

/profile – Profil- och bokningsöversikt (kräver inloggning)

Motivering av struktur

Next.js App Router valdes eftersom den erbjuder tydlig filbaserad routing och gör dynamiska routes enkla att implementera (t.ex. /hotels/[id]). Den möjliggör även API-routes i samma projekt, vilket passar bra för extern API-integration och för att hålla API-nycklar säkra på serversidan.

3. Komponentstruktur
Centrala komponenter (exempel)

Navbar – Huvudnavigering och aktiv länk

SearchForm – Sökinmatning (stad, datum, gäster)

SearchResults – Renderar resultatlista + tomt/laddning/fel-läge

HotelCard – Återanvändbart kort för hotellinformation

BookingSection – Bokningsgränssnitt (simulerat) på detaljsidan

StarRating / UI-komponenter – Små återanvändbara UI-delar

Exempel på återanvändbar komponent: HotelCard

HotelCard används där hotell visas (sökresultat och potentiellt i profil/favoriter). Komponenten tar emot ett typat Hotel-objekt via props och ansvarar endast för rendering och navigation, inte datahämtning. Detta gör komponenten återanvändbar, testbar och lättare att underhålla.

4. State-hantering och hooks
Lokalt state – vad och varför

Lokalt state används för UI-specifika delar som inte behöver delas globalt, till exempel:

Formulärinmatningar

UI-toggles (öppna/stäng meny)

Komponentlokala laddningsstatusar

Globalt state – vad och varför

Globalt state (t.ex. med Zustand) används för data som delas mellan flera delar av applikationen, såsom:

Bokningar eller sparade objekt

UI-beteenden kopplade till användarsession

Delade sökfilter eller senaste sökning

Custom hook (krav)

En custom hook (t.ex. useHotelSearch) skapades för att kapsla in:

Datahämtning från API-routes

Hantering av laddningsstatus (inkl. skeleton UI)

Felhantering

Returnering av slutligt hotellresultat

Varför en hook?
Hooks separerar logik från UI, minskar duplicerad kod och gör lösningen mer läsbar, testbar och lättare att vidareutveckla.

5. Kodstruktur och projektorganisation
Mappstruktur (exempel)

src/app/ – Sidor och routing (App Router)

src/app/api/ – API-routes (server-side integration)

src/components/ – Återanvändbara UI- och feature-komponenter

src/hooks/ – Custom hooks

src/lib/ – API-hjälpfunktioner, utilities, transformationer

src/types/ – TypeScript-typer och interfaces

Motivering

Strukturen syftar till tydlig ansvarsfördelning:

UI-komponenter fokuserar på rendering

Hooks och lib-funktioner hanterar logik och data

API-routes isolerar extern API-integration och skyddar hemligheter

6. Testning
Vad jag testade och varför

Komponenttester för återanvändbara UI-komponenter (t.ex. Button som renderas korrekt, hanterar klick och applicerar rätt variant-styling).
Dessa tester verifierar grundläggande UI-beteende såsom tillgänglighet (korrekt roll och etikett), interaktion (klickhantering) och visuell konsekvens (Tailwind-klasser).

Testerna ger snabb feedback under utveckling och skyddar mot regressioner vid refaktorering av delade komponenter.

Vad jag skulle testa i nästa steg

Tester för custom hook (useHotelSearch) med mockad fetch

Integrationstest av hela flödet: sök → resultat → klick → detaljsida

Tester av API-routes med mockade Amadeus-svar

7. Teknikval, trade-offs och reflektion
Varför Next.js + React + TypeScript

React stödjer komponentbaserad arkitektur och återanvändbara UI-mönster

Next.js App Router ger routing och serverfunktionalitet direkt

TypeScript ger typsäkerhet och ett konsekvent Hotel-modellflöde från API till UI

API-val och begränsningar

Projektet integrerar ett hotellsöknings-API (Amadeus). En kompromiss är att externa API:er ofta har begränsningar (t.ex. saknade bilder/betyg eller inkonsekventa fält). Detta hanteras med fallbacks (standardbilder, förenklade betyg och säker optional chaining).

Server vs klient – trade-off

API-routes används som ett serverlager mellan klienten och externa API:er.

Fördelar: skyddar API-nycklar, minskar CORS-problem, möjliggör konsekvent datatransformation
Nackdelar: extra lager och ökad komplexitet

Kort- och långsiktig påverkan

Kort sikt: längre implementationstid eftersom hela dataflödet måste fungera korrekt

Lång sikt: bättre underhållbarhet, testbarhet och skalbarhet

Förbättringar i nästa iteration

Förbättrad bildhantering (flera datakällor eller egen mapping)

Starkare felhantering och UX för edge cases

Cachingstrategier för upprepade sökningar

Mer enhetlig datatransformation

Notering om AI-verktyg

Jag använde AI-verktyg främst som stöd vid felsökning och för att utforska alternativa lösningar, särskilt kring Next.js dynamisk routing (/hotels/[id]), server/klient-gränser samt API-integration med Amadeus (val av korrekt SDK-metod och anpassning av request/response-format).

För att säkerställa att jag förstod och kontrollerade koden verifierade jag alltid förslag genom att läsa felmeddelanden i terminalen, testa hela användarflöden lokalt (sök → klick → detaljsida), inspektera API-responser och refaktorera den slutliga lösningen till en struktur som jag kan förklara och försvara vid kodgranskning.

Appendix (valfritt) – Köra projektet lokalt
npm install
npm run dev


Öppna:

http://localhost:3000


Tester:

npm test


