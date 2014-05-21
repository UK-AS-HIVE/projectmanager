var page = require('webpage').create(),
    system = require('system'),
    address, output;
var fs = require('fs');

page.viewportSize = { width: 800, height: 600 };
//page.clipRect = {top:0, left: 0, width: 640, height: 480 };

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0';


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



page.open(address, function() {
  page.render(output);
  phantom.exit();
});