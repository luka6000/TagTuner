# TagTuner write extension

This extension aims to provide a simple and efficient way to write tags for TagTuner application.

## How to use it ?

1. Enable web-api in your TagTuner yaml file 
   ```yaml
    web_server:
      port: 80
   ```

2. Clone this repository or download the chrome folder.
3. Load this directory in your browser as an unpacked extension.
4. Open the extension popup and enter the URL of your device instance.
5. Just click on extension's icon and it will try to write a tag from current tab.

## How to contribute ?

You can add more music providers in `music-providers.js` file.