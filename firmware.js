'use strict'
const child_process = require('child_process');
const exec = require('child_process').exec;
const fs = require('fs');
var includePath = __dirname + '/firmware/app/include/user_modules.h';
var execPath = __dirname + '/firmware/';
var cmd = 'make -C '+execPath;
var pythonPath= __dirname +'/firmware/tools/esptool.py'
const bin0 = __dirname+'/firmware/bin/0x00000.bin';
const bin1 = __dirname+'/firmware/bin/0x10000.bin';

//var cmd = 'echo $0';
var moduleName;
var replaceContentChecked;
var searchContentChecked;
var replaceContentNotChecked;
var searchContentNotChecked;
//execute external shell commands

var fileData=fs.readFileSync(includePath,"utf8");


$( "input" ).change(function() {
    var checked = $(this).prop( "checked" ) ;
    moduleName = $(this).attr('id');
    if(checked){
      $(".option"+moduleName).addClass('fa-check-square');
      $(".option"+moduleName).removeClass('fa-square');
      replaceContentChecked = " #define LUA_USE_MODULES_"+moduleName;
      searchContentChecked = " //#define LUA_USE_MODULES_"+moduleName;
      //console.log(defineString);
      //search_content = search_content.replace(/([.?&;*+^$[\]\\(){}|-])/g, "\\$1");//improve
      searchContentChecked = new RegExp(searchContentChecked);
      fileData = fileData.replace(searchContentChecked, replaceContentChecked);
    }else{
      $(".option"+moduleName).addClass('fa-square');
      $(".option"+moduleName).removeClass('fa-check-square');
      replaceContentNotChecked = " //#define LUA_USE_MODULES_"+moduleName;
      searchContentNotChecked = " #define LUA_USE_MODULES_"+moduleName;
      //console.log(defineString);
      //search_content = search_content.replace(/([.?&;*+^$[\]\\(){}|-])/g, "\\$1");//improve
      searchContentNotChecked = new RegExp(searchContentNotChecked);
      fileData = fileData.replace(searchContentNotChecked, replaceContentNotChecked);
    }
}).change();

$("#upload").click(function(e){
  e.preventDefault();
  var Port =$('#portBtn').html();
  if(Port=='Select Port'){
    alert("Error! Please select a port");
  }else{
    $("#upload").attr('value','Uploading..');
    fs.writeFileSync(includePath,fileData,'utf8');
    child_process.execSync(cmd,{shell: '/bin/bash'});
    var uploadCmd='python '+pythonPath+' -p '+Port+' write_flash 0x00000 '+bin0+' 0x10000 '+bin1;
    let child = exec(uploadCmd,{shell: '/bin/bash'}, function(err, stdout, stderr){
          if(stderr){
            alert("Error Uploading! Please check connection and permission.")
          }else{
            alert("Done Uploading");
          }
        $("#upload").attr('value','Upload');
    });
  }
});
