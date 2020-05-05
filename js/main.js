$(document).ready(function (){

  //handlebars
  var source = $("#handlebars-template").html();
  var template = Handlebars.compile(source);
  
  //referenze
  var inputSearch = $("#search");
  var btnSearch = $("#search-btn");
  
  
  btnSearch.click(function(){
   
    apiCercaSerieTv(inputSearch,template);
    apiCercaFilm(inputSearch,template); 
    
  })

  inputSearch.keyup(function(event){

    if(event.which === 13){
      
      apiCercaSerieTv(inputSearch,template);
      apiCercaFilm(inputSearch,template);
      
    }
  })
  
});//fine ready


/* 
  FUNZIONI
*/

//cerca serie tv
function apiCercaSerieTv(inputSearch,template){
  console.log("chiamata serie tv");
  
  if(inputSearch.val() != "" ){

    var lista = $(".films");
    var query = inputSearch.val().toLowerCase().trim();
    //console.log("chiamata api");
    
    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv",
      method: "GET",
      data:{
        api_key: "676860408bcc47c8ae82c5de9ed14e0e",
        language: "it-IT",
        query: query
      },
      success: function(res){
        lista.html("");
        

        if(res.results.length > 0){

            //sperimento foreach
          res.results.forEach(function(datiFilm){
            var film ={
              title: datiFilm.name,
              originalTitle: datiFilm.original_name,
              originalLanguage: datiFilm.original_language,
              voteAverage: votoStelle(datiFilm.vote_average),
              tipoSerie : "serie-tv"
            }
            
            lista.append(template(film));
            //inputSearch.val("");
          })

        }else{
          alert("nessuna serie tv trovata")
        }
        
      },
      error: function(){
        console.log("Errore Api");
      }
    });//fine chiamata ajax
  }//fine if confronto
}//fine apiCercaSerieTv



//cerca film
function apiCercaFilm (inputSearch,template){
  console.log("chiamata film");
  
  if(inputSearch.val() != "" ){

    var lista = $(".films");
    var query = inputSearch.val().toLowerCase().trim();
    //console.log("chiamata api");
    
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data:{
        api_key: "676860408bcc47c8ae82c5de9ed14e0e",
        language: "it-IT",
        query: query
      },
      success: function(res){
        //lista.html("");
        

        if(res.results.length > 0){

            //sperimento foreach
          res.results.forEach(function(datiFilm){
            var film ={
              title: datiFilm.title,
              originalTitle: datiFilm.original_title,
              originalLanguage: datiFilm.original_language,
              voteAverage: votoStelle(datiFilm.vote_average),
              tipoSerie : "film"
            }
            
            lista.append(template(film));
            //inputSearch.val("");
          })

        }else{
          alert("nessun film trovato")
        }
        
      },
      error: function(){
        console.log("Errore Api");
      }
    });//fine chiamata ajax
  }//fine if confronto
}//fine apiCercaFilm 


function votoStelle(voto){
  
  //arrotonamento per eccesso
  var voto = Math.round(voto*0.5);

  return voto;
}