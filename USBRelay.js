var USBRelay = (function(api){	
	const {exec} = require('child_process');
	let ref = require('ref');
	let ffi = require('ffi');
		
	let usbLib = ffi.Library(__dirname + '\\USB_RELAY_DEVICE_64.dll', {
		'usb_relay_init': ['int', []],
		'usb_relay_exit': ['int', []],
		'usb_relay_device_lib_version': ['int', []],
		'usb_relay_device_enumerate': ['pointer', []],
		'usb_relay_device_open_with_serial_number': ['pointer', ['string','int']],
		'usb_relay_device_open': ['pointer', ['pointer']],
		'usb_relay_device_close': ['void', ['pointer']],
		'usb_relay_device_open_one_relay_channel' : ['int', ['pointer', 'int']],
		'usb_relay_device_close_one_relay_channel' : ['int', ['pointer', 'int']],
		'usb_relay_device_open_all_relay_channel' : ['int', ['pointer']],
		'usb_relay_device_close_all_relay_channel' : ['int', ['pointer']],		
		'usb_relay_device_get_id_string' : ['pointer', ['pointer']],
		'usb_relay_device_next_dev' : ['pointer', ['pointer']],
		'usb_relay_device_get_num_relays' : ['int', ['pointer']],
		'usb_relay_device_get_status_bitmap' : ['int', ['pointer']]
	});
	
	function buildDeviceObject(devicePtr){
		return {
				devicePtr: devicePtr,
				serialNumber: api.getDeviceId(devicePtr),
				type: api.getDeviceRelaysNumber(devicePtr)
			}
	}

    /**
	 * Initialize the USB Relay Library
     * @returns {number} returns 0 on success and -1 on error.
     */
	api.init = function(){
		return usbLib.usb_relay_init();
	}

    /**
	 * Finalize the USB Relay Library.
     * This function frees all of the static data associated with USB Relay Library.
     * It should be called at the end of execution to avoid memory leaks.
     * @returns {number} returns 0 on success and -1 on error.
     */
	api.exit = function(){
		return usbLib.usb_relay_exit;
	}

    /**
	 * Get the library (dll) version
     * @returns {TODO} Lower 16 bits: the library version. Higher bits: undefined, ignore.
     */
	api.libVersion = function(){
		return usbLib.usb_relay_device_lib_version;
	}

    /**
	 * Get the list of available devices
     * @returns {deviceInfo} List of devices containing devicePtr - pointer to the device, serialNumber - device serial number, type - number of relays
     */
	api.listDevices = function(){
		let list = [];
		let head = usbLib.usb_relay_device_enumerate();
		let elemPtr = head;
		while(!elemPtr.isNull()){
			list.push(buildDeviceObject(elemPtr));
			elemPtr = usbLib.usb_relay_device_next_dev(elemPtr)
		}
		return list;
	};

    /**
	 * Get device id
     * @param {devicePtr} devicePtr pointer to the device
     * @returns {number} the ID string of the device.
     */
	api.getDeviceId = function(devicePtr){
		let idPtr =  usbLib.usb_relay_device_get_id_string(devicePtr)
		if(!idPtr.isNull()){
			return idPtr.readCString();
		}
		return null;
	}

    /**
	 * Get number of relay channels on the device
     * @param {devicePtr} devicePtr pointer to the device
     * @returns {number} number of available relay channels
     */
	api.getDeviceRelaysNumber = function(devicePtr){
		return usbLib.usb_relay_device_get_num_relays(devicePtr)
	}

    /**
	 * Open device that serial number is serialNumber
     * @param {string} serialNumber device serial number
     * @returns {deviceHandler} returns a valid handle to the device on success or NULL on failure
     */
	api.openDeviceWithSerial = function(serialNumber){
		return usbLib.usb_relay_device_open_with_serial_number(serialNumber, serialNumber.length);
	}

    /**
	 * Open a USB relay device
     * @param {devicePtr} devicePtr pointer to the device
     * @returns {deviceHandler} returns a valid handle to the device on success or NULL on failure.
     */
	api.openDevice = function(devicePtr){
		return usbLib.usb_relay_device_open(devicePtr);
	}

    /**
	 * Close a USB relay device
     * @param {deviceHandler} deviceHandler device handler which usb relay device your want to operate
     * @returns TODO
     */
	api.closeDevice = function(deviceHandler){
		return usbLib.usb_relay_device_close(deviceHandler);
	}

    /**
	 * Turn ON a relay channel on the USB-Relay-Device
     * @param {deviceHandler} deviceHandler device handler which usb relay device your want to operate
     * @param {channelNumber} channelNumber the channel number: 1...max
     * @returns {number} 0 -- success; 1 -- error; 2 -- index is invalid
     */
	api.openChannel = function(deviceHandler, channelNumber){
		return usbLib.usb_relay_device_open_one_relay_channel(deviceHandler, channelNumber)
	}

    /**
     * Turn OFF a relay channel on the USB-Relay-Device
     * @param {deviceHandler} deviceHandler device handler which usb relay device your want to operate
	 * @param {number} channelNumber the channel number: 1...max
     * @returns {number} 0 -- success; 1 -- error
     */
	api.closeChannel = function(deviceHandler, channelNumber){
		return usbLib.usb_relay_device_close_one_relay_channel(deviceHandler, channelNumber)
	}

    /**
	 * Turn ON all relay channels on the USB-Relay-Device
     * @param {deviceHandler} deviceHandler device handler which usb relay device your want to operate
     * @returns {number} 0 -- success; 1 -- error
     */
	api.openAllChannels = function(deviceHandler){
		return usbLib.usb_relay_device_open_all_relay_channel(deviceHandler);
	}

    /**
     * Turn OFF all relay channels on the USB-Relay-Device
     * @param {deviceHandler} deviceHandler device handler which usb relay device your want to operate
     * @returns {number} 0 -- success; 1 -- error
     */
	api.closeAllChannels = function(deviceHandler){
		return usbLib.usb_relay_device_close_all_relay_channel(deviceHandler);
	}

    /**
	 * Get state of all channels of the  USB-Relay-Device
     * @param {deviceHandler}
     * @returns TODO
     */
	api.getStatus = function(deviceHandler){
		return usbLib.usb_relay_device_get_status_bitmap(deviceHandler);
	}
	
	return api;

})(USBRelay || {});

module.exports = USBRelay;