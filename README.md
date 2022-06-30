

## Test page

https://nbtkmy.github.io/DLSCalendar/DLSCalendar.html

## Ein Token oder andere wichtige Information als ein Property für ein GAS-Projekt eintragen

1. Ein GAS-Projekt anlegen
1. "Einstellung" öffnen
1. Unten "Scripteigenschaften" - "Scripteigenschaft hinzufügen"
1. Attribute und Wert eingeben (z.B. "calender_Id" als Attribute und "xxxxx@groupcalendar.google.com" als Wert)
1. in GAS kann man den Wert so holen:

 `var calenderID = PropertiesService.getScriptProperties().getProperty("calendarId");`