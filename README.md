# printHtmlDiv.js

printHtmlDiv joins pdfmake (http://pdfmake.org/) and html2canvas (https://html2canvas.hertzen.com/)
to generate pdfs and screenshot from a div

usage: import 'html2canvas.js', 'pdfmake.js' and 'printHtmlDiv.js'

create a div with some content:
<div id="myDiv">
  Some Content...
</div>

#### Create a snapshot div:

PrintDiv.divToImage(divId,callback,options);

- divid (required): id element div: '<div id="mydiv">'
- callback (required): callback method
- options: options: {scale:"snapshoot scale", type:"image extension"}

Example: 

PrintDiv.divToImage("mydiv",function(img){
        document.getElementById("image").src = img;

},{scale:2,type:'jpg'});


### Create a pdf from div

PrintDiv.divToPdf(divId,pdfName);

- divid (required): id element div: '<div id="mydiv">'
- pdfName  (required): pdf name

Example:

PrintDiv.divToPdf("mydiv","mypdf");


