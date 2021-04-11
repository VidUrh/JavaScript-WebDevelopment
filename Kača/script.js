
velikost = 30;
igraVteku = false;
mis = [getRandomInt(velikost),getRandomInt(velikost)]
dolzina = 1;
document.getElementById("dolzina").innerHTML = "Dolžina kače: "+(dolzina+1)

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function NajdiCelico(x,y){

  return document.getElementById('Arena').rows[x].cells[y]
}

function Inicializiraj(){

  ime = prompt('Vaše ime:')

  trenutnaSmer=[0,0];
  mis = [getRandomInt(velikost),getRandomInt(velikost)]
  dolzina = 1;
  document.getElementById("dolzina").innerHTML = "Dolžina kače: "+(dolzina+1)
  kaca = []
  document.getElementById('Arena').innerHTML='';
  for(x=0;x<velikost;x++){
    vrstica = document.createElement("tr");
    for(y=0;y<velikost;y++){
      celica = document.createElement("td");
      if(y==Math.floor(velikost/2) && x==Math.floor(velikost/2)){
        kaca[0]=[x,y]
        rep =[x,y-1]
        kaca=[kaca[0],rep]
        while ((mis[0]==x && mis[1]==y)||(mis[0]==x && mis[1]==y-1)){
          mis = [getRandomInt(velikost),getRandomInt(velikost)]
        }

      }
      celica.className="prazno"

      vrstica.appendChild(celica);

    }
    document.getElementById('Arena').appendChild(vrstica);
  }
  NajdiCelico(kaca[0][0],kaca[0][1]).className='glavaDesno';
  NajdiCelico(rep[0],rep[1]).className='repDesno';
  NajdiCelico(mis[0],mis[1]).className='mis';
  Score();
}

function move(){

  trenutnaSmer = zelenasmer;
  try{
    if(NajdiCelico(kaca[0][0]+zelenasmer[0],kaca[0][1]+zelenasmer[1]).className=="prazno"){
      prej=[kaca[0][0],kaca[0][1]]
      kaca[0][0]+=zelenasmer[0];
      kaca[0][1]+=zelenasmer[1];
      if(zelenasmer[0]==0){
        if(zelenasmer[1]>0){NajdiCelico(kaca[0][0],kaca[0][1]).className="glavaDesno";}
        else if (zelenasmer[1]<0){NajdiCelico(kaca[0][0],kaca[0][1]).className="glavaLevo";}
      }
      else{
        if(zelenasmer[0]>0){NajdiCelico(kaca[0][0],kaca[0][1]).className="glavaDol";}
        else if (zelenasmer[0]<0){NajdiCelico(kaca[0][0],kaca[0][1]).className="glavaGor";}
      }


      for(i=1;i<kaca.length;i++){
        if(i==dolzina){
          NajdiCelico(kaca[dolzina][0],kaca[dolzina][1]).className="prazno";
          kaca[dolzina][0]=prej[0];
          kaca[dolzina][1]=prej[1];
          s=[kaca[dolzina-1][0]-kaca[dolzina][0],kaca[dolzina-1][1]-kaca[dolzina][1]]
          if(s[0]==0){
            if(s[1]>0){NajdiCelico(kaca[dolzina][0],kaca[dolzina][1]).className="repDesno";}
            else if (s[1]<0){NajdiCelico(kaca[dolzina][0],kaca[dolzina][1]).className="repLevo";}
            }
          else{
            if(s[0]>0){NajdiCelico(kaca[dolzina][0],kaca[dolzina][1]).className="repDol";}
            else if (s[0]<0){NajdiCelico(kaca[dolzina][0],kaca[dolzina][1]).className="repGor";}
            }
          }

        else{
          temp = kaca[i];
          kaca[i]=prej;
          NajdiCelico(kaca[i][0],kaca[i][1]).className ='kaca'
          prej = temp;
        }
      }
    }
    else if(NajdiCelico(kaca[0][0]+zelenasmer[0],kaca[0][1]+zelenasmer[1]).className=="mis"){

      document.getElementById("dolzina").innerHTML = "Dolžina kače: "+(dolzina+2)
      kaca.unshift([kaca[0][0]+zelenasmer[0],kaca[0][1]+zelenasmer[1]]);
      if(zelenasmer[0]==0){
        if(zelenasmer[1]>0){NajdiCelico(kaca[0][0],kaca[0][1]).className="glavaDesno";}
        else if (zelenasmer[1]<0){NajdiCelico(kaca[0][0],kaca[0][1]).className="glavaLevo";}
      }
      else{
        if(zelenasmer[0]>0){NajdiCelico(kaca[0][0],kaca[0][1]).className="glavaDol";}
        else if (zelenasmer[0]<0){NajdiCelico(kaca[0][0],kaca[0][1]).className="glavaGor";}
      }

      NajdiCelico(kaca[1][0],kaca[1][1]).className = "kaca";
      dolzina++;

    }
    else{
      throw TypeError
    }
  }
  catch(TypeError){
    if(ime!=null && ime.length>0){
      if(ime in localStorage){
        if(dolzina+1>localStorage.getItem(ime)){
          localStorage.setItem(ime,dolzina+1);
        }
      }
      else{localStorage.setItem(ime,dolzina+1);}
    }
    Score();
    igraVteku=false;
    clearInterval(misa);
    clearInterval(premik);
    alert("Zgubili ste");
    Inicializiraj();
  }
}

function misi() {

  if(NajdiCelico(mis[0],mis[1]).className=='mis'){NajdiCelico(mis[0],mis[1]).className="prazno";}
  mis=[getRandomInt(velikost),getRandomInt(velikost)]
  while (NajdiCelico(mis[0],mis[1]).className!="prazno"){
    mis = [getRandomInt(velikost),getRandomInt(velikost)]
  }
  NajdiCelico(mis[0],mis[1]).className='mis';


}

function Start(){
  igraVteku = true;
  premik = setInterval(move,75)
  misa = setInterval(misi,4000);


}

function Score(){
  k = Object.keys(localStorage);
  v = Object.values(localStorage);
  k.sort((a,b)=>localStorage.getItem(b)-localStorage.getItem(a))
  tabela = document.getElementById('Score')
  for(i=1;i<k.length+1;i++){
    if(i>=tabela.rows.length){
      i--;
      vrstica = document.createElement("tr");
      celicaIme =document.createElement("td");
      celicaIme.innerHTML = k[i]
      celica = document.createElement("td");
      celica.innerHTML = localStorage.getItem(k[i])
      celica.className="Score";
      celicaIme.className="Score";
      vrstica.appendChild(celicaIme)
      vrstica.appendChild(celica)
      tabela.appendChild(vrstica)
      i++;
    }
    else{
      tabela.rows[i].cells[0].innerHTML=k[i-1]
      tabela.rows[i].cells[1].innerHTML=localStorage.getItem(k[i-1])
    }
  }






}

window.onload=function(){
  Inicializiraj();
  window.onkeydown = function(e){
    if(e.keyCode > 36 && e.keyCode < 41){
      smeri = [[0,-1],[-1,0],[0,1],[1,0]]
      m = smeri[e.keyCode-37]
      if((-1*trenutnaSmer[0]!=m[0] || -1*trenutnaSmer[1]!=m[1])){
        zelenasmer = m;
      }
      if(!igraVteku){Start()};
    }
  }
}
