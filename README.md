# Where It's @

Where It's @ är en React-applikation där användaren kan bläddra bland events, läsa detaljer, lägga biljetter i kundvagn och genomföra ett köp. Efter köp visas biljetter med sektion, sittplats och unikt ticket-ID.

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

### React Router
Används för routing mellan sidor som Home, Events, EventDetails, Cart och Tickets.

### Zustand
Ett sätt att kunna hantera global state managment, i det här fallet så är det kundvagnen främst som drar nytta av det. Men använde det även vid köpta biljetter och konfettistatus.

### Motion
Vill göra lite snygga animationer och testa hur den här fungerar. Det blev att använda animationer på drawern och biljetter.

### Swiper
Blev ett onboarding-flöde mellan startsidan och eventlistan.

### React Hot Toast
Är bra för att få upp lite pop-up meddelanden som man kanske kan lägga felmeddelanden i. Inte gjort något än dock.

### React-confetti
Vem vill inte ha lite konfetti när man ska på event och ha roligt, en liten förfest innan förfesten börjar ens XD

### Lucide-react
Nånstans där jag kan hämt hem simpla ikoner för min header och footernavigation.

### Axios
för enklare API-anrop

### React-router-dom
För att ha en enkel routing mellan sidor
```

## Tillgänglighet

Projektet använder:

- aria-labels på ikonknappar
- semantiska element som main, sevtion och nav
- focus-visible styles
- tydliga kontraster
- responsiv layout för mobilstorlek

## Responsivitet

Projektet är byggt mobile-first och testat runt 375px-500px. Också testat med Wave evaluation tool plus color-blindness.
