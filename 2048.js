/**
 * Created by PC on 2017/12/5.
 */

$(function () {
    $('#start').click(function () {
        var game = new Game();
        game.start();
    })
})

var Game = function () {
    this.x = 4;
    this.y = 4;
    this.m = [];
    this.empty = [];
    _this = this;

    this.start = function () {
        $('#container').html('');
        //createBox
        this.createBox();
        this.createRandom();
        window.addEventListener('keydown',function (e) {
            switch (e.which){
                case 37:
                    _this.moveLeft();
                    break;
                case 38:
                    _this.moveUp();
                    break;
                case 39:
                    _this.moveRight();
                    break;
                case 40:
                    _this.moveDown();
                    break;
            }
        })
    }

    this.createBox = function () {
        for(var i = 0;i < this.x;i++){
            this.m[i] = [];
            for(var j = 0;j < this.y;j++){
                this.m[i][j] = 0;
                var box = "<div class='box' x='" + i + "' y='" + j + "'></div>";
                $('#container').append(box);
            }
            $('#container').append("<br>");
        }
    }

    this.createRandom = function () {
        //random
        var random = Math.random() < 0.5 ? 2 : 4;
        //find empty box
        for(var i = 0;i < this.x;i++){
            for(var j = 0;j < this.y;j++){
                if(this.m[i][j] == 0){
                    this.empty.push([i,j]);
                }
            }
        }

        if(this.empty.length > 0){
            var rx = Math.floor(Math.random() *this.x),
                ry = Math.floor(Math.random() *this.y),
                rb = $('.box[x=' + rx + '][y=' + ry + ']');
            rb.text(random);
        }
    }
    
    this.moveLeft = function () {
        // alert('left');
        for(var i = 0;i < this.x;i++){
            for(var j =1;j < this.y;j++){
                if(this.m[i][j] != 0){
                    
                }
            }
        }

    }
    
    this.moveUp = function () {
        alert('up');
    }
    
    this.moveRight = function () {
        alert('right');
    }
    
    this.moveDown =function () {
        alert('down');
    }
    
    this.rowCheck = function (i,j,k) {
        //to left
        if(k < j){
            k += 1;
            for(;k < j;k++){
                if(_this.m[i][k] != 0){
                    return false;
                }
            }
            return true;
        }else if(k > j){
            //to right
            k += 1;
            for(;k < _this.y;k++){
                if(_this.m[i][k]){
                    return false;
                }
            }
            return true;
        }
    }
    
    this.columnCheck = function (i,j,k) {
        //to up
        if(k < i){
            k += 1;
            for(;k < i;k++){
                if(_this.m[k][j] != 0){
                    return false;
                }
            }
            return true;
        }else if(k > i){

        }
    }


}