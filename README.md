# vcs-solar-balloon

> Part of the [VC Map Project](https://github.com/virtualcitySYSTEMS/map-ui)
> describe your plugin

======================DE=====================================================
Mit Hilfe des Plugins können die vom Solarrechner berechneten Werte in
übersichtlicher Form als Graphen dargestellt werden.
Im App-Konfigurator besteht die Möglichkeit das Plugin nach eigenen Wünschen
zu konfigurieren. Hier stehen folgende Möglichkeiten zur Auswahl:

- Auswahl der Graphdarstellung (Liniendiagramm oder Säulendiagramm)
- Einstellung der Farben für Summenwerte als HEX- Farbstring
- Einstellung der Farben für themat. Flächen als HEX- Farbstring

Alle vorgenommenen Änderungen werden in der Vorschau dargestellt und geben
einen Eindruck davon, wie die Graphen in der VC-Map aussehen werden.

Konfiguration des Plugin für Feature Info im App-Konfigurator:

1. ein Element in der Kategorie FeatureInfo hinzufügen
2. Element auswählen und im Overflowmenü JSON-Editor auswählen
3. im JSON Editor folgendes einfügen:
   {
   "type": "SolarFeatureInfo",
   "name": "SolarFeatureInfo",
   "window": {
   "position": {
   "width": "500px"
   }
   }
   }
4. den / die entsprechenden Layer mit dem SolarFeatureInfo verknüpfen
   => Layer auswählen und bearbeiten => Handhabung in der Karte öffnen
   => FeatureInfo => SolarFeatureInfo auswählen
5. Speichern

======================ENDE DE================================================

======================EN=====================================================
With the help of the plugin, the values calculated by the solar calculator can be
calculated by the solar calculator can be displayed as graphs.
In the app configurator, you can configure the plugin according to your own wishes.
according to your own wishes. The following options are available here:

- Selection of the graph display (line chart or bar chart)
- Setting the colors for sum values as HEX color string
- Setting the colors for themat. Areas as HEX color string

All changes made are displayed in the preview and give an impression of
give an impression of how the graphs will look in the VC map.

Configuration of the Feature Info plugin in the app configurator:

1. add an element in the FeatureInfo category
2. select element and select JSON Editor in the overflow menu
3. Insert the following in the JSON editor:
   {
   "type": "SolarFeatureInfo",
   "name": "SolarFeatureInfo",
   "window": {
   "position": {
   "width": "500px"
   }
   }
   }
4. Link the corresponding layer(s) to the SolarFeatureInfo
   => Select and edit layer => Open handling in the map
   => FeatureInfo => Select SolarFeatureInfo
5. save

======================END EN================================================
