@echo off
title VorOrt Webdesign aktualisieren
cd /d "%~dp0"
echo ==========================================
echo VorOrt Webdesign wird aktualisiert
echo ==========================================
echo.
echo Projektordner:
echo %CD%
echo.
echo Bitte dieses Fenster offen lassen.
echo.

git config --global --add safe.directory "%CD%" >nul 2>&1

echo 1/3 Lokale Aenderungen vorbereiten...
git add index.html public/mobile-fix.css public/projects/reverie-motion-experience.png src/components/ui/particle-text-effect.tsx src/AgencyApp.tsx src/agency.css
git commit -m "Add Reverie motion portfolio card" >nul 2>&1

echo 2/3 Zu GitHub hochladen...
git push origin main

echo.
echo 3/3 Fertig.
echo Wenn oben kein Fehler steht, baut Vercel jetzt automatisch neu.
echo Link:
echo https://vorort-webdesign.vercel.app/?v=reverie-motion
echo.
pause
