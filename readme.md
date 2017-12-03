# RevoSwitchCaptivePortal

Almost-single page captive portal for an IoT switchboard based on the ESP8266.    

&nbsp;

## Features
* Uses jQuery.
* Works in extremely memory restrictive environment.
* *Pages* are loaded dynamically using AJAX requests.
* Updates *pages* every one minute.
* Responsive UI.

&nbsp;

## Live Prototyping
1. `npm i`
2. `npm start`

&nbsp; 

## File Organization
Source files can be found in `/src/`.
### Static
* **index.html** - Single page app placeholder.
* **jquery-3.2.1.min.js**
* **script.js** - Consolidated script file.
* **style.css** - Consolidated CSS styles.
* **reboot.html** - Confirmation for restarting device.
* **reset.html** - Confirmation for resetting device.
* **progress.html** - Progress bar to wait for reconnection after reset or restart.

### Pseudo-dynamic
Contains templates that are processed when an HTTP request is made.
* **about.html** - About device.
* **mqtt.html** - MQTT settings.
* **switch.html** - Switchboard.
* **wifiap.html** - AP settings.
* **wifista.html** - Station config.

### Dynamic
Rendered in memory when an HTTP request is made.
* **dhcp** - List of clients connected to AP.
* **aps** - List of scanned WiFi stations.



