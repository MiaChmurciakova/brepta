#!/usr/bin/env python3
"""Z index.html udela artifact.html — verzi bez <html>/<head>/<body>,
kterou bere publikovani Artifactu. Spoustej po kazde uprave: python3 build.py"""
import re, pathlib
src = pathlib.Path("index.html").read_text(encoding="utf-8")
def between(a, b):
    m = re.search(re.escape(a) + r"(.*?)" + re.escape(b), src, re.S)
    if not m: raise SystemExit("Chybi znacka " + a)
    return m.group(1).strip()
head = between("<!-- ARTIFACT:HEAD-START -->", "<!-- ARTIFACT:HEAD-END -->")
body = between("<!-- ARTIFACT:BODY-START -->", "<!-- ARTIFACT:BODY-END -->")
pathlib.Path("artifact.html").write_text(head + "\n\n" + body + "\n", encoding="utf-8")
print("artifact.html hotovo")
