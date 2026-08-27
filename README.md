# Brepta — trénink hlásek R a Ř

Webová appka na domácí procvičování výslovnosti R a Ř. Jeden HTML soubor, žádné závislosti,
žádný build kromě jednoho skriptu na publikování.

**Publikovaná verze:** viz odkaz v chatu (číslo verze najdeš v appce v sekci Pro rodiče)

## Soubory

| Soubor | K čemu je |
|---|---|
| `index.html` | Zdroj. Tady se upravuje všechno — obsah pater, styly i logika. |
| `build.py` | Vyrobí `brepta.html` (verze bez `<html>/<head>/<body>` pro publikování). |
| `brepta.html` | Generovaný soubor pro publikování. Neupravuj ho ručně, přepíše se. |
| `dist/brepta-vN.html` | Generovaný build k rozeslání — jeden soubor, otevře se v prohlížeči. |

## Jak to dát vyzkoušet ostatním

Tři možnosti, od nejrychlejší:

1. **Poslat soubor.** `python3 build.py` vyrobí `dist/brepta-vN.html`. Ten jeden soubor
   stačí poslat mailem nebo do Slacku — příjemce ho otevře v prohlížeči a appka běží.
   Postup se ukládá u něj v prohlížeči. Bez internetu se jen načte systémové písmo
   místo Fredoky, jinak funguje všechno.
2. **GitHub Pages** — doporučeno, viz postup níž. Skutečná adresa, aktualizuje se všem
   najednou a na telefonu se přidá na plochu jako appka s ikonou.
3. **Odkaz na Artifact.** Nejrychlejší, ale vede přes claude.ai a je potřeba ho
   nasdílet z menu Share na stránce artifactu.

## Nasazení na GitHub Pages

Appka je připravená jako PWA — po nasazení jde na telefonu přidat na plochu, má vlastní
ikonu, spouští se bez lišty prohlížeče a funguje i bez signálu.

1. Repozitář musí být **veřejný**: Settings → General → dole Danger Zone → *Change
   repository visibility*. (U privátního repozitáře vyžadují Pages placený plán.)
2. Settings → **Pages** → Source: *Deploy from a branch*, branch `main`, složka `/ (root)`.
3. Za minutu až dvě appka běží na `https://<tvoje-jmeno>.github.io/brepta/`.

Na telefonu pak: otevřít odkaz → menu sdílení → *Přidat na plochu*.

Soubory, které to obstarávají — všechny musí být v gitu, jinak Pages appku nenajde:

| Soubor | K čemu je |
|---|---|
| `manifest.webmanifest` | Název, barvy, ikony, spouštění bez lišty prohlížeče. |
| `sw.js` | Offline režim. Stránku bere vždy nejdřív ze sítě, ze zásoby až když není signál — díky tomu se nová verze projeví hned. |
| `icons/` | Ikony pro plochu (Android, iOS i maskable varianta). |

`build.py` drží název cache v `sw.js` synchronizovaný s číslem verze v `index.html`,
takže se stará zásoba po vydání nové verze sama zahodí.

## Jak to spustit lokálně

Nejjednodušší je otevřít `index.html` rovnou v prohlížeči. Kvůli ukládání postupu je ale
lepší si to pustit přes server:

```bash
python3 -m http.server 8000
```

a otevřít `http://localhost:8000`. Na `localhost` se zapne i offline režim, takže si ho
jde vyzkoušet ještě před nasazením.

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
- Hodnocení dvěma tlačítky: „Povedlo se" (hvězdička, jde dál) a „Ještě zkusíme"
  (kartička zůstane, počítají se pokusy; od třetího nabídne přeskočení)
- Krok zpátky (`←` v horní liště) vrátí předchozí kartičku i to, co se za ni připsalo,
  a z první kartičky vede zpátky na hlavní obrazovku;
  ze závěrečné obrazovky jde vrátit i celá poslední kartička
- Ukončení lekce uprostřed není trest — co dítě stihlo, se mu započítá
- Hvězdičky a série dní, postup se ukládá do prohlížeče (`localStorage`, klíč `brepta.v1`, starý `motorka.v1` se při prvním otevření přenese)
- Poslech přes hlas telefonu (jen u slov a vět, a jen když je v systému český hlas)
- Patro přepíná rodič ťuknutím na patro v seznamu (nebo roletkou v Pro rodiče), aby šlo jet podle logopeda
- Mazání postupu je dvoukrokové: potvrzení s výčtem toho, o co se přijde, a pak hláška,
  že se to opravdu stalo (nativní `confirm()` ve vložené stránce nefunguje)

## Nápady na dál

- Vlastní nahrávky místo systémového hlasu (rodič si předříká slova sám) — pozor,
  nahrávání z prohlížeče ve vložené stránce nefunguje, muselo by se řešit jinak
- Obrázky místo emoji
- Odměnová sbírka — za každé patro jedna samolepka do alba
- Export postupu pro logopeda
