## Build your own TagTuner with HA Voice PE

TagTuner on HA Voice PE enclosure is part of following downloads
- [printables](https://www.printables.com/model/1109660)
- [ko-fi/shop](https://ko-fi.com/s/ce428ab53f)

Print your enclosure with preffered colors and surface patterns

![2119E494-8E78-4A8D-8FD6-9CC5976E9EBD_1_105_c](https://github.com/user-attachments/assets/2cb9df5c-04aa-4436-b82b-7edd00ae5280)

I suggest a clear or signal white base bottom and a dark front plate with a nice carbon fibre pattern.
![D302D6B2-735A-4064-A4C5-0A7995359701_1_105_c](https://github.com/user-attachments/assets/54da7466-62bb-4fb8-91c6-ea6ba7b7b0f7)
![8D9DAAE4-2B3B-4626-85B5-B985AC7EDB5A_1_105_c](https://github.com/user-attachments/assets/5bdd4410-c9de-40d4-b9c1-0e0009a8ee8a)
![243CFA47-58F3-446D-9562-97C8AB1E3D32_1_105_c](https://github.com/user-attachments/assets/f230cb69-4c35-416a-8985-815d6ebd3776)
![68CBA47B-CEFB-4330-9FC3-0D6CFBE83D7E_1_105_c](https://github.com/user-attachments/assets/de5ae611-83f4-4257-a3fc-b69f52332726)

TagTuner on HA Voice PE is a bit smaller then [D1-Custom](https://github.com/luka6000/TagTuner/blob/ha-voice-pe/README.md) version (12cm vs 14cm) but also higher (20mm vs 16mm without the knob)
![2B7737D0-8398-4024-95F7-A9C97CBA63E3_1_105_c](https://github.com/user-attachments/assets/3513e22a-9ef4-4424-92c9-9eba9368f3a5)

### Parts for TagTuner on HA Voice PE
This version of TagTuner is build arround Home Assistant Voice Preview Edition hardware. It uses Grove connector available on HA Voice PE main board at the bottom.
![havpe](https://voice-pe.home-assistant.io/images/voice_pe_internal_pin_headers.jpg)
![havpe-grove](https://voice-pe.home-assistant.io/images/voice_pe_internal_pin_group_03_grove_port.jpg) \
Please check the [HAVPE docs](https://voice-pe.home-assistant.io/guides/internal-gpio/#grove-port) for details 

You'll need:

- [HA Voice PE](https://www.home-assistant.io/voice-pe/)
- [pn532](https://s.click.aliexpress.com/e/_De8uw89) NFC reader
- [grove angle connectors](https://s.click.aliexpress.com/e/_DDF07mN)
- [grove cables](https://s.click.aliexpress.com/e/_DEA2jSV)

We'll reuse all HA Voice PE components swaping just the enclosure
- 4 rubber pads and screws
- sliding mute switch
- LED diffuser ring
- the dial and the center button
- the speaker
- speaker and main board screws

Please read HAVPE guides on [disassemble](https://voice-pe.home-assistant.io/guides/disassemble/) and [reasemble](https://voice-pe.home-assistant.io/guides/reassemble/) of the device to know all the parts.

![IMG_2985](https://github.com/user-attachments/assets/0504bea5-b2d1-4e60-9cbb-dd72cbd6bd10)

#### Grove wiring
You need to solder the [grove angle connector](https://s.click.aliexpress.com/e/_DDF07mN) to the [PN532 NFC](https://s.click.aliexpress.com/e/_De8uw89) board
![CA3A603C-CE5B-4982-AF24-9E40D3E554C2_1_201_a](https://github.com/user-attachments/assets/977e082d-af23-4d34-a981-68bd14b8df44)
Remember to set the DIP switches to 10 to enable I2C. Correct position for I2c is marked by yellow lines.

### Disassembling HA Voice PE
Use [this guide](https://voice-pe.home-assistant.io/guides/disassemble/) till step 5. Do not remove the LED diffuser (step 6) nor the dial and button (step 7) unless you want to change those parts to your preferred  color.

### Reassembling as TagTuner
Use [this guide](https://voice-pe.home-assistant.io/guides/reassemble/) starting from step 4: mount everything in your new enclosure. At step 5, connect Grove cable to the bottom port on the main board before mounting it - we want the Grove cable to stay inside.

![61F25723-1D0F-440A-8AEC-C93E8D3D49ED](https://github.com/user-attachments/assets/11ae2deb-b6e6-4aff-a39c-32b312fc7f8f)

Mount the main board and then the NFC reader on the upper-right screw and connect Grove cable. Check black GND wire.

Everything will fit into the new enclosure with same mount points as original.

![IMG_2968](https://github.com/user-attachments/assets/ba3e46d3-accf-408b-8471-ecc014d5d878)

Reuse all black screws or use M2.5 screws except for the speaker.

### Firmware options

- [quick start](https://luka6000.github.io/TagTuner/#installation): use pre-built firmware with [ESP Web Tools](https://esphome.github.io/esp-web-tools/) powered installer [here](https://luka6000.github.io/TagTuner/#installation)
- [tagtuner-on-ha-voice-pe.yaml](https://github.com/luka6000/TagTuner/blob/main/tagtuner-on-ha-voice-pe.yaml): TagTuner riding on HA Voice PE Grove port

[Usage scenarios](https://luka6000.github.io/TagTuner/#using-tagtuner) are exactly the same as the original D1-Custom solution. \
Without nfc tag, HA Voice PE works exactly as you'd expect. \
When you place any nfc tag on the device, TagTuner takes over the dial and button: \
**Button** \
Single click: next \
Double click: play/pause \
Long click (>1s): mute/unmute \
Triple click: previous

**Volume control** \
Rotate the dial left: volume down \
Rotate the dial right: volume up \
LED ring is showing Voice assistant volume.

**Button hold and dial rotate**: change volume of the Voice assistant

## Disclaimer
All of this is my personal hobby project, available for free download and personal use. If you’d like to support me with a coffee, beer, filament, or electronic parts, feel free to use [paypal.me/lukagra](https://paypal.me/lukagra) or [ko-fi.com/lukagra](https://ko-fi.com/lukagra)

Links to parts listed above are affiliate links, which allow me to earn a small commission from your purchase. Thank you! 🙏

This work, including yaml files, 3d model (Atom version) and documentation, is licensed under \
[Creative Commons (4.0 International License) Attribution—Noncommercial—Share Alike \
<img width="100" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png">](http://creativecommons.org/licenses/by-nc-sa/4.0/)

ESPhome components modifications are licensed under ESPHome [license](https://github.com/esphome/esphome?tab=License-1-ov-file#readme)
