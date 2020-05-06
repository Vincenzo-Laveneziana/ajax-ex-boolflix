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
    /* apiCercaSerieTv(inputSearch,template,lista);
    apiCercaFilm(inputSearch,template,lista);  */   
    search(inputSearch,template,lista);
  }else{
    alert("Nessun carattere inserito nella ricerca")
    inputSearch.focus();
  }
}


/* 
QUESTE 2 FUNZIONI MOMENTANEAMENTE LE LASCIO COMMENTATE
*/

/* //cerca serie tv
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
      var movie = res.results;

      if(movie.length > 0){

        print(movie, template, lista,"Serie-tv" );
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
      var movie = res.results;

      if(movie.length > 0){

        print(movie, template, lista, "Film");        
      }else{
        $(".film-series").text("Nessun film trovato")
      }

    },
    error: function(){
      console.log("Errore Api");
    }
  });//fine chiamata ajax
}//fine apiCercaFilm  */




function search(inputSearch,template,lista){
  var query = inputSearch.val().toLowerCase().trim();

  var urlApi = ["movie", "tv"];

  urlApi.forEach(function(urlApi){
    $.ajax({
      url: "https://api.themoviedb.org/3/search/" + urlApi,
      method: "GET",
      data:{
        api_key: "676860408bcc47c8ae82c5de9ed14e0e",
        language: "it-IT",
        query: query
      },
      success: function(res){
        var movie = res.results;
  
        if(movie.length > 0){

          if(urlApi == "movie"){
            print(movie, template, lista, "Film");   
          } else if(urlApi == "tv"){
            print(movie, template, lista,"Serie-tv" );    
          }
  
          
           
        }else{

          if(urlApi == "movie"){
            $(".film-series").text("Nessun film trovato") 
          } else if(urlApi == "tv"){
            $(".tv-series").text("Nessuna serie tv trovata") 
          }
          
        }
  
      },
      error: function(){
        console.log("Errore Api");
      }
    });//fine chiamata ajax
  })

  
  
}


function print(movie, template, lista, type){
 
  movie.forEach(function(dati){

    var title, originalTitle;

    
    if(type == "Film"){
      title = dati.title;
      originalTitle = dati.original_title;
    }else if(type == "Serie-tv"){
      title = dati.name;
      originalTitle = dati.original_name;
    }

    var context ={
      title: title,
      originalTitle: originalTitle,
      originalLanguage: flagLang(dati.original_language),
      voteAverage: votoStelle(dati.vote_average),
      tipoSerie : type
    }
    
    lista.append(template(context));
  })
    
}

//conversione rating in star
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

//conversione lingua in bandiera
function flagLang(lingua){
  var language = [
    "en",
    "it"
  ]

  if(language.includes(lingua)){
    var flag = '<img class="flag" src="'+ "assets/img/" + lingua + ".svg" + '" alt="' + lingua + '">';
    return flag;
  }

  return lingua;
}

function pulisciRisultati(contenitore, risultatiTv, risultatiFilm){
  contenitore.html("");
  risultatiTv.html("");
  risultatiFilm.html("");
}