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
    this.data = [];
    this.gameGo =true;

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
    };

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
    };

    this.createRandom = function () {
        //random
        if(_this.gameGo){
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
                var r = Math.floor(Math.random() *this.empty.length),
                    rx = this.empty[r][0],
                    ry = this.empty[r][1];
                _this.m[rx][ry] = random;
            }
            this.empty = [];
            this.showNumber();
        }
    };
    
    this.moveLeft = function () {
        // alert('left');
        for(var i = 0;i < this.x;i++){
            for(var j =1;j < this.y;j++){
                if(_this.m[i][j] != 0){
                    for(var k = 0;k < j;k++){
                        if(_this.m[i][k] == 0 && _this.rowCheck(i,j,k)){
                            _this.m[i][k] = _this.m[i][j];
                            _this.m[i][j] = 0;
                            continue;
                        }else if(_this.m[i][k] == this.m[i][j] && _this.rowCheck(i,j,k)){
                            _this.m[i][k] += _this.m[i][j];
                            _this.m[i][j] = 0;
                        }
                    }
                    
                }
            }
        }
        this.showNumber();
        this.createRandom();
    };
    
    this.moveUp = function () {
        // alert('up');
        for(var i = 1;i < this.x;i++){
            for(var j =0;j < this.y;j++){
                if(_this.m[i][j] != 0){
                    for(var k = 0;k < i;k++){
                        if(_this.m[k][j] == 0 && _this.columnCheck(i,j,k)){
                            _this.m[k][j]= _this.m[i][j];
                            _this.m[i][j] = 0;
                            continue;
                        }else if(_this.m[k][j] == this.m[i][j] && _this.columnCheck(i,j,k)){
                            _this.m[k][j] += _this.m[i][j];
                            _this.m[i][j] = 0;
                        }
                    }

                }
            }
        }
        this.showNumber();
        this.createRandom();
    };
    
    this.moveRight = function () {
        // alert('right');
        for(var i = 0;i < this.x;i++){
            for(var j =this.y-2;j >= 0;j--){
                if(_this.m[i][j] != 0){
                    for(var k = this.y-1;k > j;k--){
                        if(_this.m[i][k] == 0 && _this.rowCheck(i,j,k)){
                            _this.m[i][k] = _this.m[i][j];
                            _this.m[i][j] = 0;
                            continue;
                        }else if(_this.m[i][k] == this.m[i][j] && _this.rowCheck(i,j,k)){
                            _this.m[i][k] += _this.m[i][j];
                            _this.m[i][j] = 0;
                        }
                    }

                }
            }
        }
        this.showNumber();
        this.createRandom();
    };
    
    this.moveDown =function () {
        // alert('down');
        for(var i = this.x-2;i >= 0;i--){
            for(var j =0;j < this.y;j++){
                if(_this.m[i][j] != 0){
                    for(var k = this.x-1;k > i;k--){
                        if(_this.m[k][j] == 0 && _this.columnCheck(i,j,k)){
                            _this.m[k][j] = _this.m[i][j];
                            _this.m[i][j] = 0;
                            continue;
                        }else if(_this.m[k][j] == this.m[i][j] && _this.columnCheck(i,j,k)){
                            _this.m[k][j] += _this.m[i][j];
                            _this.m[i][j] = 0;
                        }
                    }

                }
            }
        }
        this.showNumber();
        this.createRandom();
    };
    
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
            k -= 1;
            for(;k > j;k--){
                if(_this.m[i][k] != 0){
                    return false;
                }
            }
            return true;
        }
    };
    
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
            k -=1;
            for(;k>i;k--){
                if(_this.m[k][j] != 0){
                    return false;
                }
            }
            return true;
        }
    };

    this.showNumber = function () {
        for(var i =0;i<this.x;i++){
            for(var j =0;j<this.y;j++){
                if(this.m[i][j] != 0){
                    $('.box[x='+ i +'][y='+ j +']').text(this.m[i][j]);
                }else {
                    $('.box[x='+ i +'][y='+ j +']').text('');
                }
            }
        }

        this.dataCheck();
    };

    this.dataCheck = function () {
        for(var i =0;i<this.x;i++){
            for(var j =0;j<this.y;j++){
                this.data.push(this.m[i][j]);
            }
        }
        //2048
        if(_this.gameWin()){
            alert('YOU WIN!!');
            _this.gameGo = false;
        }
        // else if(_this.gameOver()){
        //     alert('Try Again!');
        //     _this.gameGo = false;
        // }

        this.data = [];
    }
    
    this.gameWin = function () {
        return this.data.some(function (v) { return v == 2048 })
    }

    // this.gameOver = function () {
    //     return this.data.every(function (v) { return v != 0 && v != 2048 })
    // }


}