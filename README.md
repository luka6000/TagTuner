# TagTuner music player
TagTuner is a device that enables you to access music playlists or albums using NFC tags.\
It only works when integrated with Home Assistant media players and the Music Assistant music library is optional. This setup seamlessly blends your digital only music collection with the tactile experience of playing a physical record, tape or cd.\
Physical music media offer several advantages:
 - it's easy
 - it's fast
 - it's inclusive

TagTuner is made with [ESPHome](https://www.esphome.io) and includes
- an NCF reader
- a dial
- a button
- a multicolor LED light

All of this is housed in a sleek, custom design case.

![69DDB5BF-8B01-49CE-BE59-851B29B1ED3A_1_102_a](https://github.com/user-attachments/assets/9f326206-a424-430e-952c-92fd14c55fc4)

Here is an exploded view of the TagTuner 3D model with a round tag card \
<img width="873" alt="image" src="https://github.com/user-attachments/assets/0e450623-dc0f-41c7-8824-d67256ae13eb">


## Getting started
To start using TagTuner, you’ll need the following:
- [Home Assistant](https://www.home-assistant.io) 2024.x
- [Music Assistant](https://music-assistant.io) 2.x or [Sonos](https://www.sonos.com/) speaker 
- configured MAss music [library](https://music-assistant.io/usage/#the-library) and/or a streaming subscription 
- TagTuner device configured in HAss
- Programmable NTAG213/215/216 tags

![8D01B378-9F47-4FF3-8D71-280600690BE8_1_102_o](https://github.com/user-attachments/assets/0e0ad717-0a94-4073-bbb1-225efcda56c9)

Assuming you already have Home Assistant (HAss) with Music Assistant (MAss) or Sonos set up and running, TagTuner supports [Improv via Serial](https://esphome.io/components/improv_serial) for Wi-Fi configuration.\
If the Wi-Fi connection is misconfigured, the device will start a Wi-Fi access point, allowing you to connect and set the password.\
Home Assistant will automatically detect your new TagTuner as ESPhome device.\
In the Diagnostic panel of TagTuner you can see detailed state of your device.\
Simply place any NFC tag and watch Status messages.\
<img width="324" alt="image" src="https://github.com/user-attachments/assets/9645979e-1954-4979-8ea1-116c09eea6ad">

![1CE9F457-F305-4B00-A466-14A5B7033EF4_1_102_o](https://github.com/user-attachments/assets/bcf9e5af-23d7-477c-826d-026988598725)

## Using TagTuner
TagTuner relies heavily on Home Assistant automation. To get it working, import **TagTuner for HAss** blueprint

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fraw.githubusercontent.com%2Fluka6000%2FTagTuner%2Frefs%2Fheads%2Fmain%2Fblueprints%2FTagTuner4HAss.yaml)

Create automation with this blueprint.\
Select your TagTuner device (you can have more than one!) and media player that will be your speaker \
<img width="681" alt="image" src="https://github.com/user-attachments/assets/d4804213-15da-4d2a-a1d8-f9c8e0165344">

![B459D72A-3B97-4AFB-BF86-19F3298A521F_1_102_a](https://github.com/user-attachments/assets/31093b69-9d37-451a-ac16-b3beae95235c)

### Playing music
Place your tag flat on the TagTuner or use the slot to position it nicely.\
TagTuner will read the tag and send the playlist information to Home Assistant. Using automation, HAss will play music on the speaker you've set up for this TagTuner.

### Button operations
**Single click**: play/pause \
**Double click**: next \
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

![AA29C1D0-BE96-452C-B2BF-FDD8AF05B9F1_1_102_a](https://github.com/user-attachments/assets/a4f36760-f15a-4470-8a42-67170456f503)

## How to get tags for TagTuner
### Buy tags
Choose NTAG216 or 888-byte tags if you want to include the playlist name and artist. Otherwise, NTAG213 (144 bytes) will suffice for just links to playlists
- [Wooden cards](https://s.click.aliexpress.com/e/_DdGYnJf)
- [Round stickers](https://s.click.aliexpress.com/e/_DB8U8dB)

Stickers can be used with printed cards or any other object you can place on your TagTuner to play music.\
I use Canon KC-18IF card-sized labels to customize my wooden NFC cards.

### Program tags for Music Assistant
If your speaker is one of Music Assistant media players, your tags need to have a MAss URI.\
[Here](https://music-assistant.io/faq/how-to/#get-the-uri) you can find instructions on how to get URI for the playlist or album you want.

On the TagTuner device page, you'll find all the fileds nesesary to write the playlist URI to your tag \
<img width="324" alt="image" src="https://github.com/user-attachments/assets/6361f840-ccd0-48f6-b0f3-493330e1852a">

Minimum information needed is URI.\
Fill in the Playlist URI -> click _Write Tag_ -> LED starts flashing red -> Place the tag on TagTuner \
Successful writing will be confirmed with green light.\
Check Diagnostic->Status for any additional information.

### Program tags for Sonos
If your speaker is Sonos media player, your tags can have a plain HTTP playlist URL.\
[Here](https://support.apple.com/en-us/118235) you can find instructions on how to get the album or playlist url for Apple Music. Just copy it.\
It should work the same with [Spotify](https://support.spotify.com/us/article/share-from-spotify)

On the TagTuner device page, you'll find all the fileds nesesary to write the playlist URL (URI) to your tag \
<img width="324" alt="image" src="https://github.com/user-attachments/assets/867fa2ca-bb9f-4ace-b914-543b2f7d615f">

Minimum information needed is URL.\
Fill in the Playlist URL -> click _Write Tag_ -> LED starts flashing red -> Place the tag on TagTuner \
Successful writing will be confirmed with green light.\
Check Diagnostic->Status for any additional information.

### Other options
You can also write your tags with any NFC NDEF tag writer, such as NXP NFC TagWriter for [iOS](https://apps.apple.com/us/app/nfc-tagwriter-by-nxp/id1246143221) or [Android](https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter)
![23DA18C3-C389-4D55-ADA7-6E58E6279F29](https://github.com/user-attachments/assets/671e840c-75ee-430c-bcc3-2b29e6ef494f)
 or 
![702854C5-3B0B-479A-BCD5-51985544B36D](https://github.com/user-attachments/assets/3a0256b7-4f7f-4a06-88a7-8fd420a59e81)

### More options
#### for Sonos
You can also play any Sonos app favorite playlist, album, or station!\
Simply write the name of the playlist or station exactly as it appears in the Sonos app.\
Then, enter sonos-2:// in the URI field.

<img width="323" alt="image" src="https://github.com/user-attachments/assets/70014add-997f-4712-91d2-ba48bcdf4228">

#### for read-only tags
If you have any read-only tags that can be read by TagTuner (give it a try to check), you can use them too!\
To set the playlist URL, place it as the name of the tag in HAss panel \
[![Open your Home Assistant instance and show your tags.](https://my.home-assistant.io/badges/tags.svg)](https://my.home-assistant.io/redirect/tags/)
<img width="953" alt="image" src="https://github.com/user-attachments/assets/7b7b5242-6fd6-4450-8e93-d7c119746dcf">

Any tag id read by TagTuner will be pushed to HAss [blueprint](#using-tagtuner) automation.

![8C579E90-8189-417C-8D1E-49295F2F88D9_1_102_a](https://github.com/user-attachments/assets/832780bc-838e-4e95-8257-0a4d52c0a0bf)

## Build your own TagTuner
Choose and print you enclosure with preffered colors and surface patterns
<img width="1679" alt="image" src="https://github.com/user-attachments/assets/25c896ea-b668-4a77-b63f-8183fdafdaee">

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
![CA3A603C-CE5B-4982-AF24-9E40D3E554C2_1_201_a](https://github.com/user-attachments/assets/aee615de-db27-4463-a3f9-6fbd64d7d2b9)
Remember to set the DIP switches to 10 to enable I2C.

The [SeeedStudio rotary encoder](https://www.seeedstudio.com/Grove-Encoder.html?sensecap_affiliate=3ftNV1d&referring_service=link) already has its connector. For the other end of the [cable](https://s.click.aliexpress.com/e/_DEA2jSV), simply use [grove angle connector](https://s.click.aliexpress.com/e/_DDF07mN) directly to the Atom controller\
![7D603FCA-9D48-485F-8AD4-685A469D73F6_1_201_a](https://github.com/user-attachments/assets/562ea087-4438-4217-9373-c383868dda3c)

It's really as simple as that
![8CD41A9B-E7F6-46FE-8770-5138BF0B893E_1_201_a](https://github.com/user-attachments/assets/39422468-660a-44df-809b-ff936e4e9091)

Everything will fit into the enclosure.\
Use short (<5mm) M2 screw for Atom and longer (10mm) M2.5 screws for everything else (nfc board, volume encoder, front plate).
![BD16EF90-5222-40EF-A131-2C27C6EE5493_1_102_o](https://github.com/user-attachments/assets/c4f3e6dd-5e49-4b89-bd84-fde7808667cd)

### Parts for custom-built version
- [esp32 D1 mini](https://s.click.aliexpress.com/e/_DkyEAwt) controller with USBC
- [pn532](https://s.click.aliexpress.com/e/_De8uw89) NFC reader
- [rotary encoder](https://s.click.aliexpress.com/e/_DlIIMtn)
#### Wiring TBD

### Firmware options
- tagtuner-atom-grove.yaml: based on m5stack Atom Echo and grove connectors
- tagtuner-esp32.yaml: custom-built

## A little history
It all began one day back in 2022. \
I've seen all those cool NFC jukebox projects but found myself too lazy to automate each tag individually. \
So, I [contributed](https://github.com/adonno/tagreader/commits?author=luka6000) to the Adonno [tagreader](https://github.com/adonno/tagreader) project to enable it to push playlist URLs as HAss events. \
[Here's](https://community.home-assistant.io/t/tagreader-jukebox-old-dog-new-tricks/407855) original story posted on Home Assistant communities.\
Since then, TagTuner has been completely refactored and physically redesigned.

## Disclaimer
All of this is my personal hobby project, available for free download and personal use. If you’d like to support me with a coffee, beer, filament, or electronic parts, feel free to use PayPal
http://paypal.me/lukagra

Links to parts listed above are affiliate links, which allow me to earn a small commission from your purchase.

My work, including yaml files, 3d model and documentation, is licensed under \
[Creative Commons (4.0 International License) Attribution—Noncommercial—Share Alike \
![image](https://github.com/user-attachments/assets/6430b4a6-a311-44ea-bb94-0f72716f6d19)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

ESPhome components modifications are licensed under ESPHome [license](https://github.com/esphome/esphome?tab=License-1-ov-file#readme)
