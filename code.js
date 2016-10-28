const {dialog} = require('electron').remote;  //open a open dialog box
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
var editor1 = ace.edit("editor1");// Ace code editor
editor1.setTheme("ace/theme/clouds"); //themes
editor1.session.setMode("ace/mode/lua");//lua syntax highlighting
$('#editor1').css('font-size','15px');

var editor2 = ace.edit("editor2");// Ace code editor
editor2.setTheme("ace/theme/clouds"); //themes
editor2.session.setMode("ace/mode/lua");//lua syntax highlighting
$('#editor2').css('font-size','15px');

var editor3 = ace.edit("editor3");// Ace code editor
editor3.setTheme("ace/theme/clouds"); //themes
editor3.session.setMode("ace/mode/lua");//lua syntax highlighting
$('#editor3').css('font-size','15px');
//editor3.session.setMode("ace/mode/c_cpp");//C cpp Syntax highlighting

var _nodemcutool = require('nodemcu-tool');
var x=2; //number for editors
var dummy = 0;

//open file
function openFile () {
  if(x<4){
    dialog.showOpenDialog({ filters: [
    {name : 'Lua File', extensions:['lua']},
    { name: 'text', extensions: ['txt'] },
    { name: 'Arduino', extensions: ['ino'] }
    ]}, function (fileNames) {
    if (fileNames === undefined) return;
    var fileName = fileNames[0];
    //console.log(fileName); //for debugging
      fs.readFile(fileName, 'utf-8', function (err, data) {
        console.log(fileName);
        addTabs();
        a=  $("li").filter('.active').attr('id');
        a.toString();
        var editorVal = a.charAt(8);
        fileExtension = path.basename(fileName).split('.')[1];
        if(editorVal==1){
          editor1.setValue(data);
          $("#editor1Span").html(path.basename(fileName));
          $("#editor1SpanFull").html(fileName);
          if(fileExtension=='ino'){editor1.session.setMode("ace/mode/c_cpp");}else{editor1.session.setMode("ace/mode/lua");}
        }
        if(editorVal==2){
          editor2.setValue(data);
          $("#editor2Span").html(path.basename(fileName));
          $("#editor2SpanFull").html(fileName);
          if(fileExtension=='ino'){editor2.session.setMode("ace/mode/c_cpp");}else{editor2.session.setMode("ace/mode/lua");}
        }
        if(editorVal==3){
          editor3.setValue(data);
          $("#editor3Span").html(path.basename(fileName));
          $("#editor3SpanFull").html(fileName);
          if(fileExtension=='ino'){editor3.session.setMode("ace/mode/c_cpp");}else{editor3.session.setMode("ace/mode/lua");}
        }
      });
    });
  }else{
    alert("Cannot open more tabs! We are working on it.")
  }
};

//save file
function saveFile () {
  dummy=0;
  aSaveFile=  $("li").filter('.active').attr('id');
  aSaveFile.toString();
  var editorValSaveFile = aSaveFile.charAt(8);

  if($("#editor"+editorValSaveFile+"SpanFull").html()=='untitled'){
    dialog.showSaveDialog({ filters: [
        { name: 'Lua file', extensions: ['lua'] },
       { name: 'text', extensions: ['txt'] },
       { name: 'Arduino', extensions: ['ino'] }
      ]}, function (fileName) {
      if (fileName === undefined) return;

      if(editorValSaveFile==1){
        fs.writeFile(fileName, editor1.getValue(), function (err) {

          if(err){console.log(error)}else {
            $("#editor1Span").html(path.basename(fileName));
            $("#editor1SpanFull").html(fileName);
          };
        });
      }

      if(editorValSaveFile==2){
        fs.writeFile(fileName, editor2.getValue(), function (err) {

          if(err){console.log(error)}else {
            $("#editor2Span").html(path.basename(fileName));
            $("#editor2SpanFull").html(fileName);
          };
        });
      }

      if(editorValSaveFile==3){
        fs.writeFile(fileName, editor3.getValue(), function (err) {

          if(err){console.log(error)}else {
            $("#editor3Span").html(path.basename(fileName));
            $("#editor3SpanFull").html(fileName);
          };
        });
      }
    });
  }else{
    fileNameSave = $("#editor"+editorValSaveFile+"SpanFull").html();
    if(editorValSaveFile==1){
      fs.writeFile(fileNameSave, editor1.getValue(), function (err) {

        if(err){console.log(error)}else {
          $("#editor1Span").html(path.basename(fileNameSave));
          $("#editor1SpanFull").html(fileNameSave);
        };
      });
    }

    if(editorValSaveFile==2){
      fs.writeFile(fileNameSave, editor2.getValue(), function (err) {

        if(err){console.log(error)}else {
          $("#editor2Span").html(path.basename(fileNameSave));
          $("#editor2SpanFull").html(fileNameSave);
        };
      });
    }

    if(editorValSaveFile==3){
      fs.writeFile(fileNameSave, editor3.getValue(), function (err) {

        if(err){console.log(error)}else {
          $("#editor3Span").html(path.basename(fileNameSave));
          $("#editor3SpanFull").html(fileNameSave);
        };
      });
    }
  }
}

$('#open').click(function(e){
  openFile();
  console.log(x);
});

$('#save').click(function(e){
  saveFile();
});

//On Change
editor1.getSession().on('change', function(e) {
  if(dummy==0){
    $("#editor1Span").append('*');
    dummy=1;
  }
});
editor2.getSession().on('change', function(e) {
  if(dummy==0){
    $("#editor2Span").append('*');
    dummy=1;
  }
});
editor3.getSession().on('change', function(e) {
  if(dummy==0){
    $("#editor3Span").append('*');
    dummy=1;
  }
});
//-------//

// for uploading

$("#upload").click(function(){
  aUploadFile=  $("li").filter('.active').attr('id');
  aUploadFile.toString();
  var editorValUploadFile = aUploadFile.charAt(8);

  var port;
  port =$('#portBtn').html();
  if(port=='Select Port'){
    alert("Error! Please select a port");
  }else{
    if(editorValUploadFile==1){
      file=$("#editor1SpanFull").html();
      if(file=='untitled'){
        saveFile();
        file=$("#editor1SpanFull").html();
      }
  }
    if(editorValUploadFile==2){
      file=$("#editor2SpanFull").html();
      if(file=='untitled'){
        saveFile();
        file=$("#editor2SpanFull").html();
      }
  }
    if(editorValUploadFile==3){
      file=$("#editor3SpanFull").html();
      if(file=='untitled'){
        saveFile();
        file=$("#editor3SpanFull").html();
      }
  }
    console.log(file);
    fileToUpload=path.basename(file);
    fileExtension=fileToUpload.split('.')[1];
    fileName=fileToUpload.split('.')[0];
    if(fileExtension=='ino'){
      makeFile = fs.readFileSync(__dirname+'/utils/makeEspArduino/makeEspArduino.mk', 'utf-8')
      makeFile.toString();
      if(editorValUploadFile==1){fileUpload = $("#editor1SpanFull").html();}
      if(editorValUploadFile==2){fileUpload = $("#editor2SpanFull").html();}
      if(editorValUploadFile==3){fileUpload = $("#editor3SpanFull").html();}
      //libraries='$(PWD)/utils/makeEspArduino/esp8266/libraries/Wire \\\r\n  $(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n  $(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266mDNS \\\r\n  $(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WebServer'
      //librayDir='$(PWD)/utils/makeEspArduino/esp8266/libraries/';
      inoFile=fs.readFileSync(file,'utf-8');
      libraries='$(PWD)/utils/makeEspArduino/esp8266/libraries/Wire \\\r\n '
      if(inoFile.search('#include <ArduinoOTA.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ArduinoOTA \\\r\n '
      }
      if(inoFile.search('#include <ESP8266WiFi.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <ESP8266HTTPClient.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266HTTPClient \\\r\n '
      }
      if(inoFile.search('#include <DNSServer.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/DNSServer \\\r\n '
      }
      if(inoFile.search('#include <ESP8266mDNS.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266mDNS \\\r\n '
      }
      if(inoFile.search('#include <ESP8266WiFiMulti.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <ESP8266WiFiAP.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <ESP8266WiFiGeneric.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <ESP8266WiFiScan.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <ESP8266WiFiSTA.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <WiFiUdp.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <ESP8266WiFiType.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <WiFiClient.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <WiFiClientSecure.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <WiFiServer.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFi \\\r\n '
      }
      if(inoFile.search('#include <ESP8266WebServer.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WebServer \\\r\n '
      }
      if(inoFile.search('#include <ESP8266AVRISP.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266AVRISP \\\r\n '
      }
      if(inoFile.search('#include <ESP8266httpUpdate.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266httpUpdate \\\r\n '
      }
      if(inoFile.search('#include <ESP8266HTTPUpdateServer.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266HTTPUpdateServer \\\r\n '
      }
      if(inoFile.search('#include <ESP8266SSDP.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266SSDP \\\r\n '
      }
      if(inoFile.search('#include <ESP8266WiFiMesh.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266WiFiMesh \\\r\n '
      }
      if(inoFile.search('#include <EEPROM.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/EEPROM \\\r\n '
      }
      if(inoFile.search('#include <Ethernet.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/Ethernet \\\r\n '
      }
      if(inoFile.search('#include <Hash.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/Hash \\\r\n '
      }
      if(inoFile.search('#include <SPI.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/SPI \\\r\n '
      }
      if(inoFile.search('#include <SD.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/SD \\\r\n '
      }
      if(inoFile.search('#include <Servo.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/servo \\\r\n '
      }
      if(inoFile.search('#include <TFTv2.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/TFT_Touch_Shield_V2 \\\r\n '
      }
      if(inoFile.search('#include <Ticker.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/Ticker \\\r\n '
      }/*
      if(inoFile.search('#include <ESP8266HTTPClient.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266HTTPClient \\\r\n '
      }
      if(inoFile.search('#include <ESP8266HTTPClient.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266HTTPClient \\\r\n '
      }
      if(inoFile.search('#include <ESP8266HTTPClient.h>')!=-1){
        libraries = libraries+'$(PWD)/utils/makeEspArduino/esp8266/libraries/ESP8266HTTPClient \\\r\n '
      }
      */

      makeFile=makeFile.replace('libraryDirectory',libraries);
      makeFile = makeFile.replace('sketchDirectory',fileUpload+'\n');
      makeFile = makeFile.replace('UploadPort',port);
      fs.writeFileSync(__dirname+'/utils/makeEspArduino/makeFile.mk',makeFile);
      cmd = 'make -f '+__dirname+'/utils/makeEspArduino/makeFile.mk upload';
      fileNameUpload=__dirname+'/projects/'+fileName+'/'+fileName+'.bin';
      console.log(fileNameUpload);
      console.log(cmd);
      alert("Uploading");
      child_process.execSync(cmd,{shell: '/bin/bash'});
      alert("done!");
    }else{
      var files = new Array();
      files[0]=file;
      console.log(files.length);
      $("#uploadProgress").css("width","0");
      $("#uploadProgress").html("0% Completed");
      _nodemcutool.upload(port,"9600",files,{compile:1},function(a,b,c){
        //a keeps changing
        //c value is 1 always
        //b is complete value
        percentComplete = (a/b).toFixed(1)*100;
        $("#uploadProgress").attr('aria-valuenow',percentComplete)
        $("#uploadProgress").css("width",percentComplete+"%");
        $("#uploadProgress").html(percentComplete+"% Completed");
      });

    }
  }
});


function addTabs() {
  if(x<4){
    $("#editorLi"+x).removeClass('hidden');
    $("#editor"+x).removeClass('hidden');
    $("#editor"+x+"Link").click();
    $("#editor"+x+"Span").html("Untitled");
    if(x==1){
      editor1.setValue("");
    }
    if(x==2){
      editor2.setValue("");
      if(!($("#editor3").hasClass('hidden'))){x++}
    }
    if(x==3){
      editor3.setValue("");
    }
    x++;
    console.log(x);
  }else{alert("No more Tabs! we are working on it"); console.log(x);}
}


$("#addTab").click(function(e){
  e.preventDefault();
  addTabs();
});

$(".closeBtn").click(function(e){
  e.preventDefault();
  var a = $(this).parent().parent().attr('id');
  editorNumber=a.charAt(8);
  //console.log(editorNumber);
  $("#editor"+editorNumber).addClass('hidden');
  //console.log(a);
  $("#"+a).addClass('hidden');
  if(editorNumber==3){x=3;}
  if(editorNumber==2){x=2;}
  $("#editor1Link").click();
  $("#editorLi1").click();
  console.log(x);
  console.log(a);
});


    //open terminal
    $("#terminalLink").click(function(e){
      //Communication with main process
      e.preventDefault();
      $("#nav-toggle").toggleClass( "active" );
      $('body').toggleClass('toggled');
      $('.navbar.easy-sidebar').removeClass('toggled');

      ipcRenderer.send('asynchronous-message', 'terminal');
      ipcRenderer.on('asynchronous-reply', function(event, arg){
        console.log(arg);
      });
    });

    $("#terminalLinkIcon").click(function(e){
      //Communication with main process
      e.preventDefault();
      ipcRenderer.send('asynchronous-message', 'terminal');
      ipcRenderer.on('asynchronous-reply', function(event, arg){
        console.log(arg);
      });
    });

    //open terminal
    $("#tutorialLink").click(function(e){
      //Communication with main process
      e.preventDefault();
      $("#nav-toggle").toggleClass( "active" );
      $('body').toggleClass('toggled');
      $('.navbar.easy-sidebar').removeClass('toggled');

      ipcRenderer.send('asynchronous-message', 'tutorial');
      ipcRenderer.on('asynchronous-reply', function(event, arg){
        console.log(arg);
      });
    });

    $("#tutorialLinkIcon").click(function(e){
      //Communication with main process
      e.preventDefault();
      ipcRenderer.send('asynchronous-message', 'tutorial');
      ipcRenderer.on('asynchronous-reply', function(event, arg){
        console.log(arg);
      });
    });

    //open firmware
    $("#firmwareLink").click(function(e){
      //Communication with main process
      e.preventDefault();
      $("#nav-toggle").toggleClass( "active" );
      $('body').toggleClass('toggled');
      $('.navbar.easy-sidebar').removeClass('toggled');

      ipcRenderer.send('asynchronous-message', 'firmware');
      ipcRenderer.on('asynchronous-reply', function(event, arg){
        console.log(arg);
      });
    });

    $("#firmwareLinkIcon").click(function(e){
      //Communication with main process
      e.preventDefault();
      ipcRenderer.send('asynchronous-message', 'firmware');
      ipcRenderer.on('asynchronous-reply', function(event, arg){
        console.log(arg);
      });
    });
    //--------------------------------//

    $("#nav-toggle").click(function(e){
      this.classList.toggle( "active" );
      e.preventDefault();
      $('body').toggleClass('toggled');
      $('.navbar.easy-sidebar').removeClass('toggled');
    });
