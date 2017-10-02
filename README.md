usb-relay-hid-node-js
=============

This project provides open-source JavaScript API for low-cost USB HID relays.

It is based on the following project:
(https://github.com/pavel-a/usb-relay-hid)
(http://vusb.wikidot.com/project:driver-less-usb-relays-hid-interface)


API
-----------

#### api.init() 

Initialize the USB Relay Library






##### Returns


- `number`  returns 0 on success and -1 on error.



#### api.exit() 

Finalize the USB Relay Library.
This function frees all of the static data associated with USB Relay Library.
It should be called at the end of execution to avoid memory leaks.






##### Returns


- `number`  returns 0 on success and -1 on error.



#### api.libVersion() 

Get the library (dll) version






##### Returns


- `TODO`  Lower 16 bits: the library version. Higher bits: undefined, ignore.



#### api.listDevices() 

Get the list of available devices






##### Returns


- `deviceInfo`  List of devices containing devicePtr - pointer to the device, serialNumber - device serial number, type - number of relays



#### api.getDeviceId(devicePtr) 

Get device id




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| devicePtr | `devicePtr`  | pointer to the device | &nbsp; |




##### Returns


- `number`  the ID string of the device.



#### api.getDeviceRelaysNumber(devicePtr) 

Get number of relay channels on the device




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| devicePtr | `devicePtr`  | pointer to the device | &nbsp; |




##### Returns


- `number`  number of available relay channels



#### api.openDeviceWithSerial(serialNumber) 

Open device that serial number is serialNumber




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| serialNumber | `string`  | device serial number | &nbsp; |




##### Returns


- `deviceHandler`  returns a valid handle to the device on success or NULL on failure



#### api.openDevice(devicePtr) 

Open a USB relay device




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| devicePtr | `devicePtr`  | pointer to the device | &nbsp; |




##### Returns


- `deviceHandler`  returns a valid handle to the device on success or NULL on failure.



#### api.closeDevice(deviceHandler) 

Close a USB relay device




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| deviceHandler | `deviceHandler`  | device handler which usb relay device your want to operate | &nbsp; |




##### Returns


-  TODO



#### api.openChannel(deviceHandler, channelNumber) 

Turn ON a relay channel on the USB-Relay-Device




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| deviceHandler | `deviceHandler`  | device handler which usb relay device your want to operate | &nbsp; |
| channelNumber | `channelNumber`  | the channel number: 1...max | &nbsp; |




##### Returns


- `number`  0 -- success; 1 -- error; 2 -- index is invalid



#### api.closeChannel(deviceHandler, channelNumber) 

Turn OFF a relay channel on the USB-Relay-Device




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| deviceHandler | `deviceHandler`  | device handler which usb relay device your want to operate | &nbsp; |
| channelNumber | `number`  | the channel number: 1...max | &nbsp; |




##### Returns


- `number`  0 -- success; 1 -- error



#### api.openAllChannels(deviceHandler) 

Turn ON all relay channels on the USB-Relay-Device




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| deviceHandler | `deviceHandler`  | device handler which usb relay device your want to operate | &nbsp; |




##### Returns


- `number`  0 -- success; 1 -- error



#### api.closeAllChannels(deviceHandler) 

Turn OFF all relay channels on the USB-Relay-Device




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| deviceHandler | `deviceHandler`  | device handler which usb relay device your want to operate | &nbsp; |




##### Returns


- `number`  0 -- success; 1 -- error



#### api.getStatus() 

Get state of all channels of the  USB-Relay-Device




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
|  | `deviceHandler`  |  | &nbsp; |




##### Returns


-  TODO

