window.onload = function(){
    SCREENWIDTH = 500;
    SCREENHEIGHT = 500;
    SHIPSIZE = 50;

    LEFT_KEY = 37;
    RIGHT_KEY = 39;
    ESC_KEY = 32;

    MOVINGSPACE = 30;
    ALIENSIZE = 20;

    var score = 0;

    var shots = []
    var shipshots = [];
    class ship{
        constructor(x,y, w, h){
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.vel = 20;
            this.life = 3;
        }

        draw(){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x,this.y,this.w,this.h);
        }
        
    }
    class Shot{

    }


    class ShipShot{
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.w = 3;
            this.h = 15;
        }

        draw(){
            ctx.fillStyle = "green";
            ctx.fillRect(this.x,this.y,this.w,this.h);
            this.y -= 5;
        }

        
    }

    class Aliens{
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.w = ALIENSIZE;
            this.h = ALIENSIZE;
            this.moveCount = 0;
            this.direction = "left";
            this.life = 1;
        }

        draw(){
            if (this.life == 1){
                ctx.fillStyle = "blue";
                ctx.fillRect(this.x,this.y,this.w,this.h);
                this.y += 2;
                               
                if(this.moveCount < MOVINGSPACE){
                    if(this.direction == "right"){ this.x -= 5;}
                    if(this.direction == "left"){this.x += 5;}
                    
                    this.moveCount ++;
                }
                if(this.moveCount == MOVINGSPACE){ 
                    if(this.direction == "right"){this.direction = "left";this.moveCount = 0;}
                    else if(this.direction == "left"){this.direction = "right";this.moveCount = 0;}
                    

                    
                }
                
            }
        }
    }


    class Cube{
        constructor(x,y)
        {
            this.x = x;
            this.y = y;
            this.w = 50;
            this.h = 50;
            this.life = 5;
        }

        draw(){
            switch(this.life){
                case 1:
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x,this.y,this.w-30,this.h-30);
                    break;
                case 2:
                        ctx.fillStyle = "grey";
                        ctx.fillRect(this.x,this.y,this.w-20,this.h-20);
                        break;
                case 3:
                        ctx.fillStyle = "grey";
                        ctx.fillRect(this.x,this.y,this.w-15,this.h-15);
                        break;
                case 4:
                        ctx.fillStyle = "grey";
                        ctx.fillRect(this.x,this.y,this.w - 10,this.h -10);
                        break;
                case 5:
                        ctx.fillStyle = "grey";
                        ctx.fillRect(this.x,this.y,this.w,this.h);
                        break;
                case 0:
                    break;                
            }

            
        }

    }

    document.onkeydown = function handleKeyDown(event){
        var keyPressed = event.keyCode;
        if (keyPressed == LEFT_KEY) {    s.x -= s.vel }
        if (keyPressed == RIGHT_KEY ) {   s.x += s.vel }
        if (keyPressed == ESC_KEY ) {  
            
                var b = new ShipShot(s.x + (SHIPSIZE/2), s.y - (SHIPSIZE/2));
                shipshots.push(b);
         }
         if (keyPressed == 27) { clearInterval(run)}
        }


    s = new ship(SCREENWIDTH / 2, SCREENHEIGHT - SHIPSIZE *2 , 50, 50)

    cubes = [];
    c1 = new Cube(250, 300);
    cubes.push(c1);
    c2 = new Cube(50, 300);
    cubes.push(c2);
    c3 = new Cube(150, 300);
    cubes.push(c3);
    c4 = new Cube(350, 300);
    cubes.push(c4);

    aliens =[];
    alienss =[];
    a1 = new Aliens(50, 50);
    alienss.push(a1);
    a2 = new Aliens(150, 50);
    alienss.push(a2);
    a3 = new Aliens(200, 50);
    alienss.push(a3);
    a4 = new Aliens(75, 50);
    alienss.push(a4);

    
    var canva = document.getElementById('c');
    var ctx = canva.getContext('2d');

    



    function draw(){
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,SCREENWIDTH,SCREENHEIGHT);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Your score :"+ score, 10, 490);

        console.log(s.life);
        for(l=0; l <parseInt(s.life); l ++){
            console.log('arc');
            ctx.fillStyle = "red";
            ctx.fillRect(150 +( l * 30), 470 ,20,20);
            
        }
        s.draw();
        for(i in shots){
            if(typeof shots !== 'undefined'){
            shots[i].draw();
            }
        }

        for(c in cubes){
              

            for (a in aliens){
                if(aliens[a].x >= cubes[c].x && aliens[a].x < (cubes[c].x + cubes[c].w)){
                    if(aliens[a].y + ALIENSIZE >= cubes[c].y && aliens[a].y +ALIENSIZE < (cubes[c].y + cubes[c].h)){
                        aliens.splice(a, 1);
                        cubes[c].life -= 1;
                        if (cubes[c].life <= 0){cubes.splice(c, 1);}
                        
                    }
                }
            }

            for(t in shipshots){
                shipshots[t].draw();
    
                if(shipshots[t].x >= cubes[c].x && shipshots[t].x < (cubes[c].x + ALIENSIZE)){
                    if(shipshots[t].y >= cubes[c].y && shipshots[t].y > (cubes[c].y + ALIENSIZE)){
                        shipshots.splice(t,1);
                    }
                }
            }
            if(cubes[c].life <= 0){
            
            
            }else{
            cubes[c].draw();
            }
        }

        
        for (a in aliens){ 
            aliens[a].draw();
            for(t in shipshots){
                shipshots[t].draw();
    
                if(shipshots[t].x >= aliens[a].x && shipshots[t].x < (aliens[a].x + aliens[a].w)){
                    if(shipshots[t].y >= aliens[a].y && shipshots[t].y < (aliens[a].y + aliens[a].h)){
                        shipshots.slice(t, 1);
                        aliens.splice(a,1);
                        score ++;
                    }
                }
                
                    
                
            }

            if (aliens[a].x > s.x && aliens[a].x < (s.x + SHIPSIZE)){
                if(aliens[a].y > s.y && aliens[a].y < (s.y + SHIPSIZE)){
                    s.life --;
                    aliens.splice(a, 1);
                    
                }
            }

            if(aliens[a].y + ALIENSIZE == SCREENHEIGHT - SHIPSIZE){s.life --;}
        }

        if (s.life <= 0){ clearInterval(run)
            ctx.fillStyle = "black";
            ctx.fillRect(0,0, SCREENWIDTH, SCREENHEIGHT);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText("GAMMEOVER", 200, 200);
        
        }
        
    }

    function event(){
        
    }

    function update(){


    }


    function randEnemies(){

        rando = [ 50, 75, 100,125,150,175,200,225,250,275,300,325];
        var rand = Math.floor(Math.random()* 12);

        var a = new Aliens( rando[rand] , 20);
        aliens.push(a);
    }

    var randeneies =setInterval(randEnemies, 2000);
    var run =setInterval(draw, 100);
}