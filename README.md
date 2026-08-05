# Sito accademico di Alessandro Bocci

Sito statico bilingue per GitHub Pages. I contenuti vengono letti dai file JSON e trasformati in HTML completo durante ogni pubblicazione.

## File da modificare

- `content.json`: testi italiani.
- `content.en.json`: testi inglesi.
- `publications.json`: pubblicazioni condivise dalle due lingue.

Non è necessario modificare HTML, CSS o JavaScript per aggiornare i contenuti.

## Pubblicazione automatica

Il workflow `.github/workflows/pages.yml` esegue `scripts/build.mjs`, crea la cartella `dist` e la pubblica su GitHub Pages.

Dopo avere caricato questa versione, apri **Settings → Pages** e imposta **Source → GitHub Actions**. Da quel momento ogni commit sul ramo `main` rigenera e pubblica il sito.

## Pubblicazioni

Per mostrare o nascondere una voce usa il campo `visible` in `publications.json`:

```json
"visible": true
```

oppure:

```json
"visible": false
```

L’editor grafico delle pubblicazioni resta locale e non va caricato nel repository pubblico.
