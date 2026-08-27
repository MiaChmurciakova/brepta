#!/usr/bin/env python3
"""Build appky Brepta. Spoustej po kazde uprave index.html:  python3 build.py

Vyrobi dve veci:
  brepta.html            verze bez <html>/<head>/<body> pro publikovani jako Artifact
  dist/brepta-vN.html    samostatny soubor k rozeslani — staci otevrit v prohlizeci
"""
import re, pathlib, shutil

src = pathlib.Path("index.html").read_text(encoding="utf-8")

def between(a, b):
    m = re.search(re.escape(a) + r"(.*?)" + re.escape(b), src, re.S)
    if not m:
        raise SystemExit("Chybi znacka " + a)
    return m.group(1).strip()

head = between("<!-- ARTIFACT:HEAD-START -->", "<!-- ARTIFACT:HEAD-END -->")
body = between("<!-- ARTIFACT:BODY-START -->", "<!-- ARTIFACT:BODY-END -->")
pathlib.Path("brepta.html").write_text(head + "\n\n" + body + "\n", encoding="utf-8")
print("brepta.html hotovo")

m = re.search(r'VERZE\s*=\s*"(\d+)', src)
verze = m.group(1) if m else "x"
dist = pathlib.Path("dist")
dist.mkdir(exist_ok=True)
sw = pathlib.Path("sw.js")
if sw.exists():
    puvodni = sw.read_text(encoding="utf-8")
    novy = re.sub(r'const CACHE = "brepta-v\d+";', f'const CACHE = "brepta-v{verze}";', puvodni)
    if novy != puvodni:
        sw.write_text(novy, encoding="utf-8")
        print(f"sw.js prepsan na brepta-v{verze}")

cil = dist / f"brepta-v{verze}.html"
for stary in dist.glob("brepta-v*.html"):
    if stary != cil:
        try:
            stary.unlink()
        except OSError:
            print(f"  (starsi build {stary.name} nejde smazat, nevadi)")
shutil.copy("index.html", cil)
print(f"{cil} hotovo — tenhle soubor staci poslat, funguje sam o sobe")
