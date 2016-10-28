//'use strict'

//var _nodemcutool = require('nodemcu-tool');
const remote = require('electron').remote;
var _connector = require('nodemcu-tool').Connector;
var _serialport = require('serialport');
var y=0; //dummy variable.



$('#openPort').click(function(e){
  var Port;
  var baud;
  var Baud;
  Port =$('#portBtn').html();
  baud=$('#baudBtn').html();
  if(baud=='Select Baud'){
    alert("Error! Select Baud!");
  }else{
    baud = baud.split(' '); //to remove the bps
    Baud=baud[0];    //from the baud
  }

  if(Port=='Select Port'){
    alert("Error! Please select a port");
  }else{
    if(Baud){
      if(y==0){
        $('#terminal').append('<strong>Opening Port...</strong></br>');
        y++;
      }
      $('#terminal').scrollTop($('#terminal').prop("scrollHeight")); //scroll to bottom of terminal div
    //create connection
    var device = new _serialport.SerialPort(Port, {
        baudrate: Baud,
        parser: _serialport.parsers.readline('\n')
    }, false);

    //on Error connecting

    device.on('error', function(error){
        // proxy
        if(error){
          alert('device.on.error'+error);
          $('#terminal').append('<strong>Port could not be opened</strong></br>');
          $('#terminal').scrollTop($('#terminal').prop("scrollHeight")); //scroll to bottom of terminal div
        }
        if (device.isOpen()){
            device.close();
        }
  });


    //on receiving data
    var dataOut;
    dataOut=''; //input to computer stream || stdout
    device.on('data', function(input){
        //cb(null,input); //made changes
        //formating data for html {if there is no new line then it will create a problem}
        //process.stdout.write(input); //log to the terminal
        $('#terminal').append('</br>'+input);
        $('#terminal').scrollTop($('#terminal').prop("scrollHeight")); //scroll to bottom of terminal div
    });

    //on sending data
    device.open(function(error){
        if (error){
          alert('device.open'+error);
        }else{
            // prepare
            //process.stdin.setRawMode(true);
            $('#openPort').html('Close');
            process.stdin.setEncoding('utf8');
            $('#terminal').append('<strong>Port Opened!</strong></br>');
            $('#terminal').scrollTop($('#terminal').prop("scrollHeight")); //scroll to bottom of terminal div
            if(y==1){device.write('node.restart()\n');y++;} //automatically restart
          }
    });


      $('#cmdForm').submit(function(e) {
            e.preventDefault();
            var cmd;
            cmd=$('#cmdInput').val();
            //$('#terminal').append('!>'+cmd+'</br>');
            $('#cmdInput').val('');
            device.write(cmd+'\n');
            $('#terminal').scrollTop($('#terminal').prop("scrollHeight")); //scroll to bottom of terminal div
      });

      //Restart Manually
      $('#reset').click(function(e){
        e.preventDefault();
        device.write('node.restart()\n');
      });

      //device Info
      $('#devInfo').click(function(e){
        e.preventDefault();
        device.write('node.info()\n');
      });

      //FileSystem Info
      $('#fsinfo').click(function(e){
        e.preventDefault();
        device.write('file.fsinfo()\n');
        device.write('file.list()\n');
      });

      //IP Address
      $('#ipAdd').click(function(e){
        e.preventDefault();
        device.write('print(wifi.sta.getip())\n');
      });

      //Run init.lua
      $('#initLua').click(function(e){
        e.preventDefault();
        device.write('dofile("init.lua")\n');
      });

      }
    }
});
