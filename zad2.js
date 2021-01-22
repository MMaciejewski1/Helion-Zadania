var savedObj;
function get_Row(){
var  dbParam, xmlhttp, myObj, x, txt = "";
xmlhttp = new XMLHttpRequest();//stworzenie obiektu XMLHttpRequest do pobrania JSONA
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {//sprawdzenie czy zadanie jest zakonczone i czy odpowiedz jest gotowa
    myObj = JSON.parse(this.responseText);//sparsowanie jsona do obiektu javascript
    savedObj=myObj;//zapisanie danych do paginacji
    txt += "<table id=\"Table\">";//stworzenie tabeli w html
    txt += "<tr>"+ "<th onclick=\"sortTable(0,true)\">ID</th><th onclick=\"sortTable(1,false)\">Tytuł</th><th onclick=\"sortTable(2,false)\">Autor</th><th onclick=\"sortTable(3,true)\">Cena</th><th onclick=\"sortTable(4,true)\">Okładka</th><th>Typ</th><th onclick=\"sortTable(5,true)\">Status</th>";//stworzenie naglowkow w tabeli w html
    for (x in myObj) {
      txt += "<tr><td data-label=\"Id\"> "+ x +"<td data-label=\"Tytul\"> "+ myObj[x].tytul +"</td><td data-label=\"Autor\"> "+  myObj[x].autor+"</td><td data-label=\"Cena\"> "+  myObj[x].cena+"</td><td data-label=\"Okladka\"> "+ "<img src=https://static01.helion.com.pl/global/okladki/181x236/"+myObj[x].ident+".png alt= border=3 height=100 width=100></img></td><td data-label=\"Typ\"> "+  myObj[x].typ+"</td><td data-label=\"Status\"> "+  myObj[x].status+"</td></tr>";//odczytanie i zapisanie danych z JSONA w kolejnych wierszach tabeli
    }
    txt += "</table>"    
    document.getElementById("placeForTable").innerHTML = txt;//wstawienie do obiektu w html
    
  }
};
xmlhttp.open("get", "test.php", true);//otworzenie pliku z jsonem
xmlhttp.send();
}



function pag(){
var txt="";
var n=document.getElementById("selectPag").value;//pobranie wartosci z wybranego option obiektu select w html
  for (var i = 0; i < savedObj.length/n; i++){
    txt += "<a href=\"#\" onclick=\"pagTable("+i*n+","+parseInt(n)*i+parseInt(n)+")\">"+i+"</a>";//stworzenie kolejnych obiektow odpowiadajacym za wybor strony przegladania tabeli
  }  
  document.getElementById("pagination").innerHTML = txt;//dodanie do obiektu w html
}

function pagTable(start,n){
  var txt="";
  txt += "<table id=\"Table\">";//stworzenie nowej tabeli w html
  txt += "<tr>"+ "<th onclick=\"sortTable(0,true)\">ID</th><th onclick=\"sortTable(1,false)\">Tytuł</th><th onclick=\"sortTable(2,false)\">Autor</th><th onclick=\"sortTable(3,true)\">Cena</th><th onclick=\"sortTable(4,true)\">Okładka</th><th>Typ</th><th onclick=\"sortTable(5,true)\">Status</th>";
  for (var x = start; x < n; x++){//pobranie i zapisanie odpowiedniego zakresu danych z JSONA
    txt += "<tr><td> "+ x +"<td> "+ savedObj[x].tytul +"</td><td> "+  savedObj[x].autor+"</td><td> "+  savedObj[x].cena+"</td><td> "+ "<img src=https://static01.helion.com.pl/global/okladki/181x236/"+savedObj[x].ident+".png alt= border=3 height=100 width=100></img></td><td> "+  savedObj[x].typ+"</td><td> "+  savedObj[x].status+"</td></tr>";
  }
  document.getElementById("placeForTable").innerHTML = txt;//wstawienie do obiektu w html
}


function sortTable(n,isNum) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("Table");
    switching = true;//zmienna odpowiadajaca za sprawdzenie czy w danym  wykonaniu petli zawartosc tablicy zostala zmieniona
    
    dir = "asc";//zmienna odpowiadaja za kierunek sortowania, domyslnie rosnaco
  
    while (switching) {
      switching = false;//ustawianie zmiennej by pokazywala ze jeszcze nie dokonano zmiany w tabeli
      rows = table.rows;//zapisanie w zmiennej wszystkich wierszy
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;//ustawienie zmiennej pomocniczej by nic nie bylo zmieniane
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];//zapisanie w zmiennych dwoch kolejnych komorek 
        if(isNum==false){//sprawdzenie czy wartosci sa numeryczne
         if (dir == "asc") {//sprawdzenie czy funkcja ma sortowac rosnaca
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {//sprawdzenie ktory element jest wiekszy
            shouldSwitch = true;//ustawienie zmiennej pomocniczej by zostala dokonana zmiana miejsc
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {//sprawdzenie ktory element jest wiekszy
            shouldSwitch = true;//ustawienie zmiennej pomocniczej by zostala dokonana zmiana miejsc
            break;
          }
        }    
    }else{
        if (dir == "asc") {
            if (Number(x.innerHTML) > Number(y.innerHTML)) {//sprawdzenie ktory element jest wiekszy
                shouldSwitch = true;//ustawienie zmiennej pomocniczej by zostala dokonana zmiana miejsc
                break;
              }
          } else if (dir == "desc") {
            if (Number(x.innerHTML) < Number(y.innerHTML)) {//sprawdzenie ktory element jest wiekszy
                shouldSwitch = true;//ustawienie zmiennej pomocniczej by zostala dokonana zmiana miejsc
                break;
              }
          }
    }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);//zamien miejscami wiersze
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";//jesli nic nie zmieniono przelacz sortowanie na malejaco
          switching = true;
        }
      }
    }
  }

  function filterCol(n) {
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("myInput"+n);
    switch(n){//wyczyszczenie pozostalych inputow do filtrowania
      case 0:{
        document.getElementById("myInput"+1).value="";
        document.getElementById("myInput"+2).value="";
        break;
              }
      case 1:{
        document.getElementById("myInput"+0).value="";
        document.getElementById("myInput"+2).value="";
        break;
              }
      case 2:{
        document.getElementById("myInput"+0).value="";
        document.getElementById("myInput"+1).value="";
        break;
              } 
    }
    filter = input.value.toUpperCase();//ujednolicenie liter w wyrazeniu
    table = document.getElementById("Table");//przypisanie tabeli do zmiennej
    tr = table.getElementsByTagName("tr");//przypisanie do zmiennej listy wierszy
  
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[n];//pobranie pojedynczego elementu z wiersza
      if (td) {
        txtValue =  td.innerText;//przypisanie wartosci textowej z komorki wiersza
        if (txtValue.toUpperCase().indexOf(filter) > -1) {//sprawdzenie czy podana fraza istnieje w zawartosci komorki wiersza
          tr[i].style.display = "";//jesli tak lub frazy puste to zostaw bez zmian
        } else {
          tr[i].style.display = "none";//jesli nie to schowaj 
        }
      }
    }
  }

  