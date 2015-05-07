$(function() {

//highlight the current nav
$("#home a:contains('Home')").parent().addClass('active');
$("#how-to a:contains('How to Download')").parent().addClass('active');
$("#about a:contains('About')").parent().addClass('active');

}); //jQuary is loaded


//downloader

$(document).ready(function() {
  var url = decodeURIComponent(getParameter("url"));
  console.log('url: '+decodeURIComponent(url));
  if(url!="null"){
    $('#url').val(url);
    checkUrl();
  }
  else{
	if( window.location != 'http://localhost/dwntube/index.php' && window.location != 'http://localhost/dwntube/' ){
	url = window.location.href;
	url = url.slice(25);
	var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if(match){
    $('#download-btn').fadeOut('fast');
	$('#loading').fadeIn('slow');
    getVideo(match[1]);
	}
	else{
	url = 'https://www.youtube.com/'+url;
	var match = url.match(regExp);
	if(match){
    $('#download-btn').fadeOut('fast');
    $('#loading').fadeIn('slow');
    getVideo(match[1]);
	}
	else{
    bootstrap_alert.warning('<strong><span style="color: #9e1317;">Alert :</span></strong> Enter the <span style="color: #9e1317;"><strong>URL-address</strong></span> in the input field and press <strong>Enter</strong> or click on the <strong>"Download"</strong> button.</p>');
    $('#url').focus();
    $('#url').select();
  }
  return false;
	}
	}
	}
});

function checkUrl(){
  var url = $('#url').val();
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if(match){
    $('#download-btn').fadeOut('fast');
	$('#loading').fadeIn('slow');
    getVideo(match[1]);
  }
  else{
    bootstrap_alert.warning('<strong><span style="color: #9e1317;">Alert :</span> DwnTube</strong> can not find Youtube video from your input please check your <strong><span style="color: #9e1317;">URL</span></strong>');
    $('#url').focus();
    $('#url').select();
  }
  return false;
}

function getVideo(youtube_video_id){
  var results = [];
  var id = "_ZohLvPaKzg";
  if(youtube_video_id!="")
    id = youtube_video_id;
  $.ajax({
    url: "proxy.php?url=http://www.youtube.com/get_video_info?video_id="+id+"&asv=2",
    dataType: "text"
  }).done(function(data) {
	var position = data.indexOf('contents');
	data = data.slice(position + 11,-2);
	getinfo(data);
    var info = {};
    parse_str(data, info);
    var streams = explode(',', info['url_encoded_fmt_stream_map']);
	if (streams == 'null'){
	bootstrap_alert.warning('<strong><span style="color: #9e1317;">Alert :</span> DwnTube</strong> fail to download this video you can <strong>try again</strong> but <strong><span style="color: #9e1317;">remember DwnTube only support educational video</span></strong>. please check it first is your video <strong>educational importand</strong>');
    $('#url').focus();
    $('#url').select();
	$('#loading').hide();
	$('#download-btn').fadeIn('fast');
  }
  else{
    for(var i=0; i<streams.length; i++){
      var real_stream = {};
      parse_str(streams[i], real_stream);
      real_stream['url'] += '&signature=' + real_stream['sig'];
      results.push(real_stream);
    }
    //print results
    var html = '';
    html += '<table class="table table-responsive table-hover"><tbody>';
    if(results.length > 0){
      $.each(results, function(index, value) {
	  
	  //print format
	  var type = value.type.indexOf(';');
		if( type == -1){
		value.type = value.type.slice(6);
		}
		else{
		value.type = value.type.slice(6,type);
		}
	  
	  // print icon
	  var icon = ''
	  if(value.quality == 'hd720'){
	  icon = 'desktop';
	  }
	  else if(value.quality == 'medium'){
	  icon = 'desk-tab';
	  }
	  else if(value.quality == 'small' && value.type == 'x-flv'){
	  icon = 'tab';
	  }
	  else if(value.quality == 'small'){
	  icon = 'mobile';
	  }
	  
        html += '\n\r<tr>';
        html += '<td style="border: none;"><strong><img src="./images/'+icon+'.png" /> '+value.quality+'</strong></td>';
        html += '<td style="border: none;"><strong>'+value.type+'</strong></td>';
        html += '<td style="border: none;"><a class="btn btn-primary pull-left" href="'+value.url+'" download><i class="icon-download-alt icon-white"></i><span class="glyphicon glyphicon-save"></span> Download</a></td>';
        html += '</tr>\n\r';
      });
    }
    else{
        html += '\n\r<tr>';
        html += '<td>N/A</td>';
        html += '<td>N/A</td>';
        html += '<td>N/A</td>';
        html += '</tr>\n\r';
    }
    $('#vid').html(html);
    $('#vid').fadeIn('slow');
    $('#loading').hide();
    $('#hero2').fadeIn('slow');
	$('#hero3').fadeIn('slow');
	$('#box1').hide();
	$('#box2').hide();
	$('#box3').hide();
    $('#download-btn').show();
  }});
}

function getinfo(data) {
var thumbnail = data.indexOf('thumbnail_url');
thumbnail = data.slice(thumbnail + 14);
var last = thumbnail.indexOf('&');
thumbnail = thumbnail.slice(0,last);
thumbnail = decodeURIComponent(thumbnail);

var title = data.indexOf('title');
title = data.slice(title + 6);
last = title.indexOf('&');
title = title.slice(0,last);
title = title.replace(/\+/g, ' ').replace(/%3A/g, ':').replace(/%/g, ' ');


var length = data.indexOf('length_seconds');
length = data.slice(length + 15);
last = length.indexOf('&');
length = length.slice(0,last);

var mins = ~~(length / 60);
var secs = length % 60;

// Hours, minutes and seconds
var hrs = ~~(length / 3600);
var mins = ~~((length % 3600) / 60);
var secs = length % 60;

// Output like "1:01" or "4:03:59" or "123:03:59"
ret = "";

if (hrs > 0)
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");

ret += "" + mins + ":" + (secs < 10 ? "0" : "");
ret += "" + secs;



var author = data.indexOf('author');
author = data.slice(author + 7);
last = author.indexOf('&');
author = author.slice(0,last);
author = author.replace(/\+/g, ' ');


$('.info').html('<img src="'+thumbnail+'" class="pull-left thumbnail" style="margin-right: 15px";/><p><strong>Title : '+title+'</p><p>Author : '+author+'</p><p> Length : '+ret+'</strong></p>');
}

function parse_str(str, array) {
  var strArr = String(str).replace(/^&/, '').replace(/&$/, '').split('&'),
    sal = strArr.length,
    i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value,
    postLeftBracketPos, keys, keysLen,
    fixStr = function (str) {
      return decodeURIComponent(str.replace(/\+/g, '%20'));
    };
  if (!array) {
    array = this.window;
  }
  for (i = 0; i < sal; i++) {
    tmp = strArr[i].split('=');
    key = fixStr(tmp[0]);
    value = (tmp.length < 2) ? '' : fixStr(tmp[1]);

    while (key.charAt(0) === ' ') {
      key = key.slice(1);
    }
    if (key.indexOf('\x00') > -1) {
      key = key.slice(0, key.indexOf('\x00'));
    }
    if (key && key.charAt(0) !== '[') {
      keys = [];
      postLeftBracketPos = 0;
      for (j = 0; j < key.length; j++) {
        if (key.charAt(j) === '[' && !postLeftBracketPos) {
          postLeftBracketPos = j + 1;
        }
        else if (key.charAt(j) === ']') {
          if (postLeftBracketPos) {
            if (!keys.length) {
              keys.push(key.slice(0, postLeftBracketPos - 1));
            }
            keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
            postLeftBracketPos = 0;
            if (key.charAt(j + 1) !== '[') {
              break;
            }
          }
        }
      }
      if (!keys.length) {
        keys = [key];
      }
      for (j = 0; j < keys[0].length; j++) {
        chr = keys[0].charAt(j);
        if (chr === ' ' || chr === '.' || chr === '[') {
          keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
        }
        if (chr === '[') {
          break;
        }
      }

      obj = array;
      for (j = 0, keysLen = keys.length; j < keysLen; j++) {
        key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '');
        lastIter = j !== keys.length - 1;
        lastObj = obj;
        if ((key !== '' && key !== ' ') || j === 0) {
          if (obj[key] === undef) {
            obj[key] = {};
          }
          obj = obj[key];
        }
        else { // To insert new dimension
          ct = -1;
          for (p in obj) {
            if (obj.hasOwnProperty(p)) {
              if (+p > ct && p.match(/^\d+$/g)) {
                ct = +p;
              }
            }
          }
          key = ct + 1;
        }
      }
      lastObj[key] = value;
    }
  }
}

function explode (delimiter, string, limit) {
  if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return 'null';
  if ( delimiter === '' || delimiter === false || delimiter === null) return false;
  if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
    return { 0: '' };
  }
  if ( delimiter === true ) delimiter = '1';
  delimiter += '';
  string += '';
  var s = string.split( delimiter );
  if ( typeof limit === 'undefined' ) return s;
  if ( limit === 0 ) limit = 1;
  if ( limit > 0 ){
    if ( limit >= s.length ) return s;
    return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
  }
  if ( -limit >= s.length ) return [];
  s.splice( s.length + limit );
  return s;
}

function getParameter(name) {
  return decodeURI((RegExp(name + '=' + '(.+?)(&amp;|$)').exec(location.search)||[,null])[1]);
}

bootstrap_alert = function() {}
bootstrap_alert.warning = function(message) {
            $('#alert_placeholder').html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
        }