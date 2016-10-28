![http://thenexio.com](http://thenexio.com/sites/all/themes/nexio/images/logo.png)
# **NexIDE v0.8-BETA** #
An IDE based on Electron for the Internet of Things.
http://thenexio.com

[![Website](https://img.shields.io/badge/website-NexIO-blue.svg)](http://thenexio.com)
![Current Version](https://img.shields.io/badge/version-0.8--BETA-yellow.svg)
![Build Status](https://img.shields.io/badge/build-Passing-green.svg)
[![License](https://img.shields.io/badge/license-GPLv3.0-blue.svg)](https://github.com/rgujju/NexIDE/blob/master/LICENSE)

### An IDE for programming in NodeMCU and Arduino

NexIDE is an IDE in which you can program in [NodeMCU](https://github.com/nodemcu/nodemcu-firmware) or [Arduino core for ESP](https://github.com/esp8266/Arduino).
You can upload the code to your [NexBrd](http://thenexio.com/nexbrd) or any other ESP12 based boards.

![Preview](http://thenexio.com/sites/all/themes/nexio/images/NexIDE_1.png)


# Features

- Combined NodeMCU and Arduino programming
- Inbuilt Firmware building capability
- Inbuilt Serial Terminal
- Upload files to Board (OTA coming soon)
- Upload custom firmware directly from the IDE

# Requirements
  Intstalling of these components in mandatory
  - [Electron](https://github.com/electron/electron)
  - unrar
  - GNU autoconf, automake, libtool
  - GNU gcc, g++, make
  - GNU flex, bison, gawk, sed
  - python, python-serial, libexpat-dev
  - srecord

# Build instructions:
You need follow these instructions exactly:
```sh
git clone --recursive https://github.com/pfalcon/esp-open-sdk.git /opt/esp-open-sdk
cd /opt/esp-open-sdk
make STANDALONE=y
```
ADD ```/opt/esp-open-sdk/xtensa-lx106-elf/bin``` to your /etc/environment file.
ADD your User to the dialout group to get access to the USB from the IDE.

You need to install [Electron](https://github.com/electron/electron) and use this app or you can download a packaged app from here: [NexIDE](http://thenexio.com/nexide)

# License

[GPLv3.0](https://github.com/rgujju/NexIDE/blob/master/LICENSE) © [thenexio.com](http://thenexio.com/)

# Credits
- [NodeMCU](https://github.com/nodemcu/nodemcu-firmware)
- [Arduino Core](https://github.com/esp8266/Arduino)
- [NodeMCU-tool](https://github.com/andidittrich/NodeMCU-Tool)
- [ACE](https://ace.c9.io/#nav=about)
