function parseCSV(str) {
    var arr = [];
    var quote = false;
    for (var row = 0, col = 0, c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c + 1]; arr[row] = arr[row] || [];
        arr[row][col] = arr[row][col] || ''; if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; } if
            (cc == '"') { quote = !quote; continue; } if (cc == ',' && !quote) { ++col; continue; } if (cc == '\r' && nc == '\n' &&
                !quote) { ++row; col = 0; ++c; continue; } if (cc == '\n' && !quote) { ++row; col = 0; continue; } if (cc == '\r' && !quote) { ++row; col = 0; continue; } arr[row][col] += cc;
    } return arr;
} function getRandom(arr, n) {
    var result = new
        Array(n), len = arr.length, taken = new Array(len); if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function loadBooks(url, showNumber, attachTo, ParentElementToHide) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayBooks(this.responseText, showNumber, attachTo);
        }
        else if (this.readyState == 4 && this.status == 404) {
            document.getElementById(ParentElementToHide).style.display = "none";
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function displayBooks(data, showNumber, attachTo) {
    var d = parseCSV(data);
    d.shift();
    if (showNumber != 0) {
        d = getRandom(d, showNumber);
    }
    
    var html = "<div class='row'>";
    for (var i = 0; i < d.length; i++) {
        var bib = d[i][0];
        bib = bib.substring(0, bib.length - 1);
        var title = d[i][1];
        title=title.replace(/ *\[[^\]]*]/, '');
        title=title.replace("[","").replace("]","");
        var isbns = d[i][2]; 
        var isbns = isbns.split(";");
        var isbn = isbns[0].replace(/[^0-9]+/g, ''); 
        html += '<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3 book-jacket">';
        html += '<a href="https://encore.st-andrews.ac.uk/iii/encore/record/C__R'+ bib + '">';
        html += '<div class="grid-fig-wrap">';
        html += '<img class="grid-image" src = "https://images.syndetics.com/index.php?isbn='+isbn+'/220h.jpg&imagelinking=1&client=ltfl&type=unbound" alt = "'+title+'" /> ';
        html += '</div>';
        html += '</a>';
        html += '<a href="https://encore.st-andrews.ac.uk/iii/encore/record/C__R' + bib + '">';
        html +=  title;
        html += '</a>';
        html += '</div>';
    }
    html += "</div>";
    document.getElementById(attachTo).innerHTML = html;
}