# Where It's @

Where It's @ är en React-applikation där användaren kan bläddra bland events, läsa detaljer, lägga biljetter i kundvagn och genomföra ett köp. Efter köp visas biljetter med sektion, sittplats och unikt ticket-ID.

## Screenshots

### Home

![Where It's @ home page](src\assets\docs\screenshots\home.png)

### Events

![Event list](src\assets\docs\screenshots\events.png)

### Cart

![Cart](src\assets\docs\screenshots\cart.png)

### Tickets

![Purchased tickets](src\assets\docs\screenshots\tickets.png)

## Funktioner

- Lista events från API
- Sök efter events
- Visa detaljerad eventsida
- Lägg till biljetter i kundvagn
- Öka och minska antal biljetter
- Genomför köp
- Visa köpta biljetter
- Generera ticket-ID, sektion och sittplatser
- Animationer och konfetti vid köp

## Installation

```bash
npm install
npm run dev
```

---

### React Router

Används för routing mellan sidor som Home, Events, EventDetails, Cart och Tickets.

### Zustand

Ett sätt att kunna hantera global state i applikationen, i det här fallet så är det kundvagnen främst som drar nytta av det. Men använde det även vid köpta biljetter och konfettistatus. State uppdateras via funktioner som t.ex addToCart, checkout och increaseQuantity, sen sparas det i localStorage och till hjälp har jag persist middleware.

### Motion

Vill göra lite snygga animationer och testa hur den här fungerar. Det blev att använda animationer på drawern och biljetter. I min applikation blev det en motion.div och en motion.button. Dels för att kunna animera drawern så den snyggt glider in och ut från sidan av skärmen. Det stora jobbet med motion blev helt klart mina köpta biljetter. Jag stackade dem som en hög papper med hjälp av transform och scale. Där man kan klicka fram varje biljett om man vill. Nog det svåraste jag nånsin gjort och det som tog allra längst tid. Men så värt det i slutändan.

### Swiper

Blev ett onboarding-flöde mellan startsidan och eventlistan. Jag använde **swiper och swiperSlide** för att skapa en swipe-baserad navigation istället för en tråkig knapp eller en splashpage som jag redan gjort så många gånger förut.

### React-confetti

Vem vill inte ha lite konfetti när man ska på event och ha roligt, en liten förfest innan förfesten börjar ens. Jag triggade den via en global state ( showConfetti ) i Zustand.

### Lucide-react

Ett ikonbibliotek där jag använde simpla ikoner för min header och footernavigation.

### Axios

för enklare API-anrop

### React-router-dom

För att ha en enkel routing mellan sidor

## Tillgänglighet

Projektet använder:

- aria-labels på ikonknappar
- semantiska element som main, section och nav
- focus-visible styles
- tydliga kontraster
- responsiv layout för mobilstorlek

## Responsivitet

Projektet är byggt mobile-first och testat runt 375px-500px. Också testat med Wave evaluation tool plus color-blindness.
