console.log('index.js ready');

$.ajax({
  url: 'http://www.fvi-grad.com:4004/sudoku',
  success: function(res, txt, xhr){

    for(var row = 0; row < res.length;row++){
      var $newRow = $(`<tr id='row${row}'></tr>`);
      if(res[row]== res[0] || res[row]==res[1] || res[row]==res[2]){
        $('#tb1').append($newRow)
      }else if(res[row]== res[3] || res[row]==res[4] || res[row]==res[5]){
        $('#tb2').append($newRow)
      }else{
        $('#tb3').append($newRow)
      }

      for(var col =0; col < res[row].length; col++){
        if(res[row][col] === ""){
          $newRow.append(`<td id='row${row}col${col}'><input type="text" maxlength="1" id="numbersOnly" autofocus='autofocus'/></td>`)
        }else{
          $newRow.append(`<td id='row${row}col${col}'>${res[row][col]}</td>`)
        }
      }
    }
  }
})

//function so that only numbers are press and limit is already to 1.

//validate function
$('#validate').on('click', ()=>{
  $("#validate").hide();
  $('#reset').hide();
      console.log('validate button clicked');
      const result = new Array(9).fill(0).map(element=>Array(9).fill(0));

      $("td").each(function(index,element){
        let cell = $(element);
        const row = Math.floor(index/9);
        const col = index%9;

          if($(element).html().length == 1){
            result[row][col]=$(element).html()
          }else {
            result[row][col]=$(element).find('input').val();
          }
      }),
      //calls ajax to post solution and recieve an answer (solution=valid/invalid)
      $.ajax({
        url: 'http://www.fvi-grad.com:4004/sudoku',
        method: "POST",
        data:{board:result},
        success: function(res, txt, xhr){
          if(res === 'invalid'){
            var $notWinner = $(`<div class="alert alert-danger" role="alert" id="message"><p class="bg-danger">...sorry so close...</p></div>`)
            $('#load').append($notWinner)
          }else{
            var $brainiac = $(`<div class="alert alert-success" role="alert" id="message"><p class="bg-success">...You have achieved inner peace...</p></div>`)
            $('#load').append($brainiac)
          }
        }
      })
      function show_popup(){
      $("#message").slideUp();
      location.reload();
   };
   window.setTimeout( show_popup, 5000 ); // 5 seconds
})

//enter function to reload page and begin on the first input td

//enter function to navigate around the table using arrow keyframes

//button to reset sudoku board
function reload(){
  location.reload();
}
