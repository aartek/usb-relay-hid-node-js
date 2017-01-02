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
	
	api.init = function(){
		return usbLib.usb_relay_init();
	}
	
	api.exit = function(){
		return usbLib.usb_relay_exit;
	}
	
	api.libVersion = function(){
		return usbLib.usb_relay_device_lib_version;
	}
	
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
	
	api.getDeviceId = function(devicePtr){
		let idPtr =  usbLib.usb_relay_device_get_id_string(devicePtr)
		if(!idPtr.isNull()){
			return idPtr.readCString();
		}
		return null;
	}
	
	api.getDeviceRelaysNumber = function(devicePtr){
		return usbLib.usb_relay_device_get_num_relays(devicePtr)
	}
	
	api.openDeviceWithSerial = function(serialNumber){
		return usbLib.usb_relay_device_open_with_serial_number(serialNumber, serialNumber.length);
	}
	
	api.openDevice = function(devicePtr){
		return usbLib.usb_relay_device_open(devicePtr);
	}
	
	api.closeDevice = function(deviceHandler){
		return usbLib.usb_relay_device_close(deviceHandler);	
	}
	
	api.openChannel = function(deviceHandler, channelNumber){
		return usbLib.usb_relay_device_open_one_relay_channel(deviceHandler, channelNumber)
	}
	
	api.closeChannel = function(deviceHandler, channelNumber){
		return usbLib.usb_relay_device_close_one_relay_channel(deviceHandler, channelNumber)
	}
	
	api.openAllChannels = function(deviceHandler){
		return usbLib.usb_relay_device_open_all_relay_channel(deviceHandler);
	}

	api.closeAllChannels = function(deviceHandler){
		return usbLib.usb_relay_device_close_all_relay_channel(deviceHandler);
	}
	
	api.getStatus = function(deviceHandler){
		return usbLib.usb_relay_device_get_status_bitmap(deviceHandler);
	}
	
	return api;

})(USBRelay || {});

module.exports = USBRelay;