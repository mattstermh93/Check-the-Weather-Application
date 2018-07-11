function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

Number.prototype.formatMoney = function(c, d, t){
    var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function displayNames(response) {
  var employees = response.employees;
  // get all keys for the header column on table
  var headers = Object.keys(employees[0]);

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
  for (var i = 0; i < employees.length; i++) {
    // create new table row for body
    body_html += '<tr><th scope="row">' + (i + 1) + '</th>';

    for (var j = 0; j < headers.length; j++) {
      // set current header information
      var cur_head = headers[j];

      // console.log(employees[i][`${cur_head}`]);

      // check attendance in or out use badges
      if (cur_head === "attendance") {
        if (employees[i][`${cur_head}`] === true) {
          // if true add green badge
          body_html += '<td><span class="badge badge-in">IN</span></td>';
        } else if (employees[i][`${cur_head}`] === false) {
          // if false add red badge
          body_html += '<td><span class="badge badge-out">OUT</span></td>';
        }
      } else if (cur_head === "salary") {
        // show salary as currency correctly
        body_html += '<td>$' + (employees[i][`${cur_head}`]).formatMoney(2, '.', ',') + '</td>';
      } else {
        // otherwise add table column with variable
        body_html += '<td>' + employees[i][`${cur_head}`] + '</td>';
      }
    }

    // end row for current employee
    body_html += '</tr>'
  }

  // insert html into table
  $("#table_head").html(header_html);
  $("#table_body").html(body_html);
}

$.get('./assets/employees.json', displayNames);


setTimeout(function(){
  $("#home_link").removeClass("active");
  $("#emp_link").addClass("active");
}, 1);
