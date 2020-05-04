$(document).ready(function (){

  //handlebars
  var source = $("#handlebars-template").html();
  var template = Handlebars.compile(source);
  
  //referenze
  var inputSearch = $("#search");
  var btnSearch = $("#search-btn");
  
  
  btnSearch.click(function(){
    apiCercaFilm(inputSearch,template); 
  })

  inputSearch.keyup(function(event){

    if(event.which === 13){
      apiCercaFilm(inputSearch,template);
    }
  })
  
});//fine ready


/* 
  FUNZIONI
*/


function apiCercaFilm (inputSearch,template){
  console.log("chiamata funzione");
  
  if(inputSearch.val() != "" ){

    var lista = $(".films");
    var query = inputSearch.val().toLowerCase().trim();
    console.log("chiamata api");
    
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data:{
        api_key: "676860408bcc47c8ae82c5de9ed14e0e",
        language: "it-IT",
        query: query
      },
      success: function(res){
        lista.html("");

        //sperimento foreach
        res.results.forEach(function(datiFilm){
          var film ={
            title: datiFilm.title,
            originalTitle: datiFilm.original_title,
            originalLanguage: datiFilm.original_language,
            voteAverage: datiFilm.vote_average
          }
          
          lista.append(template(film));
          inputSearch.val("");
        })
        
        //var datiFilm = res.results;
  
        /* for(var i = 0; i < datiFilm.length; i++){
          
          var film ={
            title: datiFilm[i].title,
            originalTitle: datiFilm[i].original_title,
            originalLanguage: datiFilm[i].original_language,
            voteAverage: datiFilm[i].vote_average
          }
  
          lista.append( template(film));
          inputSearch.empty()
        } */
      },
      error: function(){
        console.log("Errore Api");
      }

    });//fine chiamata ajax

  }//fine if confronto

}//fine apiCercaFilm