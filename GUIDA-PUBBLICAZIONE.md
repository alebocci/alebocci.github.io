# Pubblicare questa versione su GitHub Pages

## Caricare l’aggiornamento

1. Estrai lo ZIP.
2. Nel repository `alebocci/alebocci.github.io`, carica tutti i file e le cartelle, inclusa la cartella nascosta `.github`.
3. Conferma con **Commit changes** sul ramo `main`.
4. Apri **Settings → Pages**.
5. Alla voce **Source**, seleziona **GitHub Actions**.
6. Apri **Actions → Build and deploy GitHub Pages** e attendi il segno verde.

Il workflow valida i dati, genera HTML statico completo e pubblica soltanto la cartella `dist`.

## Aggiornare le pubblicazioni

1. Modifica `publications.json` oppure genera il file con l’editor locale.
2. Carica il nuovo file nella radice del repository.
3. Conferma il commit.

`visible: true` mostra una pubblicazione; `visible: false` la esclude dalle pagine generate. Il JSON sorgente non viene pubblicato su GitHub Pages, ma resta leggibile nel repository pubblico. Non inserire nel file informazioni che devono restare private.

## Aggiornare gli altri contenuti

- `content.json`: versione italiana.
- `content.en.json`: versione inglese.

Dopo ogni commit, la pubblicazione riparte automaticamente. Se i dati contengono campi mancanti, ID duplicati, URL non validi o strutture italiane e inglesi non corrispondenti, la Action si ferma prima del deploy e mostra l’errore.
