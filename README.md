# Brepta — trénink hlásek R a Ř

Webová appka na domácí procvičování výslovnosti R a Ř. Jeden HTML soubor, žádné závislosti,
žádný build kromě jednoho skriptu na publikování.

**Publikovaná verze:** https://claude.ai/code/artifact/8b80c6be-9832-4942-bf99-9261bef6fdd3

## Soubory

| Soubor | K čemu je |
|---|---|
| `index.html` | Zdroj. Tady se upravuje všechno — obsah pater, styly i logika. |
| `build.py` | Vyrobí `artifact.html` (verze bez `<html>/<head>/<body>` pro publikování). |
| `artifact.html` | Generovaný soubor. Neupravuj ho ručně, přepíše se. |

## Jak to spustit lokálně

Nejjednodušší je otevřít `index.html` rovnou v prohlížeči. Kvůli ukládání postupu je ale
lepší si to pustit přes server:

```bash
python3 -m http.server 8000
# a otevřít http://localhost:8000
```

Ve VS Code funguje i rozšíření **Live Server** (pravý klik na `index.html` → Open with Live Server).

## Jak přidat slovo nebo cvik

Všechen obsah je v `index.html` v poli `LEVELS`, jedno patro = jeden objekt.

```js
{ t:"drak", e:"🐉" }              // slovo: t = text, e = emoji
{ t:"Drak drží drát.", e:"🐉" }   // věta (patro to pozná podle délky)
{ t:"Koník klape", e:"🐴", how:"Mlaskej jazykem o patro.", reps:"10×" }  // cvik
```

Písmena `r` a `ř` se ve slovech zvýrazní automaticky, nemusíš nic označovat.

## Struktura pater

Pořadí není náhodné, kopíruje běžný logopedický postup:

1. **Rozcvička jazyka** — oromotorika, jede v každé lekci
2. **Klepání za zuby** — D, T, N, L: jazyk hledá místo, kde bude R vibrovat
3. **Nastartuj motorku** — vyvození R ze skupin `dr` / `tr`
4. **Slabiky** — `dra`, `tra`, pak `ar`, a nakonec samotné `ra`
5. **Slova se skupinou** — drak, tráva, bratr
6. **R uprostřed slova** — koruna, mrkev
7. **R na konci slova** — bratr, kufr
8. **R na začátku slova** — ruka, ryba (nejtěžší pozice, schválně až tady)
9. **Věty a jazykolamy**
10. **Hláska Ř** — staví se až na hotovém R, vyvozuje se z `tř` / `dř`

## Co appka umí

- Denní lekce ~5 minut: tři cviky na rozehřátí + šest kartiček z aktuálního patra
- Kartičky se v patře rotují, takže se pořád dokola neopakuje stejná šestice
- Hodnocení „Povedlo se / Skoro / Ještě zkusíme" — co nešlo, vrátí se na konec lekce
- Krok zpátky (`←` v horní liště) vrátí předchozí kartičku i to, co se za ni připsalo;
  ze závěrečné obrazovky jde vrátit i celá poslední kartička
- Ukončení lekce uprostřed není trest — co dítě stihlo, se mu započítá
- Hvězdičky a série dní, postup se ukládá do prohlížeče (`localStorage`, klíč `brepta.v1`, starý `motorka.v1` se při prvním otevření přenese)
- Poslech přes hlas telefonu (jen u slov a vět, a jen když je v systému český hlas)
- Nahrávání dítěte a přehrání pro porovnání (pokud prohlížeč pustí mikrofon)
- Patro přepíná rodič, aby šlo jet podle logopeda

## Nápady na dál

- Vlastní nahrávky místo systémového hlasu (rodič si předříká slova sám)
- Obrázky místo emoji
- Odměnová sbírka — za každé patro jedna samolepka do alba
- Export postupu pro logopeda
