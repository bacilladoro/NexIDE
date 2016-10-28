//'use strict'
var _serialport = require('serialport');


function getPortsList(cb){
    // get all available serial ports
    _serialport.list(function (err, ports){
        // error occurred ?
        if (err){
            cb(err);
            return;
        }

        // default condition
        ports = ports || [];

            // filter by vendorIDs
            // CH341 Adapter | 0x1a86  QinHeng Electronics
            // CP2102 Adapter | 0x10c4  Cygnal Integrated Products, Inc
            //NexBrd v0.1- PL2303 Adapter | 0x067b Prolific Technologies
            ports = ports.filter(function(item){
               return (item.vendorId == '0x1a86' || item.vendorId == '0x10c4' || item.vendorId == '0x067b');
            });

            //refresh the device list
            for (var i = 0; i <= 5; i++) {
              $('#dev'+i).html('');
              if($('#dev'+i).css('display')=='block'){
                $('#dev'+i).css('display','none');
              }
              $('#portBtn').html('Select Port');

            }

            var x=0;
            //console.log(ports); //for debugging
            while(ports[x]){
            //cb(null,ports[x].comName);

              $('#dev'+x).html(ports[x].comName+' '+ports[x].manufacturer);
              if($('#dev'+x).css('display')=='none'){
                $('#dev'+x).css('display','block');
              }
              x++;
            }

    });

};
//to get ports list
$('#portBtn').click(function(){
  getPortsList(function(){});
});

//to get the port name
$(".devClass").click(function(e){
  var val;
  var val2;
  var port;
  val = $(this).html();
  val2= val.split(' ');
  port = val2[0];
  $('#portBtn').html(port);
});

//to get Baud rate

  $('.baudClass').click(function(){
    var id;
    var baudRate;
    id = $(this).attr('id');
    baudRate=$('#'+id).html();
    $('#baudBtn').html(baudRate+' bps');
  });
