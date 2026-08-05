# Pubblicare questa versione su GitHub Pages

## Prima pubblicazione dell’aggiornamento

1. Estrai lo ZIP.
2. Nel repository `alebocci/alebocci.github.io`, carica tutti i file e le cartelle, inclusa la cartella nascosta `.github`.
3. Conferma con **Commit changes** sul ramo `main`.
4. Apri **Settings → Pages**.
5. Alla voce **Source**, seleziona **GitHub Actions**.
6. Apri **Actions → Build and deploy GitHub Pages** e attendi il segno verde.

Il passaggio a GitHub Actions è necessario perché il sito genera HTML statico completo dai JSON durante il deploy.

## Aggiornare le pubblicazioni

1. Modifica `publications.json` oppure genera il file con l’editor locale.
2. Carica il nuovo `publications.json` nella radice del repository.
3. Conferma il commit.

Il workflow rigenera automaticamente le pagine italiana e inglese. `visible: true` mostra la pubblicazione; `visible: false` la conserva ma la nasconde.

## Aggiornare gli altri contenuti

- `content.json`: versione italiana.
- `content.en.json`: versione inglese.

Dopo ogni commit, la pubblicazione riparte automaticamente.
