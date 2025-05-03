## Build your own TagTuner with m5stack Atom
- [3d models](https://github.com/luka6000/TagTuner/tree/main/3d%20models): Atom Echo Grove version 3d models

Print your enclosure with preffered colors and surface patterns
![B71AED4C-08D7-4F52-AC81-285DC6743BAC](https://github.com/user-attachments/assets/35055b52-55a9-4207-9440-7b8cfff1b8df)

![150898D9-AA77-4470-9DA3-2A89EE304011](https://github.com/user-attachments/assets/d036c021-b2bc-496b-a427-b9ae3361d691)

I suggest a cool-white (signal white) base and a dark front plate with a nice carbon fibre pattern.

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
Remember to set the DIP switches to 10 to enable I2C. Correct position for I2c is marked by yellow lines.

The [SeeedStudio rotary encoder](https://www.seeedstudio.com/Grove-Encoder.html?sensecap_affiliate=3ftNV1d&referring_service=link) already has its connector. For the other end of the [cable](https://s.click.aliexpress.com/e/_DEA2jSV), simply use [grove angle connector](https://s.click.aliexpress.com/e/_DDF07mN) directly to the Atom controller\
![7D603FCA-9D48-485F-8AD4-685A469D73F6_1_201_a](https://github.com/user-attachments/assets/3f0e609b-15c2-43da-9a52-8e30b831a6ef)

It's really as simple as that
![8CD41A9B-E7F6-46FE-8770-5138BF0B893E_1_201_a](https://github.com/user-attachments/assets/a2f7ff86-7c88-4d17-807e-382d4e55d938)

Everything will fit into the enclosure.\
Use short (<5mm) M2 screw for Atom and longer (10mm) M2.5 screws for everything else (nfc board, volume encoder, front plate).
![BD16EF90-5222-40EF-A131-2C27C6EE5493_1_102_o](https://github.com/user-attachments/assets/3339c19f-d8e6-4a7f-83e1-4b611bee51d4)

### Firmware options

- [quick start](https://luka6000.github.io/TagTuner/#installation): use pre-built firmware with [ESP Web Tools](https://esphome.github.io/esp-web-tools/) powered installer [here](https://luka6000.github.io/TagTuner/#installation)
- [tagtuner-atom-grove-ble.yaml](https://github.com/luka6000/TagTuner/blob/main/tagtuner-atom-grove-ble.yaml): m5stack Atom Echo grove connectors + Bluetooth & BLE proxy, ESP-IDF framework

## Disclaimer
All of this is my personal hobby project, available for free download and personal use. If you’d like to support me with a coffee, beer, filament, or electronic parts, feel free to use [paypal.me/lukagra](https://paypal.me/lukagra) or [ko-fi.com/lukagra](https://ko-fi.com/lukagra)

Links to parts listed above are affiliate links, which allow me to earn a small commission from your purchase. Thank you! 🙏

This work, including yaml files, 3d model (Atom version) and documentation, is licensed under \
[Creative Commons (4.0 International License) Attribution—Noncommercial—Share Alike \
<img width="100" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png">](http://creativecommons.org/licenses/by-nc-sa/4.0/)

ESPhome components modifications are licensed under ESPHome [license](https://github.com/esphome/esphome?tab=License-1-ov-file#readme)
