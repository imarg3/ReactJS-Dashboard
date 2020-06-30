$(document).ready(function () {
  $('#hin_email').focusin(function () {
    //alert("calling");
    console.log('Transliteration Service Calling Starts ');
    var locale = 'hi_in';
    setTypingLayout('transliteration');
    enableTyping(new Array('hin_email', '_to'), null, 'NAME', locale);
  });

  $('#hin_email').focusout(function () {
    console.log('Transliteration Service Calling Stops');
    var locale = '';
    setTypingLayout('transliteration');
    enableTyping(new Array(''), null, 'NAME', locale);
  });
});
