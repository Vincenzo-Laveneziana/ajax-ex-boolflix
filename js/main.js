/* Best Comments In Source
     * Dear future me. Please forgive me. 
       I can't even begin to express how sorry I am.^_^
*/
$(document).ready(function (){

  //handlebars
  var source = $("#handlebars-template").html();
  var template = Handlebars.compile(source);
  
  //referenze
  var inputSearch = $("#search");
  var btnSearch = $("#search-btn");
  var lista = $(".films");
  var resultTV = $(".tv-series");
  var resultFilm = $(".film-series");
  
  //al click
  btnSearch.click(function(){
    chiamaFunzioni(lista,resultTV,resultFilm,inputSearch,template)
  })

  //alla pressione del tasto invio
  inputSearch.keyup(function(event){
    if(event.which === 13){
      chiamaFunzioni(lista,resultTV,resultFilm,inputSearch,template)
    }
  })
  
});//fine ready


/********** 
  FUNZIONI
**********/

//chiamata funzione
function chiamaFunzioni(lista,resultTV,resultFilm,inputSearch,template){
  if(inputSearch.val() !== "" ){
    pulisciRisultati(lista,resultTV,resultFilm);
    apiCercaSerieTv(inputSearch,template,lista);
    apiCercaFilm(inputSearch,template,lista);    
    }else{
      alert("Nessun carattere inserito nella ricerca")
      inputSearch.focus();
    }
}

//cerca serie tv
function apiCercaSerieTv(inputSearch,template,lista){
 
  console.log("chiamata serie tv");
  var query = inputSearch.val().toLowerCase().trim();
  
  $.ajax({
    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data:{
      api_key: "676860408bcc47c8ae82c5de9ed14e0e",
      language: "it-IT",
      query: query
    },
    success: function(res){
      
      if(res.results.length > 0){

        res.results.forEach(function(datiFilm){
          var film ={
            title: datiFilm.name,
            originalTitle: datiFilm.original_name,
            originalLanguage: bandiera(datiFilm.original_language),
            voteAverage: votoStelle(datiFilm.vote_average),
            tipoSerie : "serie-tv"
          }
          
          lista.append(template(film));
          //inputSearch.val("");
        })

      }else{
        $(".tv-series").text("Nessuna serie tv trovata")
      }
    },
    error: function(){
      console.log("Errore Api");
    }
  });//fine chiamata ajax
}//fine apiCercaSerieTv


//cerca film
function apiCercaFilm (inputSearch,template,lista){
  
  console.log("chiamata film");
  var query = inputSearch.val().toLowerCase().trim();
  
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data:{
      api_key: "676860408bcc47c8ae82c5de9ed14e0e",
      language: "it-IT",
      query: query
    },
    success: function(res){
      
      if(res.results.length > 0){

        res.results.forEach(function(datiFilm){
          var film ={
            title: datiFilm.title,
            originalTitle: datiFilm.original_title,
            originalLanguage: bandiera(datiFilm.original_language),
            voteAverage: votoStelle(datiFilm.vote_average),
            tipoSerie : "film"
          }
          
          lista.append(template(film));
          //inputSearch.val("");
        })

      }else{
        $(".film-series").text("Nessun film trovato")
      }
    },
    error: function(){
      console.log("Errore Api");
    }
  });//fine chiamata ajax
}//fine apiCercaFilm 


function votoStelle(voto){
  var stellaPiena = '<i class="fas fa-star"></i>';
  var stellaVuota = '<i class="far fa-star"></i>';
  var aggiungiStella = "";

  //arrotonamento per eccesso
  voto = Math.ceil(voto*0.5);

  for( var i = 0; i < 5 ; i++){
    if(voto > i){
      aggiungiStella += stellaPiena; 
    }else{
      aggiungiStella += stellaVuota;
    }
  }

  return aggiungiStella;
}

function bandiera(lingua){
  var aggiungiBandiera = "";
  
  if(lingua == "en" || lingua == "it"){
    aggiungiBandiera = '<img class="flag" src="'+ "img/" + lingua + ".svg" + '" alt="' + lingua + '">';
    return aggiungiBandiera;
  }else{
    return lingua;
  }

}

function pulisciRisultati(contenitore, risultatiTv, risultatiFilm){
  contenitore.html("");
  risultatiTv.html("");
  risultatiFilm.html("");
}