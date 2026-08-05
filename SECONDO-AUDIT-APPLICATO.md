# Secondo audit applicato

Interventi eseguiti sulla versione generata tramite GitHub Actions.

## Dati e ricerca

- La ricerca normalizza accenti e segni diacritici sia nell’indice generato sia nel testo digitato.
- Ricerche come `garcia`, `cortes` e `universita` trovano anche `García`, `Cortés` e `università`.
- I file `content.json`, `content.en.json` e `publications.json` non vengono più copiati nell’artefatto pubblicato.
- La documentazione chiarisce che `visible: false` non rende privata una voce presente in un repository pubblico.

## Accessibilità

- Nella pagina Tesi, Didattica usa `aria-current="location"` anziché `page`.
- È stata rimossa l’etichetta ARIA ridondante dal contenitore della fotografia.
- I controlli di tema, lingua, menu e filtri mantengono gli stati accessibili già introdotti con il primo audit.

## Tema e anteprime social

- In assenza di una scelta salvata, il sito segue `prefers-color-scheme`.
- Il colore della barra del browser viene aggiornato insieme al tema.
- Le variazioni del tema di sistema vengono seguite finché l’utente non salva una preferenza.
- Sono state create due immagini Open Graph orizzontali da 1200 × 630 pixel, una per lingua.
- I metadati dichiarano dimensioni, formato e testo alternativo dell’immagine social.

## Build e manutenzione

- La versione degli asset deriva automaticamente da `GITHUB_SHA`.
- Una nuova validazione automatica controlla dati obbligatori, tipi, ID duplicati, URL, DOI, valori di `kind`, corrispondenza tra italiano e inglese e numero delle tesi.
- Dopo il build vengono controllati file attesi, JSON non pubblicati, ID HTML duplicati, metadati, immagini senza `alt`, collegamenti e ancore interne.
- I collegamenti esterni vengono controllati in un passaggio separato e non bloccante, per evitare che indisponibilità temporanee impediscano la pubblicazione.

## Scelta grafica mantenuta

Il logo resta discreto e presente soltanto nella home, come richiesto nelle revisioni precedenti. La differenza rispetto alle pagine interne è quindi intenzionale.
