# TagTuner music player
TagTuner is a device that enables you to access music playlists or albums using NFC tags.\
It only works when integrated with Home Assistant media players and the Music Assistant music library is optional. This setup seamlessly blends your digital only music collection with the tactile experience of playing a physical record, tape or cd.\
Physical music media offer several advantages:

- it's easy
- it's fast
- it's inclusive

TagTuner is made with [ESPHome](https://www.esphome.io) and includes

- an NFC reader
- a dial
- a button
- a multicolor LED light

All of this is housed in a sleek, custom design case.
![B71AED4C-08D7-4F52-AC81-285DC6743BAC](https://github.com/user-attachments/assets/35055b52-55a9-4207-9440-7b8cfff1b8df)

D1-Custom version is only 16mm high
![66AA4F85-2C12-4B6F-A300-D6C1CED9CAEC_1_105_c](https://github.com/user-attachments/assets/7e018411-fecd-4189-b498-19e88d62dc3b)

Here is an exploded view of the TagTuner 3D model with a round tag card \
<img width="1077" alt="35F8BCBF-CFB4-4F8B-A8F3-9931829DD101" src="https://github.com/user-attachments/assets/cd764ba3-65bd-4c20-bd40-68724a8d0756">

## Getting started
To start using TagTuner, you’ll need the following:
- [Home Assistant](https://www.home-assistant.io) 2024.x
- [Music Assistant](https://music-assistant.io) 2.x or [Sonos](https://www.sonos.com/) speaker 
- configured MAss music [library](https://music-assistant.io/usage/#the-library) and/or a streaming subscription 
- TagTuner device configured in HAss
- Programmable NTAG213/215/216 tags

![8D01B378-9F47-4FF3-8D71-280600690BE8_1_102_a](https://github.com/user-attachments/assets/cab0a534-d01e-4579-b5ea-96b6a81d9edc)


Assuming you already have Home Assistant (HAss) with Music Assistant (MAss) or Sonos set up and running, TagTuner supports [Improv via Serial](https://esphome.io/components/improv_serial) for Wi-Fi configuration.\
If the Wi-Fi connection is misconfigured, the device will start a Wi-Fi access point, allowing you to connect and set the password.\
Home Assistant will automatically detect your new TagTuner as ESPhome device.\
In the Diagnostic panel of TagTuner you can see detailed state of your device.\
Simply place any NFC tag and watch Status messages.\
<img width="324" alt="A2F404BB-9D49-482E-803A-38D39FF03134" src="https://github.com/user-attachments/assets/56f05f6a-bc51-4cd3-86e2-711e502e7432">

![1CE9F457-F305-4B00-A466-14A5B7033EF4_1_102_a](https://github.com/user-attachments/assets/9916ada0-1a81-4ff7-8496-1d131a75d8da)

## Using TagTuner
TagTuner relies heavily on Home Assistant automation. To get it working, import **TagTuner for HAss** blueprint

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fraw.githubusercontent.com%2Fluka6000%2FTagTuner%2Frefs%2Fheads%2Fmain%2Fblueprints%2FTagTuner4HAss.yaml)

Create automation with this blueprint.\
Select your TagTuner device (you can have more than one!) and media player that will be your speaker \
<img width="1048" alt="AA88EF99-C0A6-40CE-A8F9-60A0C926069F" src="https://github.com/user-attachments/assets/2e1a081c-0f3c-4adc-a19b-ac921e2a9050">

![B459D72A-3B97-4AFB-BF86-19F3298A521F_1_102_a](https://github.com/user-attachments/assets/9b11ebfa-5114-451c-a7fb-fdaacd612d1b)

### Playing music
Place your tag flat on the TagTuner or use the slot to position it nicely.\
TagTuner will read the tag and send the playlist information to Home Assistant. Using automation, HAss will play music on the speaker you've set up for this TagTuner.

### Button operations
**Single click**: next \
**Double click**: play/pause \
**Long click** (>1s): mute/unmute

### Volume control
Rotate the dial left: **volume down**. \
Rotate the dial right: **volume up**. 

### Feedback
Watch the LED light in the button: \
**white blink**: operation confirmed \
**flashing red**: writing operation in progress \
**flashing green**: writing success 

### Diagnostic
Check the Diagnostic->Status messages on the device page in Home Assistant.\
The ladybug icon is your guide.

![AA29C1D0-BE96-452C-B2BF-FDD8AF05B9F1_1_102_a](https://github.com/user-attachments/assets/2aa49e88-7832-40c9-b8ea-dc481e9369fa)

## How to get tags for TagTuner
### Buy tags
Choose NTAG215 (504 bytes) or NTAG216 (888 bytes) tags if you want to include the playlist name and artist. Otherwise, NTAG213 (144 bytes) will suffice for just links to playlists

- [Plain white cards](https://s.click.aliexpress.com/e/_Deb0eeV)
- [Wooden cards](https://s.click.aliexpress.com/e/_DdGYnJf)
- [Round stickers](https://s.click.aliexpress.com/e/_DB8U8dB)

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

## Build your own TagTuner
Choose and print your enclosure with preffered colors and surface patterns
![150898D9-AA77-4470-9DA3-2A89EE304011](https://github.com/user-attachments/assets/d036c021-b2bc-496b-a427-b9ae3361d691)

I suggest a cool white base and a dark front plate with a nice carbon fibre pattern.

### Parts for Atom grove version
This version is focused on minimum soldering since it's based on Grove parts and connectors
- [m5stack Atom Echo](https://s.click.aliexpress.com/e/_DCenStP) controller
- [pn532](https://s.click.aliexpress.com/e/_De8uw89) NFC reader
- [grove angle connectors](https://s.click.aliexpress.com/e/_DDF07mN)
- [grove cables](https://s.click.aliexpress.com/e/_DEA2jSV)
- [grove rotary encoder](https://www.seeedstudio.com/Grove-Encoder.html?sensecap_affiliate=3ftNV1d&referring_service=link)
#### Grove wiring
First, you need to solder the [grove angle connector](https://s.click.aliexpress.com/e/_DDF07mN) to the [PN532 NFC](https://s.click.aliexpress.com/e/_De8uw89) board
![CA3A603C-CE5B-4982-AF24-9E40D3E554C2_1_201_a](https://github.com/user-attachments/assets/977e082d-af23-4d34-a981-68bd14b8df44)
Remember to set the DIP switches to 10 to enable I2C.

The [SeeedStudio rotary encoder](https://www.seeedstudio.com/Grove-Encoder.html?sensecap_affiliate=3ftNV1d&referring_service=link) already has its connector. For the other end of the [cable](https://s.click.aliexpress.com/e/_DEA2jSV), simply use [grove angle connector](https://s.click.aliexpress.com/e/_DDF07mN) directly to the Atom controller\
![7D603FCA-9D48-485F-8AD4-685A469D73F6_1_201_a](https://github.com/user-attachments/assets/3f0e609b-15c2-43da-9a52-8e30b831a6ef)

It's really as simple as that
![8CD41A9B-E7F6-46FE-8770-5138BF0B893E_1_201_a](https://github.com/user-attachments/assets/a2f7ff86-7c88-4d17-807e-382d4e55d938)

Everything will fit into the enclosure.\
Use short (<5mm) M2 screw for Atom and longer (10mm) M2.5 screws for everything else (nfc board, volume encoder, front plate).
![BD16EF90-5222-40EF-A131-2C27C6EE5493_1_102_o](https://github.com/user-attachments/assets/3339c19f-d8e6-4a7f-83e1-4b611bee51d4)

### Parts for D1-Custom version
This version requires a bit more soldering but allows the knob to be used as a button.
- [esp32 D1 mini](https://s.click.aliexpress.com/e/_DkyEAwt) controller with USBC
- [pn532](https://s.click.aliexpress.com/e/_De8uw89) NFC reader
- [hw040](https://s.click.aliexpress.com/e/_DlIIMtn) rotary encoder
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

ESP23 D1 mini will fit perfectly into the bottom part braces
<img width="800" alt="image" src="https://github.com/user-attachments/assets/c7907571-c27f-4d40-ac83-a28fe8a409e3" />

Built-in LED is used as confirmation light
![85EAFCF9-9730-4185-8AF7-A039E5863FB1_1_105_c](https://github.com/user-attachments/assets/4572c1d7-16c5-45c3-8909-0a0d37272bc1)

### Case options
- [3d models](https://github.com/luka6000/TagTuner/tree/main/3d%20models): Atom Echo Grove version 3d models
- [printables](): 16mm D1-Custom version model

### Firmware options

- [tagtuner-atom-grove.yaml](https://github.com/luka6000/TagTuner/blob/main/tagtuner-atom-grove.yaml): based on m5stack Atom Echo and grove connectors
- [tagtuner-atom-grove-ble.yaml](https://github.com/luka6000/TagTuner/blob/main/tagtuner-atom-grove-ble.yaml): m5stack Atom Echo + Bluetooth & BLE proxy, no media player, ESP-IDF framework. This is current default install
- [tagtuner-for-tagreader.yaml](https://github.com/luka6000/TagTuner/blob/main/tagtuner-for-tagreader.yaml): TagTuner firmware for [Adonno tagreader](https://github.com/adonno/tagreader) device (buzzer only, no led support)
- [tagtuner-D1-custom1.yaml](https://github.com/luka6000/TagTuner/blob/main/tagtuner-D1-custom1.yaml): ESP32 D1 mini with HW-040 rotary encoder and button. Bluetooth & BLE proxy, ESP-IDF framework

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
All of this is my personal hobby project, available for free download and personal use. If you’d like to support me with a coffee, beer, filament, or electronic parts, feel free to use PayPal
[paypal.me/lukagra](http://paypal.me/lukagra)

Links to parts listed above are affiliate links, which allow me to earn a small commission from your purchase. Thank you! 🙏

My work, including yaml files, 3d model and documentation, is licensed under \
[Creative Commons (4.0 International License) Attribution—Noncommercial—Share Alike \
<img width="100" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png">](http://creativecommons.org/licenses/by-nc-sa/4.0/)

ESPhome components modifications are licensed under ESPHome [license](https://github.com/esphome/esphome?tab=License-1-ov-file#readme)
