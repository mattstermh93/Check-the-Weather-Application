function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function displayNames(response) {
  // get all keys for the header column on table
  var headers = Object.keys(response[0]);

  // initialize html vars
  var header_html = '<tr><th scope="col">#</th>';
  var body_html = '';

  // create header html insert into page
  for (var i = 0; i < headers.length; i++) {
    header_html += '<th scope="col">' + toTitleCase(headers[i]) + '</th>'
  }

  // add additional closing </tr> to header_html
  header_html += '</tr>';

  // add each person as a new row
  for (var i = 0; i < response.length; i++) {
    // create new table row for body
    body_html += '<tr><th scope="row">' + (i + 1) + '</th>';

    for (var j = 0; j < headers.length; j++) {
      // set current header information
      var cur_head = headers[j];

      // if key is food, parse differently
      if (cur_head === "foods") {
        var likes = response[i][`${cur_head}`]['likes'];
        var dislikes = response[i][`${cur_head}`]['dislikes'];

        // creating beginning of column
        body_html += '<td>';

        // loop through all liked foods, don't end column yet
        for (let k = 0; k < likes.length; k++) {
          body_html += '<b class="good_food">Likes:</b> ' + likes[k] + '</br>';
        }

        // loop through all disliked foods, end column after
        for (let k = 0; k < likes.length; k++) {
          body_html += '<b class="bad_food">Dislikes:</b> ' + dislikes[k] + '</br>';
        }

        body_html += '</td>';

      } else {
        // add table column with variable
        body_html += '<td>' + response[i][`${cur_head}`] + '</td>';
      }
    }

    // end row for current employee
    body_html += '</tr>'
  }

  // insert html into table
  $("#table_head").html(header_html);
  $("#table_body").html(body_html);
}

$.get('https://learnwebcode.github.io/json-example/animals-1.json', displayNames);

setTimeout(function(){
  $("#home_link").removeClass("active");
  $("#animal_link").addClass("active");
}, 1);
