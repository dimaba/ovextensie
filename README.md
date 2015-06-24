# OmniBus Reisplanner
Met de OmniBus Reisplanner plan je je reis rechtstreeks vanuit de adresbalk van je browser. Plan je reis van deur tot deur, van station tot station, op elk moment van de dag.

## Gebruiksaanwijzing
De reisplanner is in twee stappen te gebruiken. 
1. Type in de adresbalk van de Chrome-browser '9292', gevolgd door een spatie of TAB. Dit activeert de reisplanner-extensie. 
2. Je kunt nu je reisplan intypen in de adresbalk. Druk daarna op 'enter'. Je wordt nu doorgestuurd naar de website van 9292ov waar je reisadvies voor je klaarstaat.

### Steekwoorden
#### Let op! Vanaf versie 0.50 moeten alle steekwoorden gevolgd worden door een dubbele punt (bijv. 'van:') om herkend te worden
De reisplanner herkent vijf steekwoorden: 

1. Van: geeft de vertreklocatie aan (verplicht)
2. Naar: geeft de bestemming aan (verplicht)
3. Via: geeft een tussenstop aan
4. Op: geeft de vertrekdatum aan
5. Om: geeft de vertrektijd aan (als alternatief werkt 'vertrek:' ook)
6. Aankomst: geeft de aankomsttijd aan

Je kan deze steekwoorden in elke volgorde gebruiken. Zo worden zowel 'van: Utrecht naar: Amersfoort' als 'naar: Amersfoort van: Utrecht' goed herkend.
Voor elk reisplan moet een vertreklocatie ('van:') en een bestemming ('naar:') worden aangegeven. De andere steekwoorden kunnen worden weggelaten.
Als je geen tijd en geen datum invult wordt de reis 'nu' gepland. Vul je geen datum in maar wel een tijd, dan wordt de reis gepland op dezelfde
dag om de aangegeven tijd. (En vul je geen tijd in maar wel een datum, dan wordt de reis gepland op dezelfde tijd op de aangegeven dag.) Geef je aan aankomsttijd op,
dan hoef je geen vertrektijd meer aan te geven. 

De tijd aangeven kan in de vorm '20 uur 45' of in de vorm '20.25' of '20:45'. De datum aangeven kan in de vorm '19 augustus 2017' of in de vorm '19-08-2017' of '19.08.2017'.

De vertreklocatie en bestemming kunnen stations, bushaltes, postcodes of adressen zijn.

### Voorbeeld
Type in je adresbalk bijvoorbeeld 'van: grote markt groningen naar: de dam amsterdam via: deventer op: 10 mei 2015 om: 12 uur', dan gebeurt er het volgende:

1. Je vertreklocatie wordt herkend als 'grote markt groningen'
2. Je bestemming wordt herkend als 'de dam amsterdam'
3. Je tussenstop wordt herkend als 'deventer' 
4. Je vertrekdatum wordt herkend als 10 mei 2015
5. Je vertrektijd wordt herkend als 12 uur 's middags

Je wordt doorgestuurd naar: http://9292.nl/plan/vertrek/2015-05-10T1200?van=grote-markt-groningen&naar=de-dam-amsterdam&via=deventer.

9292ov.nl heeft twee van je locaties nog niet precies herkend. Voor 'grote markt groningen' en 'de dam amsterdam' kun je kiezen uit een paar suggesties.
Bedoelde je de bushalte Grote Markt in Groningen, of bedoelde je het adres Grote Markt in Groningen? Bedoelde je de bezienswaardigheid 'Dam' in Amsterdam,
of bedoelde je een van de bijbehorende bus/tramhaltes? De tussenstop Deventer is direct herkend als station Deventer. Als je aangeeft welke precieze locatie
je bedoelt krijg je reisadvies te zien.

Op https://youtu.be/cZ_-IU14gD8 vind je een filmpje met meer voorbeelden.

### Hoe werkt dit eigenlijk?
De OmniBus Reisplanner maakt zelf geen reisadvies voor je. Daarvoor wordt gebruik gemaakt van 9292ov.nl. De webadressen van reisadviezen op 9292ov.nl hebben een vaste structuur.
Deze extensie zet jouw ingetypete reisplan om in een webadres dat door 9292ov.nl herkend wordt. Je hoeft hierdoor niet meer zelf naar 9292ov.nl te navigeren 
en daar alle gevraagde velden in te vullen. In plaats daarvan kan je in gewoon Nederlands je reisplan in de adresbalk typen en word je door de OmniBus Reisplanner 
doorgestuurd naar het passende reisadvies op 9292ov.nl.

## Versiegeschiedenis
- v0.60: Reizen op aankomsttijd mogelijk. 'Vertrek:' toegevoegd als alternatief steekwoord voor 'om:'
- v0.51: Straatnamen waarin een of meerdere steekwoorden voorkomen worden nu ook herkend. Om dit op te lossen moeten steekwoorden in het reisplan met een dubbele punt geschreven worden (bijvoorbeeld 'van:')
- v0.40: Eerste publieke versie

## Geplande functies en bekende problemen
-