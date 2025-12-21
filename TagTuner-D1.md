## Build your own TagTuner with D1 mini

Custom model cases are print-ready

- [printables](https://www.printables.com/model/1109660-tagtuner-d1-custom1)
- [ko-fi/shop](https://ko-fi.com/s/ce428ab53f)

Choose and print your enclosure with preferred colors and surface patterns
![A4334D41-580B-43D2-9B9E-4769A9EE2630_1_105_c](https://github.com/user-attachments/assets/a507ec1a-55a8-4e1c-a4b2-368f907f073b)

I suggest a cool-white (signal white) base and a dark front plate with a nice carbon fibre pattern.
![D7EFA920-1D9A-4D65-AD23-4F0A2328A510_1_105_c](https://github.com/user-attachments/assets/ea6c62d3-68ee-47b1-8d40-b381910d00c3)

### Parts for D1-Custom version
- [esp32 D1 mini](https://s.click.aliexpress.com/e/_DkyEAwt) controller with USBC
- [pn532](https://s.click.aliexpress.com/e/_c3l9MKHr) NFC reader
- [grove angle connectors](https://s.click.aliexpress.com/e/_c3xcepEd)
- [grove cables](https://s.click.aliexpress.com/e/_c3rtIVGR)
- [hw040](https://s.click.aliexpress.com/e/_c3vSH4wJ) rotary encoder
- [dupont cables](https://s.click.aliexpress.com/e/_c4FUMZi7) for hw040
- [M2.5 10mm](https://s.click.aliexpress.com/e/_c3gFU5Zv) screws

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

## Disclaimer
All of this is my personal hobby project, available for free download and personal use. If you’d like to support me with a coffee, beer, filament, or electronic parts, feel free to use [paypal.me/lukagra](https://paypal.me/lukagra) or [ko-fi.com/lukagra](https://ko-fi.com/lukagra)

Links to parts listed above are affiliate links, which allow me to earn a small commission from your purchase. Thank you! 🙏

This work, including yaml files, 3d model (Atom version) and documentation, is licensed under \
[Creative Commons (4.0 International License) Attribution—Noncommercial—Share Alike \
<img width="100" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png">](http://creativecommons.org/licenses/by-nc-sa/4.0/)

ESPhome components modifications are licensed under ESPHome [license](https://github.com/esphome/esphome?tab=License-1-ov-file#readme)