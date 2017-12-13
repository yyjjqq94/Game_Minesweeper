/**
 * Created by PC on 2017/12/7.
 */
$(function () {
    var start = true;
    window.addEventListener('keydown',function () {
        if(start){
            var game = new Game();
            game.start();
            start = false;
        }
    })
})

var Game = function () {

    this.x = 20;
    this.y = 20;
    this.m = [];
    this.snake = [];
    this.head = {
        hx : 0,
        hy : 0
    }
    this.tail = {
        tx : 0,
        ty : 0
    }
    //direction
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.food = {
        fx : 0,
        fy : 0
    }
    this.nullBox = [];
    _this = this;

    this.start = function () {
        this.createBox();
        this.createFood();
        
        window.addEventListener('keydown',function (e) {
            switch (e.which){
                case 37:
                    _this.left = true;
                    _this.up = false;
                    _this.right = false;
                    _this.down = false;
                    break;
                case 38:
                    _this.left = false;
                    _this.up = true;
                    _this.right = false;
                    _this.down = false;
                    break;
                case 39:
                    _this.left = false;
                    _this.up = false;
                    _this.right = true;
                    _this.down = false;
                    break;
                case 40:
                    _this.left = false;
                    _this.up = false;
                    _this.right = false;
                    _this.down = true;
                    break;
            }
        })

        this.move;
        
    }
    
    this.createBox = function () {
        for(var i = 0;i < this.x;i++){
            this.m[i] = [];
            for(var j = 0;j < this.y;j++){
                this.m[i][j] = 0;
                var box = "<div class='box' x='"+ i +"' y='"+ j +"'></div>";
                $('#container').append(box);
            }
            $('#container').append("<br>")
        }

        //startPoint
        var rx = Math.floor(Math.random() *this.x),
            ry = Math.floor(Math.random() *this.y),
            rb = $('.box[x='+ rx + '][y='+ ry +']');
        this.head.hx = rx;
        this.head.hy = ry;
        this.tail.tx = rx;
        this.tail.ty = ry;
        this.m[rx][ry] = 1;
        rb.text('0');
        this.snake.push([rx,ry]);

    }
    
    this.createFood = function () {
        for(var i = 0;i < this.x;i++){
            for(var j = 0;j < this.y;j++){
               if(this.m[i][j] == 0){
                   this.nullBox.push([i,j]);
               }
            }
        }
        if(this.nullBox.length > 0){
            var f = Math.floor(Math.random() *this.nullBox.length);
            this.food.fx = this.nullBox[f][0];
            this.food.fy = this.nullBox[f][1];
        }
    }

    this.move = setInterval(function () {
        if(_this.up){
            _this.moveUp();
        }else if(_this.down){
            _this.moveDown();
        }else if(_this.left){
            _this.moveLeft();
        }else if(_this.right){
            _this.moveRight();
        }
        _this.show();
    },500)

    this.moveUp = function () {
        if(_this.goOn(_this.head.hx-1,_this.head.hy)){
            if(_this.stepForward(_this.head.hx-1,_this.head.hy)){

            }
        }else {
            _this.gameOver();
        }
    }

    this.moveDown = function () {
        if(_this.goOn(_this.head.hx+1,_this.head.hy)){
            if(_this.stepForward(_this.head.hx+1,_this.head.hy)){

            }
        }else {
            _this.gameOver();
        }
    }

    this.moveLeft = function () {
        if(_this.goOn(_this.head.hx,_this.head.hy-1)){
            if(_this.stepForward(_this.head.hx,_this.head.hy-1)){

            }
        }else {
            _this.gameOver();
        }
    }

    this.moveRight = function () {
        if(_this.goOn(_this.head.hx,_this.head.hy+1)){
            if(_this.stepForward(_this.head.hx,_this.head.hy+1)){

            }
        }else {
            _this.gameOver();
        }
    }
    
    this.stepForward = function (i,j) {
        if(i == _this.food.fx && j == _this.food.fy){
            //eat
            _this.snake.unshift([i,j]);
            _this.m[i][j] = 1;
            _this.head.hx = i;
            _this.head.hy = j;
            _this.createFood();
        }else{
            //step
            _this.snake.unshift([i,j]);
            var len = _this.snake.length;
            var empty = _this.snake[len-1];
            _this.snake.pop();
            _this.m[empty[0]][empty[1]] = 0;
            _this.head.hx = _this.snake[0][0];
            _this.head.hy = _this.snake[0][1];
            _this.m[_this.head.hx][_this.head.hy] = 1;
            // _this.tail.tx = _this.snake[len-1][0];
            // _this.tail.ty = _this.snake[len-1][1];
            // _this.m[_this.tail.tx][_this.tail.ty] = 1;
        }
    }
    
    this.goOn = function (i,j) {
        if(i >= 0 && i < _this.x && j >= 0 && j < _this.y && this.m[i][j] == 0){
            return true;
        }
        return false;
    }

    this.gameOver = function () {
        alert('Over');
        clearInterval(_this.move);
    }
    
    this.show = function () {
        for(var i = 0;i < this.x;i++){
            for(var j = 0;j < this.y;j++){
                if(this.m[i][j] != 0){
                    $('.box[x='+ i +'][y='+ j +']').text('0');
                }else {
                    $('.box[x='+ i +'][y='+ j +']').text('');
                }
            }
        }
        var fx = this.food.fx,
            fy = this.food.fy;
        $('.box[x='+ fx +'][y='+ fy +']').text('*');
    }




}