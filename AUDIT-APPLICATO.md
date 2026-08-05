# Interventi applicati all’audit

## Robustezza

- Contenuti prerenderizzati in HTML: il sito resta leggibile senza JavaScript.
- Build automatica dai file JSON tramite GitHub Actions.
- `404.html` usa percorsi assoluti e uno script dedicato, senza `app.js`.
- Rimossi i `fetch()` a runtime e `cache: "no-store"`.
- Aggiunta una versione degli asset nelle URL per facilitare l’aggiornamento della cache.

## Accessibilità

- Focus visibile per link, pulsanti, ricerca e filtri.
- `aria-pressed` aggiornato per filtri e tema.
- Conteggio delle pubblicazioni con `aria-live="polite"`.
- Stato e testo del menu mobile aggiornati dinamicamente.
- Chiusura del menu con `Esc` e restituzione del focus al pulsante.
- Stato attivo di Didattica anche nella sottopagina Tesi.
- Contenuti visibili anche se JavaScript non viene eseguito.

## Lingue e contenuti

- Versioni statiche separate: italiano alla radice e inglese in `/en/`.
- Etichette Rivista/Conferenza coerenti con la lingua.
- “Terza missione” usato nella versione italiana.
- “Profilo GitHub” sostituisce “Tutti i repository”.
- Link e-learning indicati come accesso riservato.
- Bibliografia resa più uniforme e rimossa la formula “including Alessandro Bocci”.
- Numero delle tesi calcolato automaticamente dai dati.
- Eliminata la duplicazione dei titoli dei gruppi nella pagina Tesi.

## SEO e condivisione

- URL canonical e `hreflang` italiano/inglese.
- Open Graph e Twitter Card.
- Dati strutturati JSON-LD `ProfilePage` e `Person` nella home.
- `sitemap.xml` e `robots.txt`.

## Scelta grafica mantenuta

Il logo resta discreto e presente soltanto nella home, come richiesto in precedenza, anche se l’audit suggeriva di uniformarlo nelle pagine interne.
