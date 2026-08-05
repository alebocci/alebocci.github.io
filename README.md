# Sito accademico di Alessandro Bocci

Sito statico bilingue per GitHub Pages. I contenuti vengono letti dai file JSON e trasformati in HTML completo durante ogni pubblicazione.

## File da modificare

- `content.json`: testi italiani.
- `content.en.json`: testi inglesi.
- `publications.json`: pubblicazioni condivise dalle due lingue.

Non è necessario modificare HTML, CSS o JavaScript per aggiornare i contenuti.

## Pubblicazione automatica

Il workflow `.github/workflows/pages.yml`:

1. valida i dati italiani, inglesi e bibliografici;
2. genera il sito statico nella cartella `dist`;
3. controlla HTML, collegamenti interni, ID e metadati;
4. controlla i collegamenti esterni con un passaggio non bloccante;
5. pubblica l’artefatto su GitHub Pages.

In **Settings → Pages** la sorgente deve essere impostata su **GitHub Actions**.

## Pubblicazioni

Per mostrare o nascondere una voce usa il campo `visible` in `publications.json`:

```json
"visible": true
```

oppure:

```json
"visible": false
```

I JSON sorgente non vengono copiati nel sito pubblicato. Tuttavia il repository GitHub è pubblico: `visible: false` significa soltanto “non mostrare nel sito”, non rende riservati i dati presenti nel file. Una voce realmente privata non deve essere inserita nel repository.

L’editor grafico delle pubblicazioni resta locale e non va caricato nel repository pubblico.

## Build locale facoltativa

```bash
node scripts/validate.mjs --source
node scripts/build.mjs
node scripts/validate.mjs --dist
```
