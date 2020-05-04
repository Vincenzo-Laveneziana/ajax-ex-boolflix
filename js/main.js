$(document).ready(function (){

  //handlebars
  var source = $("#handlebars-template").html();
  console.log(source);
  var template = Handlebars.compile(source);
  

  //referenze

  var inputSearch = $("#search");
  var btnSearch = $("#search-btn");
  var query = inputSearch.val().toLowerCase().trim();
  


  btnSearch.click(function() {
    query = inputSearch.val().toLowerCase().trim();
    apiCercaFilm(query, template,inputSearch); 
  })

  inputSearch.keyup(function(event) {
    query = inputSearch.val().toLowerCase().trim();

    if(event.which === 13){
      apiCercaFilm(query, template,inputSearch);
    }
  })
  
});//fine ready


/* 
  FUNZIONI
*/


function apiCercaFilm (query, template,inputSearch) {
  
  var lista = $(".films");

  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: "676860408bcc47c8ae82c5de9ed14e0e",
      language: "it-IT",
      query: query
    },
    success: function(res){
      lista.html("");
      
      var datiFilm = res.results;
      
      for(var i = 0; i < datiFilm.length; i++){
        
        var film = {
          title: datiFilm[i].title,
          originalTitle: datiFilm[i].original_title,
          originalLanguage: datiFilm[i].original_language,
          voteAverage: datiFilm[i].vote_average
        }

        lista.append( template(film));
        
        //inputSearch.val("")
      }
    },
    error: function(){
      console.log("Errore Api");
    }
  });

}