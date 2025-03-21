# TagTuner music player
TagTuner is a device that enables you to access music playlists or albums using NFC tags.\
It only works when integrated with Home Assistant media players. Music Assistant music library is optional. This setup seamlessly blends your digital only music collection with the tactile experience of playing a physical record, tape or cd.\
Physical music media offer several advantages:

- it's easy
- it's fast
- it's inclusive

TagTuner is made with [ESPHome](https://www.esphome.io) and includes

- an NFC reader
- a dial with a button
- a LED light

All of this is housed in a sleek, custom design case only 16mm high
![66AA4F85-2C12-4B6F-A300-D6C1CED9CAEC_1_105_c](https://github.com/user-attachments/assets/7e018411-fecd-4189-b498-19e88d62dc3b)

Here is an exploded view of the TagTuner 3D model with a round tag card \
<img width="938" alt="image" src="https://github.com/user-attachments/assets/e78398b6-1221-4449-a99d-038a4879a5e4" />

TagTuner is a device approved by the [Made for ESPHome](https://devices.esphome.io/made-for-esphome) program.
![made-for-esphome-black-on-white](https://github.com/user-attachments/assets/58dfbe3a-5c78-4992-89bf-8bd149d91017)

Check out also the [TagTuner on HA Voice PE version](https://github.com/luka6000/TagTuner/blob/main/TagTuner-on-HA-Voice-PE.md)
![2B7737D0-8398-4024-95F7-A9C97CBA63E3_1_105_c](https://github.com/user-attachments/assets/3513e22a-9ef4-4424-92c9-9eba9368f3a5)

## Getting started
To start using TagTuner, you’ll need the following:
- [Home Assistant](https://www.home-assistant.io) 2025.1.x
- [Music Assistant](https://music-assistant.io) 2.x or [Sonos](https://www.sonos.com/) speaker 
- configured MAss music [library](https://music-assistant.io/usage/#the-library) and/or a streaming subscription 
- TagTuner device configured in HAss
- any NFC tags or programmable NTAG213/215/216

![8D01B378-9F47-4FF3-8D71-280600690BE8_1_102_a](https://github.com/user-attachments/assets/cab0a534-d01e-4579-b5ea-96b6a81d9edc)


Assuming you already have Home Assistant (HAss) with Music Assistant (MAss) or Sonos set up and running, TagTuner supports [Improv via Serial](https://esphome.io/components/improv_serial) and [Improv via BLE](https://esphome.io/components/esp32_improv) for Wi-Fi configuration.\
Home Assistant will automatically detect your new TagTuner as ESPhome device.\
In the Diagnostic panel of TagTuner you can see detailed state of your device.\
Simply place any NFC tag and watch Status messages.\
<img width="324" alt="A2F404BB-9D49-482E-803A-38D39FF03134" src="https://github.com/user-attachments/assets/56f05f6a-bc51-4cd3-86e2-711e502e7432">

![1CE9F457-F305-4B00-A466-14A5B7033EF4_1_102_a](https://github.com/user-attachments/assets/9916ada0-1a81-4ff7-8496-1d131a75d8da)

## Build your own TagTuner

### Case
Custom model cases are print-ready

- [printables](https://www.printables.com/model/1109660-tagtuner-d1-custom1)
- [ko-fi/shop](https://ko-fi.com/s/ce428ab53f)

Choose and print your enclosure with preferred colors and surface patterns
![A4334D41-580B-43D2-9B9E-4769A9EE2630_1_105_c](https://github.com/user-attachments/assets/a507ec1a-55a8-4e1c-a4b2-368f907f073b)

I suggest a cool-white (signal white) base and a dark front plate with a nice carbon fibre pattern.
![D7EFA920-1D9A-4D65-AD23-4F0A2328A510_1_105_c](https://github.com/user-attachments/assets/ea6c62d3-68ee-47b1-8d40-b381910d00c3)

### Parts for D1-Custom version
- [esp32 D1 mini](https://s.click.aliexpress.com/e/_DkyEAwt) controller with USBC
- [pn532](https://s.click.aliexpress.com/e/_De8uw89) NFC reader
- [hw040](https://s.click.aliexpress.com/e/_DlIIMtn) rotary encoder
- [grove angle connectors](https://s.click.aliexpress.com/e/_DDF07mN)

#### Wiring D1-Custom
pn532 connector:
- GND: GND
- VCC: VCC (+5V)
- SDA/TXD: IO21
- SCL/RXD: IO22

hw040 connector:
- CLK: IO18
- DT: IO19
- SW: IO23
- +: +3.3V
- GND: GND

![BCAC91FD-93C7-45B1-BD3F-C07717A7AF5C_1_201_a](https://github.com/user-attachments/assets/6c01184f-bc0a-4e16-bff7-f1452aa176a0)

ESP32 D1 mini will fit perfectly into the bottom part braces
<img width="800" alt="image" src="https://github.com/user-attachments/assets/c7907571-c27f-4d40-ac83-a28fe8a409e3" />

Built-in LED is used as confirmation light. Print the led peg with clear filament and it will give great results
![IMG_2940](https://github.com/user-attachments/assets/e50b129d-66d2-4ead-8c5c-6e190eb7a39f)

I preffer soldering the [grove angle connector](https://s.click.aliexpress.com/e/_DDF07mN) to the [PN532 NFC](https://s.click.aliexpress.com/e/_De8uw89) board
![CA3A603C-CE5B-4982-AF24-9E40D3E554C2_1_201_a](https://github.com/user-attachments/assets/977e082d-af23-4d34-a981-68bd14b8df44)
Remember to set the DIP switches to 10 to enable I2C. Correct position for I2c is marked by yellow lines.

Everything will fit into the enclosure.
![79F47CA4-0882-47AD-8710-8E5B6021D77A_1_105_c](https://github.com/user-attachments/assets/97d14e1a-97f8-4c64-a5ec-44054e5350db)

Use 10mm M2.5 screws (nfc board, volume encoder, front plate).

### Firmware

- [quick start](https://luka6000.github.io/TagTuner/#installation): use pre-built firmware with [ESP Web Tools](https://esphome.github.io/esp-web-tools/) powered installer [here](https://luka6000.github.io/TagTuner/#installation)
- [tagtuner-D1-custom1.yaml](https://github.com/luka6000/TagTuner/blob/main/tagtuner-D1-custom1.yaml): ESP32 D1 mini with HW-040 rotary encoder and button. Bluetooth & BLE proxy, ESP-IDF framework


### Other options
- [HA Voice PE version](https://github.com/luka6000/TagTuner/blob/main/TagTuner-on-HA-Voice-PE.md): TagTuner on HA Voice PE device
- [tagtuner-for-tagreader.yaml](https://github.com/luka6000/TagTuner/blob/main/tagtuner-for-tagreader.yaml): TagTuner firmware for [Adonno tagreader](https://github.com/adonno/tagreader) device (buzzer only, no led support)
- [Atom version](https://github.com/luka6000/TagTuner/blob/main/TagTuner-Atom.md): based on m5stack Atom Echo and grove connectors; free model case but much thicker (23.5mm)
- [Compact Case](https://www.printables.com/model/1165511-tagtuner-compact-case-rfid-nfc-scanner-home-assist): card-sized case by Youddha (thank you!)

## Using TagTuner
TagTuner relies heavily on Home Assistant automation. To get it working, import **TagTuner for HAss** blueprint

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fraw.githubusercontent.com%2Fluka6000%2FTagTuner%2Frefs%2Fheads%2Fmain%2Fblueprints%2FTagTuner4HAss.yaml)

Create automation with this blueprint.\
Select your TagTuner device (you can have more than one!) and media player that will be your speaker \
<img width="1048" alt="AA88EF99-C0A6-40CE-A8F9-60A0C926069F" src="https://github.com/user-attachments/assets/2e1a081c-0f3c-4adc-a19b-ac921e2a9050">

I do a monthly updates of the blueprint. You can watch my repo to get email notifications. \
Current list of features:

- separate settings for MAss player and HAss player (http sources). If you don't need double setting, just set the same player in both
- Stop music on tag removed: choose if you want this
- Announce every playlist: you can choose your TTS engine and TagTuner will use your speaker to read artist and playlist names
- Shuffle every playlist: choose if you want this. You can also add '/shuffle' (without quotes or spaces) at the end of the source URI to shuffle just this album
- Volume limiter: to limit the maximum volume set with TagTuner knob (kids friendly!)
- Default volume on start playing
- Notify about version mismatch: shoose if you want HA dashboard notification that your blueprint version is to new vs your TagTuner yaml firmware. Currently there are no breaking changes so this is future proofing the blueprint and your experience

<img width="1046" alt="image" src="https://github.com/user-attachments/assets/afe982a8-cde0-4c9f-8c76-17ba57b1427b" />


![B459D72A-3B97-4AFB-BF86-19F3298A521F_1_102_a](https://github.com/user-attachments/assets/9b11ebfa-5114-451c-a7fb-fdaacd612d1b)

### Playing music
Place your tag flat on the TagTuner or use the slot to position it nicely.\
TagTuner will read the tag and send the playlist information to Home Assistant. Using automation, HAss will play music on the speaker you've set up for this TagTuner.

### Button operations
**Single click**: next \
**Double click**: play/pause \
**Long click** (>1s): mute/unmute \
**Triple click**: previous

### Volume control
Rotate the dial left: **volume down** \
Rotate the dial right: **volume up** 

### Feedback
Watch the LED light in the button: \
**blink**: operation confirmed \
**flashing constant**: writing operation in progress \
**flashing few times**: operation success

D1-Custom has a single color led so it's only blinking but it's really easy to understand what's going on. Use HAss device Diagnostic dashboard in case you would need status info.

### Diagnostic
Check the Diagnostic->Status messages on the device page in Home Assistant.\
The ladybug icon is your guide.

![AA29C1D0-BE96-452C-B2BF-FDD8AF05B9F1_1_102_a](https://github.com/user-attachments/assets/2aa49e88-7832-40c9-b8ea-dc481e9369fa)

## How to get tags for TagTuner
### Upcycle tags you already have
Use whatever nfc tags you have that work with PN532. \
Simply scan them with TagTuner and check you HA tags panel. \
Try Amiibos, NFC rings, work badges, etc. \
You can even [recycle a Sonicare](https://github.com/luka6000/TagTuner/blob/main/Recycled-tags.md) toothbrush head 🤙

Check [the read-only tags](https://github.com/luka6000/TagTuner/tree/main?tab=readme-ov-file#for-read-only-tags) section below.

### Buy tags
Choose NTAG215 (504 bytes) or NTAG216 (888 bytes) tags if you want to include the playlist name and artist. Otherwise, NTAG213 (144 bytes) will suffice for just links to playlists

- [Plain white cards](https://s.click.aliexpress.com/e/_Deb0eeV)
- [Wooden cards](https://s.click.aliexpress.com/e/_DdGYnJf)
- [Round stickers](https://s.click.aliexpress.com/e/_DB8U8dB)

Record-like cards can be printed (model file included) or you can buy those nice looking [vinyl coasters](https://s.click.aliexpress.com/e/_ooVfjuN). Just remember to put NFC stickers on them ;-) \
Stickers can be used with 3d printed cards or any other object you can place on your TagTuner to play music.\
I use Canon KC-18IF card-sized labels to customize my wooden NFC cards.

### Program tags for Music Assistant
If your speaker is one of Music Assistant media players, your tags need to have a MAss URI.\
[Here](https://music-assistant.io/faq/how-to/#get-the-uri) you can find instructions on how to get URI for the playlist or album you want.

On the TagTuner device page, you'll find all the fileds nesesary to write the playlist URI to your tag \
<img width="324" alt="38842E5D-4B81-4B88-8815-FD35B67D8357" src="https://github.com/user-attachments/assets/e6e480e0-020a-49a8-b126-f4356e159fbc">

Minimum information needed is URI.\
Fill in the Playlist URI -> click _Write Tag_ -> LED starts flashing red -> Place the tag on TagTuner \
Successful writing will be confirmed with green light.\
Check Diagnostic->Status for any additional information.

### Program tags for Sonos
If your speaker is Sonos media player, your tags can have a plain HTTP playlist URL.\
[Here](https://support.apple.com/en-us/118235) you can find instructions on how to get the album or playlist url for Apple Music. Just copy it.\
It should work the same with [Spotify](https://support.spotify.com/us/article/share-from-spotify)

On the TagTuner device page, you'll find all the fileds nesesary to write the playlist URL (URI) to your tag \
<img width="324" alt="15B48F29-212B-4739-B62A-51EE45BEE9E9" src="https://github.com/user-attachments/assets/50d261f6-6072-48a3-a82e-9534b6e2f28d">

Minimum information needed is URL.\
Fill in the Playlist URL -> click _Write Tag_ -> LED starts flashing red -> Place the tag on TagTuner \
Successful writing will be confirmed with green light.\
Check Diagnostic->Status for any additional information.

### Other options
You can also write your tags with any NFC NDEF tag writer, such as NXP NFC TagWriter for [iOS](https://apps.apple.com/us/app/nfc-tagwriter-by-nxp/id1246143221) or [Android](https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter)\
<img width="300" src="https://github.com/user-attachments/assets/b83d0674-f327-4714-a7f2-4a0d5ad110c7">
 or 
<img width="300" src="https://github.com/user-attachments/assets/0a5d697c-b908-4e5f-bd08-c8537ef37f93">


### More options
#### for Sonos
You can also play any Sonos app favorite playlist, album, or station!\
Simply write the name of the playlist or station exactly as it appears in the Sonos app.\
Then, enter sonos-2:// in the URI field.\
<img width="324" alt="864038B7-970D-4120-AF52-DD503CA11BEE" src="https://github.com/user-attachments/assets/11dc3202-3d7b-46df-b1f6-7557bd2f7015">

#### for read-only tags
If you have any read-only tags that can be read by TagTuner (give it a try to check), you can use them too!\
To set the playlist URL, place it as the name of the tag in HAss panel \
[![Open your Home Assistant instance and show your tags.](https://my.home-assistant.io/badges/tags.svg)](https://my.home-assistant.io/redirect/tags/)\
<img width="823" alt="D88754F6-5199-47EA-B71D-4B262B060160" src="https://github.com/user-attachments/assets/14cdc593-dfa1-4294-a6fa-5aa60a8b0677">

Any tag id read by TagTuner will be pushed to HAss [blueprint](#using-tagtuner) automation.

![8C579E90-8189-417C-8D1E-49295F2F88D9_1_102_a](https://github.com/user-attachments/assets/cc76a561-0545-4d9f-bb38-eff220161ae8)

## Help me
OK, I can try. Please choose your preferred way of communication

- [reddit](https://www.reddit.com/r/homeassistant/comments/1go2l9l/tagtuner_nfc_music_player_showoff/)
- [HAss community](https://community.home-assistant.io/t/tagtuner-music-player-for-nfc-tags/787529)
- [MAss discord](https://discord.com/channels/753947050995089438/1300230612958838908/1300230612958838908)

## A little history
It all began one day back in 2022. \
I've seen all those cool NFC jukebox projects but found myself too lazy to automate each tag individually. \
So, I [contributed](https://github.com/adonno/tagreader/commits?author=luka6000) to the Adonno [tagreader](https://github.com/adonno/tagreader) project to enable it to push playlist URLs as HAss events. \
[Here's](https://community.home-assistant.io/t/tagreader-jukebox-old-dog-new-tricks/407855) original story posted on Home Assistant communities.\
Since then, TagTuner has been completely refactored and physically redesigned.

## Disclaimer
All of this is my personal hobby project, available for free download and personal use. If you’d like to support me with a coffee, beer, filament, or electronic parts, feel free to use [paypal.me/lukagra](https://paypal.me/lukagra) or [ko-fi.com/lukagra](https://ko-fi.com/lukagra)

Links to parts listed above are affiliate links, which allow me to earn a small commission from your purchase. Thank you! 🙏

This work, including yaml files, 3d model (Atom version) and documentation, is licensed under \
[Creative Commons (4.0 International License) Attribution—Noncommercial—Share Alike \
<img width="100" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png">](http://creativecommons.org/licenses/by-nc-sa/4.0/)

ESPhome components modifications are licensed under ESPHome [license](https://github.com/esphome/esphome?tab=License-1-ov-file#readme)
