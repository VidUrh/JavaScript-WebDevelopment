//Nastavitve
steviloSadja = 2;
vrednostSadja = 20;
vrednostdrobtine = 1;
cas = 10; //čas preden sadje izgine
steviloPotrebnihTock = 100;
level = 0;
SadjeJe = true


function SpremeniSlog(celica,zeleniSlog){
  celica.className=zeleniSlog;
}

function NajdiCelico(vrstica,stolpec) {
    return document.getElementById("Mapa").rows[vrstica].cells[stolpec]
}

function Zacetek() {

  ura = 30;
  tocke = 0;
  smerPremikanja=[0,0]; //{[-1,0]:dol,     [0,-1]:levo,       [1,0]:gor,         [0,1]:desno}
  igraVteku = false;
  stopnja = PacmanMAP[level]

  document.getElementById("Mapa").innerHTML="";
  for(vrstica=0;vrstica<30;vrstica++){
    vrsticaCelic = document.createElement("tr");
    for(stolpec=0;stolpec<40;stolpec++){
      celica = document.createElement("td");
      celica.id = "v"+vrstica+"s"+stolpec;
      switch (stopnja[vrstica*40+stolpec]) {
        case 'X':
          SpremeniSlog(celica,"zid")
          break;
        case 'P':
          trenutnaPozicija =  [vrstica,stolpec];
          SpremeniSlog(celica,"dol")
          break;
        default:
          SpremeniSlog(celica,"krogec")

      }
      vrsticaCelic.appendChild(celica);
    }
    document.getElementById("Mapa").appendChild(vrsticaCelic);


  }
  stevilo = 0;
  while(stevilo<steviloSadja){
    i = Math.floor(Math.random() * 30);
    j = Math.floor(Math.random() * 40);
    if(document.getElementById("Mapa").rows[i].cells[j].className==='krogec'){
      SpremeniSlog(document.getElementById("Mapa").rows[i].cells[j],"sadje")
      stevilo++;
    }
  }
}
function move(zelenasmer){

    zelenaPozicija=NajdiCelico(trenutnaPozicija[0]+zelenasmer[0],trenutnaPozicija[1]+zelenasmer[1])

    if (zelenaPozicija == undefined){
      smerPremikanja=[0,0]
    }
    else{
      if(zelenaPozicija.className==='krogec' || zelenaPozicija.className==="sadje" || zelenaPozicija.className==="pojeden") {
          smerPremikanja = zelenasmer
          if(zelenaPozicija.className ==='sadje'){
            tocke+=vrednostSadja
          }
          else if (zelenaPozicija.className==='krogec') {
            tocke++;
          }
          document.getElementById("Tockovnik").innerHTML="Točke: "+tocke;

      }
      else{
          if(NajdiCelico(trenutnaPozicija[0]+smerPremikanja[0],trenutnaPozicija[1]+smerPremikanja[1]).className=='zid'){
            smerPremikanja=[0,0]
          }
      }

      if(smerPremikanja[0]==0){
        if(smerPremikanja[1]==-1){NajdiCelico(trenutnaPozicija[0]+smerPremikanja[0],trenutnaPozicija[1]+smerPremikanja[1]).className="levo"}
        else if(smerPremikanja[1]==1){NajdiCelico(trenutnaPozicija[0]+smerPremikanja[0],trenutnaPozicija[1]+smerPremikanja[1]).className="desno"}

      }

      else {
        if(smerPremikanja[0]==1){NajdiCelico(trenutnaPozicija[0]+smerPremikanja[0],trenutnaPozicija[1]+smerPremikanja[1]).className="dol"}
        else{NajdiCelico(trenutnaPozicija[0]+smerPremikanja[0],trenutnaPozicija[1]+smerPremikanja[1]).className="gor"}
      }




      if(smerPremikanja[0]!=0||smerPremikanja[1]!=0){
          NajdiCelico(trenutnaPozicija[0],trenutnaPozicija[1]).className="pojeden"
      }
    trenutnaPozicija = [trenutnaPozicija[0]+smerPremikanja[0],trenutnaPozicija[1]+smerPremikanja[1]]






  }
}









function Start(){
  igraVteku = true;
  casovnik = setInterval(function(){
    ura--;
    document.getElementById("Casovnik").innerHTML ="Preostali čas: "+ ura+'s';
    if(ura==0){
      ura=30;
  		clearInterval(casovnik);
  		clearInterval(premikanje);
      document.getElementById("Casovnik").innerHTML ="Preostali čas: "+ ura+'s';
      if(tocke<steviloPotrebnihTock){
        alert("Niste zbrali dovolj točk. Poskusite še enkrat")
        Zacetek();
      }
      else{
        if(level<1){
          alert("Naslednja stopnja:");
          level++;
          Zacetek()
        }
        else{
          alert("Končali ste vse stopnje. Poskusite še enkrat od začetka?")
          level = 0
          Zacetek()
        }


      }
  }
  },1000) //Časovnik odšteva vsako sekundo
  setInterval(function(){
    if(SadjeJe){
      SadjeJe=false
      array = document.getElementsByClassName("sadje")
      temp = array.length
      for (var i = 0; i < temp; i++) {
        SpremeniSlog(array[0],"krogec");
        }
      }
  },cas*1000)
  premikanje = setInterval(function(){
    move(zelenasmer)
  },200);

}


window.onload=function(){
  Zacetek();
  window.onkeydown = function(e){
    if(e.keyCode > 36 && e.keyCode < 41){
      moznesmeri = [[0,-1],[-1,0],[0,1],[1,0]]
      zelenasmer = moznesmeri[e.keyCode-37]
      if(!igraVteku){Start()}
    }
  }
}
