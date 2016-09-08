console.log('index.js ready');

$.ajax({
  url: 'http://www.fvi-grad.com:4004/sudoku',
  success: function(res, txt, xhr){

    for(var row = 0; row < res.length;row++){

      var $newRow = $(`<tr id='row${row}'></tr>`);

      $('tbody').append($newRow)

      for(var col =0; col < res[row].length; col++){

        if(res[row][col] === ""){

          $newRow.append(`<td id='row${row}col${col}'><input type="text"/></td>`)

        }else{

          $newRow.append(`<td id='row${row}col${col}'>${res[row][col]}</td>`)

        }
      }
    }
  }
})



$('#validate').on('click', ()=>{
      console.log('validate button clicked');
      const result = new Array(9).fill(0).map(e=>Array(9).fill(0));

      $("td").each(function(i,e){

        let cell = $(e);

        const row = Math.floor(i/9);
        const col = i%9;

          if($(e).html().length == 1){
            console.log($(e).html());
            result[row][col]=$(e).html()


          }else {
            console.log($(e).find('input').val());
            result[row][col]=$(e).find('input').val();
          }
      }),
      $.ajax({
        url: 'http://www.fvi-grad.com:4004/sudoku',
        method: "POST",
        data:{board:result},
        success: function(res, txt, xhr){
          console.log(res)
        }
      })
    })
