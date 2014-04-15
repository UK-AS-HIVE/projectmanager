var page = require('webpage').create(),
    system = require('system'),
    address, output;
var fs = require('fs');

page.viewportSize = { width: 640, height: 480 };
//page.clipRect = {top:0, left: 0, width: 640, height: 480 };

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0';

console.log("starting screencapture script")

if (system.args.length!=3)
{
	console.log("Please enter the arguments as follows: url locationToSaveFile");
	phantom.exit(1);
}


else{
	address = system.args[1];
	output = system.args[2];
}

if (address.substring(0,7)!='http://')
	{
		address = "http://" + address;
	}

console.log("URL: " + address);
console.log("Output File: " + output);


page.open(address, function() {
//  page.clipRect = { left: 0, top: 0, width: size.width, height: size.height };
  page.render(output);
  console.log("Done");
  phantom.exit();
});