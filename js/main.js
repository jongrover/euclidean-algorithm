$(function() {

  var largeSide, smallSide;

  function biggest(s1, s2) {
    return s1 > s2 ? s1 : s2;
  }

  function smallest(s1, s2) {
    return s1 < s2 ? s1 : s2;
  }

  function remainder(big, sm) {
    return big % sm;
  }

  function result(tileSize, tilesHigh, tilesWide, tileNum) {
    var $table = $('<table>'),
        $row = $('<tr>'),
        $cell = $('<td>');

    for (currentRow = 0; currentRow < tilesHigh; currentRow++) {
      
      $row.clone().appendTo($table);

      for (currentCol = 0; currentCol < tilesWide; currentCol++) {
        $cell.clone().appendTo($table.find('tr').eq(currentRow));
      }
    }
    var result = '<p>tile size: '+tileSize+' x '+tileSize+', '+
                 'rows: '+tilesHigh+', '+
                 'cols: '+tilesWide+', '+
                 'total tiles: '+tileNum+'</p>';

    $('#result').empty().html(result).append($table);
    $('td').css({'width':(100 / tilesWide)+'%'});
    $('td').css({'height':($('td').width())+'px'});
  }

  function calc(s1, s2) {
    var big = biggest(s1, s2), 
        sm = smallest(s1, s2),
        rem = remainder(big, sm);
    if (rem === 0) {
      var tileSize = sm,
          tilesHigh = smallSide / tileSize,
          tilesWide = largeSide / tileSize,
          tileNum = tilesHigh * tilesWide;
      result(tileSize, tilesHigh, tilesWide, tileNum);
    } else {
      calc(sm, rem);
    }
  }

  $('form').submit(function(event) {
    var w = parseInt($('#width').val()),
        h = parseInt($('#height').val());
    largeSide = biggest(w, h);
    smallSide = smallest(w, h);
    calc(w, h);
    event.preventDefault();
  });

});
