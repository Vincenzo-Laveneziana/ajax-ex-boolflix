$(document).ready(function (){
  console.log("js -- jquery is ready");

  //handlebars
  var source = $("#handlebars-template").html();
  console.log(source);
  var template = Handlebars.compile(source);
  
});
