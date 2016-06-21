var PrintDiv = function() {

  var scaleCanvas = function(canvas, width, height) {
    var w = canvas.width,
      h = canvas.height;
    if (width == undefined) {
      width = w;
    }
    if (height == undefined) {
      height = h;
    }

    var retCanvas = document.createElement('canvas');
    var retCtx = retCanvas.getContext('2d');
    retCanvas.width = width;
    retCanvas.height = height;
    retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
    return retCanvas;
  }

  var getDataURL = function(canvas, type, width, height) {
    canvas = scaleCanvas(canvas, width, height);
    return canvas.toDataURL(type);
  }

  var toImgData = function (url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null; 
        };
        img.src = url;
  };

  var fileDownload = function(file, contentType, fileName) {
        var blob = new Blob([file], {type: contentType});
            
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, fileName);
            } 
            else {
                var link = document.createElement("a");
                if (link.download !== undefined) {
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", fileName);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
  };

  var divToPdf = function(divid,pdfname) {     
         html2canvas(document.getElementById(divid), {
              onrendered: function(canvas) {                         
                 var strData = getDataURL(canvas, "image/png");
                  toImgData(strData, function(img){
                    pdfMake.createPdf({content: [{image:img}]}).getBuffer(function(buffer) {
                       fileDownload(buffer, 'application/pdf', pdfname);        
                    });         
                  },"image/png");
              }
         })
  };

  var divToImage = function(divid, callback, options) {
         html2canvas(document.getElementById(divid), {
              onrendered: function(canvas) {
                if(!options) {
                   options = {scale:1,type:'png'};
                }
                scale = (options.scale)?options.scale:1; 
                type = (options.type)?options.type:'png';                        
                var strData = getDataURL(canvas, "image/"+type,(canvas.width * scale), (canvas.height * scale));
                if (type) {
                   strData = strData.replace('png',type);
                }
                callback(strData);
              }
         })
    }

  return {

    divToPdf : divToPdf,
    divToImage : divToImage
  };

}();

