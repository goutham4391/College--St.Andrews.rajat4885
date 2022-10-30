/* 
 * script to read xml and xslt and output the results into a div
 * refernace to https://www.w3schools.com/xml/xsl_client.asp
 */

var xml;
var xsl;


function loadXMLDoc()
{
    filename = 'https://www.st-andrews.ac.uk/php/xml_cache/rss/research_main.rss';
    if (window.ActiveXObject)
    {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else
    {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, true);
    try {
        xhttp.responseType = "msxml-document";
    } catch (err) {
    } // Helping IE11
    xhttp.send("");
   

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
             xml = xhttp.responseXML;
      

            loadXSLDoc();
        }
    };

}



function loadXSLDoc() {
    filename = 'https://www.st-andrews.ac.uk/php/xml_cache/javascript/tilegrid.xsl';
    if (window.ActiveXObject)
    {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else
    {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, true);
    try {
        xhttp.responseType = "msxml-document";
    } catch (err) {
    } // Helping IE11
    xhttp.send("");
   

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
             xsl = xhttp.responseXML;
                      
            showResult(xhttp.responseType);
        }
    };

}



function displayResult()
{
loadXMLDoc();

}


function showResult(response)
{

// code for IE
if (window.ActiveXObject || response == "msxml-document")
  {
  ex = xml.transformNode(xsl);
  document.getElementById("researchfeed").innerHTML = ex;
  }
// code for Chrome, Firefox, Opera, etc.
else if (document.implementation && document.implementation.createDocument)
  {
  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  resultDocument = xsltProcessor.transformToFragment(xml, document);
  document.getElementById("researchfeed").appendChild(resultDocument);
  }

 $(".tile h3 a").bigTarget({ clickZone : "div:eq(1)" })
}
