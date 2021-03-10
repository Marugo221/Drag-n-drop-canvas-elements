let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
let width = 500, height = 300;
let button = document.getElementById('btn-submit');
var selected = false;

var mouse = {
    x : 0,
    y : 0,
    down : false
};

cnv.width = width;
cnv.height = height;
cnv.style.backgroundColor = "#D9FF9E";

ctx.fillStyle = "#985D5D";
ctx.strokeStyle = "green";
ctx.lineWidth = 2;

var isCursorInRect = function(rect) {
    return mouse.x > rect.x && mouse.x < rect.x + rect.w && mouse.y > rect.y && mouse.y < rect.y + rect.h;
};

let Rect = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Rect.prototype = {
    draw : function() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    },
    stroke : function() {
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}

var i, rect = [];
for (i = 0; i < 5; i++) {
    rect.push( new Rect(50 + i * (50 + 20), 50, 50, 50) );
}
setInterval(function() {
    ctx.clearRect(0, 0, width, height);
    for (i in rect) {
        rect[i].draw();

     if (isCursorInRect(rect[i])) {
         rect[i].stroke();
     }
    }
    
    if (selected) {
        selected.x = mouse.x - selected.w/2;
        selected.y = mouse.y - selected.h/2;
        selected.stroke();
     }

}, 0); 


/*

setInterval(function() {
    ctx.clearRect(0, 0, width, height);
    for (i in rect) {
        rect[i].draw();

     if (isCursorInRect(rect[i])) {
         rect[i].stroke();
     }
    }
    
    if (selected) {
        selected.x = mouse.x - selected.w/2;
        selected.y = mouse.y - selected.h/2;
        selected.stroke();
     }

}, 0); 

*/

cnv.onmousemove = function(e) {
    let mt = getComputedStyle(cnv).marginLeft
    mouse.x = e.pageX - mt.slice(0, mt.length - 2);
    mouse.y = e.pageY; 
   //console.log(mouse.x);
   //console.log(selected);
}

window.onmousedown = function() {
    mouse.down = true;
    if (!selected) {
        var i;

        for (i in rect) {
         if (isCursorInRect(rect[i])) {
             selected = rect[i];
         }
        }    
    }
}

window.onmouseup = function() {
    mouse.down = false;
    selected = false;
}





