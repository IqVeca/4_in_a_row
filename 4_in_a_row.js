var ROWS = 6;
var COLUMNS = 7;

var LunghezzaCombinazione = 4;       //quanti gettoni uguali ci devono essere in orizz, vert o diag

var CountMoves = 0;
var ColorPlayer1 = "rgb(255, 0, 0)";   //red color
var ColorPlayer2 = "rgb(255, 255, 0)"; //yellow color

var DelayClean = 2000;                  //rappresenta dopo quanti secondi viene ripulita la tabella in caso di vittoria
var countMoves = 0;


function CreateInsertButtons()
 {
   var table = document.createElement("table"); table.id = "RowInsertButtons"
   var row = document.createElement("tr");
   var button;

   for(var i = 0; i < COLUMNS; i++)
    {
      button = document.createElement("button");
      button.classList.add("insertButtons");
      button.innerHTML ="V";
      button.dataset.colNumber = i;
      button.addEventListener("click", InsertCoin);
      row.appendChild(button);
    }
   
    table.appendChild(row);
    document.getElementById('container_buttons').appendChild(table); 
 }

function CreateField()
 {
   var table = document.createElement('table'); table.id = "Campo";
   var row, cell;

   for(var i = 0; i < ROWS; i++)
    {
      row = document.createElement('tr'); 

      for(var j = 0; j < COLUMNS; j++)
       {
         cell = document.createElement('td');
         cell.classList.add('cell');
         cell.dataset.color = -1;               //-1 nessun colore, 0 rosso, 1 giallo
         cell.dataset.column = j;
         cell.dataset.row = i;
         row.appendChild(cell);
       } 
         
      table.appendChild(row); 
     }
    
   document.getElementById('container_Table').appendChild(table); 
 }


function InsertCoin(e)
 {
   var table = document.getElementById("Campo");

   var colScelta = parseInt(e.currentTarget.dataset.colNumber,10); 
   var rigLibera = SearchFirstFreeRow(colScelta);

   if(rigLibera != -1)
    {
      if(countMoves % 2 == 0) 
       {
         table.rows[rigLibera].cells[colScelta].dataset.color = 0; 
         table.rows[rigLibera].cells[colScelta].style.backgroundColor = ColorPlayer1;
       }
      else 
       {
         table.rows[rigLibera].cells[colScelta].dataset.color = 1; 
         table.rows[rigLibera].cells[colScelta].style.backgroundColor = ColorPlayer2; 
       }
      
      if(CheckWin())
        setTimeout(function(){ Reset(); }, DelayClean);

      countMoves++;  
    }
   else
    alert("Mossa illegale"); 
 }


function SearchFirstFreeRow(colScelta)
 {
   var table = document.getElementById("Campo");
   var pos;

   for(var i = 0; i < table.rows.length; i++)
    {
      if(table.rows[i].cells[colScelta].dataset.color == "-1")
         pos = i;
    }

   if(pos != undefined)
    return pos;
   else
    return -1; 
 }


function Reset()
 {
   var cells = $(".cell");

   for(var i = 0; i < cells.length; i++)
    {
      cells[i].style.backgroundColor = "rgb(255,255,255)";
      cells[i].dataset.color = -1;
    }
   
   countMoves = 0;
 } 


function CheckWin()
 {
   return CheckWinRow() || CheckWinCol() || CheckWinDiag();
 } 

function CheckWinRow()
 {
  var Table = document.getElementById("Campo");
  var seq1 = new Array();    //memorizza la combinazione vincente. Essa, poi, verrà evidenziata in verde
  var seq2 = new Array();    //memorizza la combinazione vincente. Essa, poi, verrà evidenziata in verde
  var comb1 = LunghezzaCombinazione, comb2 = LunghezzaCombinazione;

  for(var i = 0; i < Table.rows.length; i++)
   {
     for(var j = 0; j < Table.rows[i].cells.length; j++)
       {
        if(Table.rows[i].cells[j].dataset.color == 0)
         {
           comb1--;
           seq1.push(Table.rows[i].cells[j]);

           comb2 = LunghezzaCombinazione;
           seq2.splice(0,seq2.length)
         }
        else if(Table.rows[i].cells[j].dataset.color == 1)
         {
           comb2--;
           seq2.push(Table.rows[i].cells[j]);

           comb1 = LunghezzaCombinazione;
           seq1.splice(0,seq1.length)
         } 
        else
         {
           comb1 = LunghezzaCombinazione, comb2 = LunghezzaCombinazione; 
           seq1.splice(0,seq1.length), seq2.splice(0,seq2.length);
         } 

        if(comb1 == 0)
         {
          EvidenceWin(seq1);
          return true;
         }
        else if(comb2 == 0)
         {
          EvidenceWin(seq2);
          return true;
         }
       }

      comb1 = LunghezzaCombinazione, comb2 = LunghezzaCombinazione;
    }

  return false; 
 } 


function CheckWinCol()
 {
  var Table = document.getElementById("Campo");
  var seq1 = new Array();    //memorizza la combinazione vincente. Essa, poi, verrà evidenziata in verde
  var seq2 = new Array();    //memorizza la combinazione vincente. Essa, poi, verrà evidenziata in verde
  var comb1 = LunghezzaCombinazione, comb2 = LunghezzaCombinazione;

  for(var j = 0; j < Table.rows[0].cells.length; j++)
   {
     for(var i = 0; i < Table.rows.length; i++)
       {
        if(Table.rows[i].cells[j].dataset.color == 0)
         {
           comb1--;
           seq1.push(Table.rows[i].cells[j]);

           comb2 = LunghezzaCombinazione;
           seq2.splice(0,seq2.length)
         }
        else if(Table.rows[i].cells[j].dataset.color == 1)
         {
           comb2--;
           seq2.push(Table.rows[i].cells[j]);

           comb1 = LunghezzaCombinazione;
           seq1.splice(0,seq1.length)
         } 
        else
         {
           comb1 = LunghezzaCombinazione, comb2 = LunghezzaCombinazione; 
           seq1.splice(0,seq1.length), seq2.splice(0,seq2.length);
         } 

        if(comb1 == 0)
         {
          EvidenceWin(seq1);
          return true;
         }
        else if(comb2 == 0)
         {
          EvidenceWin(seq2);
          return true;
         }
       }

      comb1 = LunghezzaCombinazione, comb2 = LunghezzaCombinazione;
    }

  return false; 
 } 


function CheckWinDiag()
 {
   var Table = document.getElementById("Campo");
 }    



function EvidenceWin(A)
 {
  for(var i = 0; i < A.length; i++) 
   A[i].style.backgroundColor = "rgb(65,212,65)";

  var cells = $(".cell");
  
  for(var i = 0; i < cells.length; i++) 
   cells[i].dataset.color = 2;         //in questo modo non sarà più possibile aggiungere gettoni
 }