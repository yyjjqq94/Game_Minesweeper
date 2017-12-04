/**
 * Created by PC on 2017/12/3.
 */

$(function(){
    //init
    $('#x').val('10');
    $('#y').val('10');
    $('#n').val('10');
    $('#mine').val('10');
    $('#time').val('0');

    $('#start').click(function(){
        var x =  $('#x').val();//行
        var y =  $('#y').val();//列
        var n =  $('#n').val();//雷数

        var game = new Game(x,y,n);
        game.start();
    })
})


var Game = function (x,y,n) {
    this.x = x ? x : 10;
    this.y = y ? y : 10;
    this.n = n ? n : 10;
    this.m = new Array();
    this.flag = [];
    this.over = false;
    this.time = 0;
    this.mine = this.n;
    _this = this;
    this.sign = new Array();
    this.start = function () {
        $('#container').html('');
        this.createMine();
        window.document.oncontextmenu = function () {
            return false;
        }
        $('.box').mousedown(function(e){
           if(!_this.over ){
               var px = $(this).attr('x'),
                   py = $(this).attr('y'),
                   pb = $('.box[x=' + px + '][y=' + py + ']');
               if(e.which == 1 && _this.sign[px][py] == 0){
                   _this.check(px,py,$(this));
               }else if(e.which == 3){
                   _this.mark(px,py,pb);
               }
           }
        });
    };
    
    this.createMine = function () {
        //createContainer
        for(var i = 0;i < this.x;i++){
            this.m[i] = new Array();
            this.flag[i] = new Array();
            this.sign[i] = new Array();
            for(var j = 0;j < this.y;j++){
                this.m[i][j] = 0;
                this.flag[i][j] = 0;
                this.sign[i][j] = 0;
                var box = "<div class='box' x='" + i + "' y='" + j + "'></div>";
                $('#container').append(box);
            }
            $('#container').append("<br>");
        }

        //createMine
        for(var i = 0;i < this.n;i++){
            var mx = Math.floor(Math.random() *this.x),
                my = Math.floor(Math.random() *this.y);
            if(this.m[mx][my] == 0){
                this.m[mx][my] = -1;
            }
        }

        //count
        for (var i = 0; i < this.x; i++) {
            for (var j = 0; j < this.y; j++) {
                if (this.m[i][j] < 0) {
                    (i - 1 >= 0) && (j - 1 >= 0) && (this.m[i - 1][j - 1] >= 0) ? this.m[i - 1][j - 1]++: 0;
                    (j - 1 >= 0) && (this.m[i][j - 1] >= 0) ? this.m[i][j - 1]++: 0;
                    (i + 1 < this.x) && (j - 1 >= 0) && (this.m[i + 1][j - 1] >= 0) ? this.m[i + 1][j - 1]++: 0;

                    (i - 1 >= 0) && (this.m[i - 1][j] >= 0) ? this.m[i - 1][j]++: 0;
                    (i + 1 < this.x) && (this.m[i + 1][j] >= 0) ? this.m[i + 1][j]++: 0;

                    (i - 1 >= 0) && (j + 1 < this.y) && (this.m[i - 1][j + 1] >= 0) ? this.m[i - 1][j + 1]++: 0;
                    (j + 1 < this.y) && (this.m[i][j + 1] >= 0) ? this.m[i][j + 1]++: 0;
                    (i + 1 < this.x) && (j + 1 < this.y) && (this.m[i + 1][j + 1] >= 0) ? this.m[i + 1][j + 1]++: 0;
                }
            }
        }
    };

    this.check = function(x,y,b){
        if(this.isMine(x,y)){
            this.end();
        }else {
            if(this.m[x][y] > 0){
                this.flag[x][y] = 1;
                b.text(this.m[x][y]);
                b.css({'background': '#ddd'});
            }else {
                this.expand(x,y);
            }
        }
        this.win();
    };
    
    this.isMine = function (x,y) {
        if(this.m[x][y] < 0){
            return true;
        }
        return false;
    };
    
    this.end = function () {
        _this.allOpen();
        alert('Fail,Please try again!');
        return;
    };

    this.allOpen = function(){
        clearInterval(_this.setTime);
        for(var i = 0;i<this.x;i++){
            for(var j = 0;j<this.y;j++){
                if (this.m[i][j] > 0){
                    $('.box[x=' + i +'][y=' + j +']').text(this.m[i][j]);
                    $('.box[x=' + i +'][y=' + j +']').css({'backgroud' : '#ddd'});
                }else if(this.m[i][j] == 0){
                    $('.box[x=' + i +'][y=' + j +']').css({'backgroud' : '#ddd'});
                }else if(this.m[i][j] == -1){
                    $('.box[x=' + i +'][y=' + j +']').text('X');
                    $('.box[x=' + i +'][y=' + j +']').css({'backgroud' : '#f64','color' : 'red'});
                }
            }
        }
        _this.over = true;
    };
    
    this.expand = function(x,y){
        var xMin = (x-1 >= 0) ? x-1 : x;
        var xMax = (x+1 < this.x) ? x+1 : x;
        var yMin = (y-1 >= 0) ? y-1 : y;
        var yMax = (y+1 < this.y) ? y+1 : y;
        var d = $('.box[x=' + x + '][y=' + y + ']');
        d.css({'background':'#ddd'});
        this.flag[x][y] = 1;
        if(this.m[x][y] > 0){
            d.text(this.m[x][y]);
            return;
        }
        for(var i = xMin;i<=xMax;i++){
            for(var j = yMin;j<=yMax;j++){
                if(this.flag[i][j] == 0 && this.m[i][j] >= 0){
                    this.expand(i,j);
                }
            }
        }
    };

    this.win = function () {
        var count = 0;
        for(var i = 0;i < this.x;i++){
            for(var j = 0;j < this.y;j++){
                if(this.flag[i][j] == 0){
                    count++
                }
            }
        }
        if(count == this.n){
            _this.allOpen();
            _this.over = true;
            alert('YOU Win!');
        }
    };

    this.mark = function (x,y,b) {
        if(_this.sign[x][y] == 0){
            b.text('!');
            b.css({'color' : 'red'});
            _this.sign[x][y] = 1 ;
            if(_this.mine > 0){
                _this.mine--;
            }
        }else if(_this.sign[x][y] == 1){
            b.text('');
            b.css({'background' : '#eee'});
            _this.sign[x][y] = 0 ;
            if(_this.mine < _this.n){
                _this.mine++;
            }
        }
        $('#mine').val(_this.mine);
    }

    this.setTime =  setInterval(function(){
            _this.time++;
            $('#time').val( _this.time);
    },1000);

};



