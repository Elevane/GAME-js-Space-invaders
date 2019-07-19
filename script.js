window.onload = function () {
    SCREENWIDTH = 800;
    SCREENHEIGHT = 800;
    SHIPSIZE = 50;

    LEFT_KEY = 37;
    RIGHT_KEY = 39;
    JUMP_KEY = 32;
    ESC_KEY = 27;

    WIN = new sound('wind.wav');
    HITSHIP = new sound('hitship.mp3');
    HITWALL = new sound('hitwall.mp3');
    THEME = new sound('theme.mp3');
    FIRESOUND = new sound('shoot.wav');
    HITALIEN = new sound('hit.wav');
    MOVINGSPACEBOSS = 125;
    MOVINGSPACE = 30;
    ALIENSIZE = 50;
    BLOCKSIZE = 5;
    HEARTBLOCKSIZE = 3;
    timer = 0;
    WALLSIZE = 100;

    var score = 0;
    boss = false;
    var aliensShots = []
    var shipshots = [];


    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        }
        this.stop = function () {
            this.sound.pause();
        }
    }

    class ship {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.vel = 20;
            this.life = 3;
            this.ammo = 5;
        }

        draw() {
            //DRAWING THE SHIP ACCORDING TO X, Y pixels
            // #
            // ###
            // ###
            // #########
            // ###################
            // ###################
            //1
            ctx.fillStyle = "red";
            ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y, BLOCKSIZE, BLOCKSIZE);
            //2
            ctx.fillStyle = "red";
            ctx.fillRect(this.x + 4 * BLOCKSIZE, this.y + BLOCKSIZE, 3 * BLOCKSIZE, BLOCKSIZE);
            //3
            ctx.fillStyle = "red";
            ctx.fillRect(this.x + 4 * BLOCKSIZE, this.y + BLOCKSIZE * 2, 3 * BLOCKSIZE, BLOCKSIZE);
            //4
            ctx.fillStyle = "red";
            ctx.fillRect(this.x + 1 * BLOCKSIZE, this.y + BLOCKSIZE * 3, 9 * BLOCKSIZE, BLOCKSIZE);
            //5
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y + BLOCKSIZE * 4, 11 * BLOCKSIZE, BLOCKSIZE);
            //6
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y + BLOCKSIZE * 5, 11 * BLOCKSIZE, BLOCKSIZE);

        }


    }
    class AlienShot {
        constructor(x, y, boss, direction) {
            this.x = x;
            this.y = y;
            this.w = 5;
            this.h = 5;
            this.color = 'red';
            this.boss = boss;
            this.direction = direction;
        }

        draw() {
            if (this.boss != true) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.w, this.h);
                this.y += 5;
            }
            if (this.boss) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.w, this.h);
                if (this.direction == "left") {
                    this.x += 1;
                }
                if (this.direction == "midleft") {
                    this.x += 3;
                }
                if (this.direction == "farleft") {
                    this.x += 5;
                }
                if (this.direction == "right") {
                    this.x -= 1;
                }
                if (this.direction == "midright") {
                    this.x -= 3;
                }
                if (this.direction == "farright") {
                    this.x -= 5;
                }
                this.y += 5;
            }
        }

    }


    class ShipShot {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.w = 3;
            this.h = 10;

        }


        draw() {

            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.w, this.h);
            this.y -= 10;

        }




    }

    class Aliens {
        constructor(x, y, color, boss) {
            this.x = x;
            this.y = y;
            this.w = ALIENSIZE;
            this.h = ALIENSIZE;
            this.color = color;
            this.moveCount = 0;
            this.direction = "left";
            this.life = 1;
            this.boss = boss;
            if (this.boss) {
                this.life = 5;
            }
        }

        draw() {
            if (this.life == 1) {
                //1
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y, BLOCKSIZE, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 10 * BLOCKSIZE, this.y, BLOCKSIZE, BLOCKSIZE);
                //2
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 6 * BLOCKSIZE, this.y + BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 9 * BLOCKSIZE, this.y + BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                //3
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE * 7, BLOCKSIZE);
                //4
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 4 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 2, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 7 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 3, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 11 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 2, BLOCKSIZE);
                //5
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 3 * BLOCKSIZE, this.y + BLOCKSIZE * 4, BLOCKSIZE * 11, BLOCKSIZE);
                //6
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 3 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE * 7, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 13 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE, BLOCKSIZE);
                //7
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 3 * BLOCKSIZE, this.y + BLOCKSIZE * 6, BLOCKSIZE, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y + BLOCKSIZE * 6, BLOCKSIZE, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 11 * BLOCKSIZE, this.y + BLOCKSIZE * 6, BLOCKSIZE, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 13 * BLOCKSIZE, this.y + BLOCKSIZE * 6, BLOCKSIZE, BLOCKSIZE);
                //8
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 6 * BLOCKSIZE, this.y + BLOCKSIZE * 7, BLOCKSIZE * 2, BLOCKSIZE);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 9 * BLOCKSIZE, this.y + BLOCKSIZE * 7, BLOCKSIZE * 2, BLOCKSIZE);

                // motion
                this.y += 1;

                if (this.moveCount < MOVINGSPACE) {
                    if (this.direction == "right") { this.x -= 5; }
                    if (this.direction == "left") { this.x += 5; }

                    this.moveCount++;
                }
                if (this.moveCount == MOVINGSPACE) {
                    if (this.direction == "right") { this.direction = "left"; this.moveCount = 0; }
                    else if (this.direction == "left") { this.direction = "right"; this.moveCount = 0; }



                }


            }
            if (this.boss == true) {

                ctx.fillStyle = this.color;
                ctx.fillRect(this.x + 6 * BLOCKSIZE, this.y, BLOCKSIZE * 6, BLOCKSIZE);
                ctx.fillRect(this.x + 4 * BLOCKSIZE, this.y + BLOCKSIZE, BLOCKSIZE * 10, BLOCKSIZE);
                ctx.fillRect(this.x + 3 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE * 12, BLOCKSIZE);
                ctx.fillRect(this.x + 2 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 2, BLOCKSIZE);
                ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 2, BLOCKSIZE);
                ctx.fillRect(this.x + 8 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 2, BLOCKSIZE);
                ctx.fillRect(this.x + 11 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 2, BLOCKSIZE);
                ctx.fillRect(this.x + 14 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 2, BLOCKSIZE);
                ctx.fillRect(this.x + BLOCKSIZE, this.y + BLOCKSIZE * 4, BLOCKSIZE * 16, BLOCKSIZE);
                ctx.fillRect(this.x + 3 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE * 3, BLOCKSIZE);
                ctx.fillRect(this.x + 12 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE * 3, BLOCKSIZE);
                ctx.fillRect(this.x + 8 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE * 2, BLOCKSIZE);
                ctx.fillRect(this.x + 4 * BLOCKSIZE, this.y + BLOCKSIZE * 6, BLOCKSIZE, BLOCKSIZE);
                ctx.fillRect(this.x + 13 * BLOCKSIZE, this.y + BLOCKSIZE * 6, BLOCKSIZE, BLOCKSIZE);

                // motion
                this.y += 1;
                if (this.moveCount < MOVINGSPACEBOSS) {
                    if (this.direction == "right") { this.x -= 5; }
                    if (this.direction == "left") { this.x += 5; }

                    this.moveCount++;
                }
                if (this.moveCount == MOVINGSPACEBOSS) {
                    if (this.direction == "right") { this.direction = "left"; this.moveCount = 0; }
                    else if (this.direction == "left") { this.direction = "right"; this.moveCount = 0; }



                }

            }
        }
    }


    class Cube {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.w = WALLSIZE;
            this.h = WALLSIZE;
            this.life = 5;
        }

        draw() {
            switch (this.life) {
                case 1:
                    this.w = WALLSIZE / 2;
                    //1
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 13 * BLOCKSIZE, this.y + BLOCKSIZE * 8, BLOCKSIZE * 1, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 8, BLOCKSIZE * 1, BLOCKSIZE);

                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + BLOCKSIZE, this.y + BLOCKSIZE * 7, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 3 * BLOCKSIZE, this.y + BLOCKSIZE * 7, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 2 * BLOCKSIZE, this.y + BLOCKSIZE * 6, BLOCKSIZE, BLOCKSIZE);
                    //dessous

                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 9, BLOCKSIZE * 3, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 14 * BLOCKSIZE, this.y + BLOCKSIZE * 9, BLOCKSIZE * 2, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + BLOCKSIZE, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 11, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 11, BLOCKSIZE * 1, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 18 * BLOCKSIZE, this.y + BLOCKSIZE * 11, BLOCKSIZE * 3, BLOCKSIZE);
                    break;
                case 2:
                    this.w = WALLSIZE / 2;
                    //1
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 7 * BLOCKSIZE, this.y + BLOCKSIZE * 4, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 12 * BLOCKSIZE, this.y + BLOCKSIZE * 4, BLOCKSIZE, BLOCKSIZE);
                    //2
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 3 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 9 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 17 * BLOCKSIZE, this.y + BLOCKSIZE * 5, BLOCKSIZE, BLOCKSIZE);
                    //3
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y + BLOCKSIZE * 6, BLOCKSIZE * 2, BLOCKSIZE);
                    //4
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + BLOCKSIZE, this.y + BLOCKSIZE * 7, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 2 * BLOCKSIZE, this.y + BLOCKSIZE * 7, BLOCKSIZE * 2, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y + BLOCKSIZE * 7, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 19 * BLOCKSIZE, this.y + BLOCKSIZE * 7, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 7, BLOCKSIZE, BLOCKSIZE);

                    //dessous
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 13 * BLOCKSIZE, this.y + BLOCKSIZE * 8, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 9, BLOCKSIZE * 6, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 14 * BLOCKSIZE, this.y + BLOCKSIZE * 9, BLOCKSIZE * 6, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 11, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 11, BLOCKSIZE * 5, BLOCKSIZE);
                    break;
                case 3:
                    this.w = WALLSIZE / 2;
                    //1
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 2 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 5 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE * 3, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 7 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 9 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE, BLOCKSIZE);
                    //2
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 7 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 17 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE, BLOCKSIZE);


                    //3
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + BLOCKSIZE, this.y + BLOCKSIZE * 4, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 4 * BLOCKSIZE, this.y + BLOCKSIZE * 4, BLOCKSIZE, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 10 * BLOCKSIZE, this.y + BLOCKSIZE * 4, BLOCKSIZE * 5, BLOCKSIZE);

                    // dessous
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 5, BLOCKSIZE * 18, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 6, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 7, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 8, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 13 * BLOCKSIZE, this.y + BLOCKSIZE * 8, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 9, BLOCKSIZE * 6, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 14 * BLOCKSIZE, this.y + BLOCKSIZE * 9, BLOCKSIZE * 6, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 11, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 11, BLOCKSIZE * 5, BLOCKSIZE);
                    break;
                case 4:
                    this.w = WALLSIZE / 2;
                    //4 premieres
                    //1
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 4 * BLOCKSIZE, this.y, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 12 * BLOCKSIZE, this.y, BLOCKSIZE, BLOCKSIZE);

                    //2
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 3 * BLOCKSIZE, this.y + BLOCKSIZE, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 11 * BLOCKSIZE, this.y + BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);

                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                    //3
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 2 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE * 6, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 11 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE * 2, BLOCKSIZE);
                    //4
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 14, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 16 * BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 2, BLOCKSIZE);
                    // dessous
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 4, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 5, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 6, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 7, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 8, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 13 * BLOCKSIZE, this.y + BLOCKSIZE * 8, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 9, BLOCKSIZE * 6, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 14 * BLOCKSIZE, this.y + BLOCKSIZE * 9, BLOCKSIZE * 6, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 11, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 11, BLOCKSIZE * 5, BLOCKSIZE);
                    break;
                case 5:
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 4 * BLOCKSIZE, this.y, BLOCKSIZE * 12, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 3 * BLOCKSIZE, this.y + BLOCKSIZE, BLOCKSIZE * 14, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 2 * BLOCKSIZE, this.y + BLOCKSIZE * 2, BLOCKSIZE * 16, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + BLOCKSIZE, this.y + BLOCKSIZE * 3, BLOCKSIZE * 18, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 4, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 5, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 6, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 7, BLOCKSIZE * 20, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 8, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 13 * BLOCKSIZE, this.y + BLOCKSIZE * 8, BLOCKSIZE * 7, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 9, BLOCKSIZE * 6, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 14 * BLOCKSIZE, this.y + BLOCKSIZE * 9, BLOCKSIZE * 6, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 10, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x, this.y + BLOCKSIZE * 11, BLOCKSIZE * 5, BLOCKSIZE);
                    ctx.fillStyle = "grey";
                    ctx.fillRect(this.x + 15 * BLOCKSIZE, this.y + BLOCKSIZE * 11, BLOCKSIZE * 5, BLOCKSIZE);
                    break;
                case 0:
                    break;
            }


        }

    }

    document.onkeydown = function handleKeyDown(event) {
        var keyPressed = event.keyCode;
        if (keyPressed == LEFT_KEY) { s.x -= s.vel }
        if (keyPressed == RIGHT_KEY) { s.x += s.vel }
        if (keyPressed == JUMP_KEY) {

            if (s.ammo > 0 && s.ammo < 6) {
                var b = new ShipShot(s.x + (SHIPSIZE / 2), s.y - (SHIPSIZE / 2));
                shipshots.push(b);
                s.ammo -= 1;
                FIRESOUND.play();
            }

        }
        if (keyPressed == ESC_KEY) { clearInterval(run) }
    }


    s = new ship(SCREENWIDTH / 2, SCREENHEIGHT - SHIPSIZE * 2, 50, 50)

    cubes = [];
    c1 = new Cube(SCREENWIDTH - 150, SCREENHEIGHT - 200);
    cubes.push(c1);
    c2 = new Cube(SCREENWIDTH - 300, SCREENHEIGHT - 200);
    cubes.push(c2);
    c3 = new Cube(SCREENWIDTH - 550, SCREENHEIGHT - 200);
    cubes.push(c3);
    c4 = new Cube(SCREENWIDTH - 700, SCREENHEIGHT - 200);
    cubes.push(c4);

    aliens = [];


    a1 = new Aliens(50, 50, "#ed00ec");
    aliens.push(a1);
    a2 = new Aliens(150, 50, "#ed00ec");
    aliens.push(a2);
    a3 = new Aliens(250, 50, "#ed00ec");
    aliens.push(a3);
    a4 = new Aliens(350, 50, "#ed00ec");
    aliens.push(a4);
    a5 = new Aliens(450, 50, "#ed00ec");
    aliens.push(a5);
    a6 = new Aliens(550, 50, "#ed00ec");
    aliens.push(a6);

    // 2
    a11 = new Aliens(50, 125, "#00F4EF");
    aliens.push(a11);
    a12 = new Aliens(150, 125, "#00F4EF");
    aliens.push(a12);
    a13 = new Aliens(250, 125, "#00F4EF");
    aliens.push(a13);
    a14 = new Aliens(350, 125, "#00F4EF");
    aliens.push(a14);
    a15 = new Aliens(450, 125, "#00F4EF");
    aliens.push(a15);
    a16 = new Aliens(550, 125, "#00F4EF");
    aliens.push(a16);

    //3
    a21 = new Aliens(50, 200, "#00F800");
    aliens.push(a21);
    a22 = new Aliens(150, 200, "#00F800");
    aliens.push(a22);
    a23 = new Aliens(250, 200, "#00F800");
    aliens.push(a23);
    a24 = new Aliens(350, 200, "#00F800");
    aliens.push(a24);
    a25 = new Aliens(450, 200, "#00F800");
    aliens.push(a25);
    a26 = new Aliens(550, 200, "#00F800");
    aliens.push(a26);

    //Boss
    bossFinal = new Aliens(50, 75, "red", true);

    var canva = document.getElementById('c');
    var ctx = canva.getContext('2d');





    function draw() {
        if (boss) {
            console.log("zqd");
            if (aparaitreBoss) {
                aliens.push(bossFinal);
                aparaitreBoss = false;
            }
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, SCREENWIDTH, SCREENHEIGHT);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Your score :" + score, 10, SCREENHEIGHT - 30);


        for (l = 0; l < parseInt(s.life); l++) {

            //1
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40) + 2 * HEARTBLOCKSIZE, SCREENHEIGHT - 50, HEARTBLOCKSIZE * 2, HEARTBLOCKSIZE);
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40) + 7 * HEARTBLOCKSIZE, SCREENHEIGHT - 50, HEARTBLOCKSIZE * 2, HEARTBLOCKSIZE);
            //2
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40) + HEARTBLOCKSIZE, SCREENHEIGHT - 50 + HEARTBLOCKSIZE, HEARTBLOCKSIZE * 4, HEARTBLOCKSIZE);
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40) + HEARTBLOCKSIZE * 6, SCREENHEIGHT - 50 + HEARTBLOCKSIZE, HEARTBLOCKSIZE * 4, HEARTBLOCKSIZE);
            //3
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40), SCREENHEIGHT - 50 + HEARTBLOCKSIZE * 2, HEARTBLOCKSIZE * 11, HEARTBLOCKSIZE);
            //4
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40), SCREENHEIGHT - 50 + HEARTBLOCKSIZE * 3, HEARTBLOCKSIZE * 11, HEARTBLOCKSIZE);
            //5
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40) + HEARTBLOCKSIZE, SCREENHEIGHT - 50 + HEARTBLOCKSIZE * 4, HEARTBLOCKSIZE * 9, HEARTBLOCKSIZE);
            //6
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40) + HEARTBLOCKSIZE * 2, SCREENHEIGHT - 50 + HEARTBLOCKSIZE * 5, HEARTBLOCKSIZE * 7, HEARTBLOCKSIZE);
            //7
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40) + HEARTBLOCKSIZE * 3, SCREENHEIGHT - 50 + HEARTBLOCKSIZE * 6, HEARTBLOCKSIZE * 5, HEARTBLOCKSIZE);
            //8
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40) + HEARTBLOCKSIZE * 4, SCREENHEIGHT - 50 + HEARTBLOCKSIZE * 7, HEARTBLOCKSIZE * 3, HEARTBLOCKSIZE);
            //9
            ctx.fillStyle = "red";
            ctx.fillRect(150 + (l * 40) + HEARTBLOCKSIZE * 5, SCREENHEIGHT - 50 + HEARTBLOCKSIZE * 8, HEARTBLOCKSIZE, HEARTBLOCKSIZE);

        }

        s.draw();
        ammo = parseInt(s.ammo);
        for (m = 0; m < ammo; m++) {
            if (ammo < 6) {

                ctx.fillStyle = 'green';
                ctx.fillRect(SCREENWIDTH - 150 + (m * 10), SCREENHEIGHT - 50, 3, 10);
            }
        }

        for (c in cubes) {


            for (a in aliens) {
                if (aliens[a].x >= cubes[c].x && aliens[a].x < (cubes[c].x + cubes[c].w)) {
                    if (aliens[a].y + ALIENSIZE >= cubes[c].y && aliens[a].y + ALIENSIZE < (cubes[c].y + cubes[c].h)) {
                        aliens[a].life -= 1;
                        if (aliens[a].life == 0) {
                            aliens.splice(a, 1);
                            HITWALL.play();

                        }
                        cubes[c].life -= 1;
                        if (cubes[c].life <= 0) { cubes.splice(c, 1); }

                    }
                }
            }
            for (t in aliensShots) {
                if (aliensShots[t].x >= cubes[c].x && aliensShots[t].x < (cubes[c].x + cubes[c].w)) {
                    if (aliensShots[t].y >= cubes[c].y && aliensShots[t].y > (cubes[c].y - cubes[c].w)) {
                        aliensShots.splice(t, 1);
                        cubes[c].life -= 1;
                        HITWALL.play();

                    }
                }
            }

            for (t in shipshots) {


                if (shipshots[t].x >= cubes[c].x && shipshots[t].x < (cubes[c].x + WALLSIZE)) {
                    if (shipshots[t].y >= cubes[c].y && shipshots[t].y > (cubes[c].y + WALLSIZE)) {
                        shipshots.splice(t, 1);
                    }
                }
            }
            if (cubes[c].life <= 0) {


            } else {
                cubes[c].draw();
            }
        }


        for (a in aliens) {
            aliens[a].draw();
            for (t in shipshots) {

                if (shipshots[t].x >= aliens[a].x && shipshots[t].x < (aliens[a].x + aliens[a].w)) {
                    if (shipshots[t].y >= aliens[a].y && shipshots[t].y < (aliens[a].y + aliens[a].h)) {

                        shipshots.splice(t, 1);
                        aliens[a].life -= 1;
                        HITALIEN.play();
                        if (aliens[a].life <= 0) {
                            aliens.splice(a, 1);
                        }
                        score++;
                    }
                }



            }

            if (aliens[a].x > s.x && aliens[a].x < (s.x + SHIPSIZE)) {
                if (aliens[a].y > s.y && aliens[a].y < (s.y + SHIPSIZE)) {
                    s.life--;
                    aliens.splice(a, 1);


                }
            }
            for (t in aliensShots) {
                if (aliensShots[t].x >= s.x && aliensShots[t].x < (s.x + s.w)) {
                    if (aliensShots[t].y >= s.y && aliensShots[t].y > (s.y - s.h)) {
                        aliensShots.splice(t, 1);
                        s.life -= 1;
                        HITSHIP.play();
                    }
                }
            }

            if (aliens[a].y + ALIENSIZE == SCREENHEIGHT - SHIPSIZE) { s.life--; }
        }

        if (s.life <= 0) {
            clearInterval(run)
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, SCREENWIDTH, SCREENHEIGHT);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText("GAMMEOVER", SCREENWIDTH / 3 + 100, SCREENHEIGHT / 2);
            ctx.fillStyle = "white";
            ctx.font = "15px Arial";
            ctx.fillText("your score : " + score, SCREENWIDTH / 3 + 100, SCREENHEIGHT / 2 + 100);

        }
        for (t in shipshots) {
            shipshots[t].draw();
        }

        if (parseInt(s.ammo) <= 0) {
            setTimeout(reload, 3000);
            s.ammo = 6;
        }


        for (p in aliensShots) {
            aliensShots[p].draw();
            console.log(p);
        }



        if (aliens.length == 0) {
            if (typeof (aparaitreBoss) == "undefined") {
                boss = true;
                aparaitreBoss = true;
            }
            else {
                clearInterval(run)
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, SCREENWIDTH, SCREENHEIGHT);
                ctx.fillStyle = "white";
                ctx.font = "20px Arial";
                ctx.fillText("YOU WIN !", SCREENWIDTH / 3 + 100, SCREENHEIGHT / 2);
                ctx.fillStyle = "white";
                ctx.font = "15px Arial";
                ctx.fillText("your score : " + score, SCREENWIDTH / 3 + 100, SCREENHEIGHT / 2 + 100);
            }
        }





        if (s.life <= 0) {
            clearInterval(run)
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, SCREENWIDTH, SCREENHEIGHT);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText("GAMMEOVER", SCREENWIDTH / 3 + 100, SCREENHEIGHT / 2);
            ctx.fillStyle = "white";
            ctx.font = "15px Arial";
            ctx.fillText("your score : " + score, SCREENWIDTH / 3 + 100, SCREENHEIGHT / 2 + 100);

        }

        timer += 1;

    }

    function reload() {
        s.ammo = 5;

    }

    function aliensFire() {

        if (aliens[0].boss != true) {
            var rand = Math.floor(Math.random() * aliens.length);
            var p = new AlienShot(aliens[rand].x + (ALIENSIZE / 2), aliens[rand].y + (ALIENSIZE / 2));
            aliensShots.push(p);

        }
        if (aliens[0].boss) {


            var p1 = new AlienShot(aliens[0].x + (ALIENSIZE - 4), aliens[0].y + (ALIENSIZE - 20), true, "right");
            var p2 = new AlienShot(aliens[0].x + (ALIENSIZE - 7), aliens[0].y + (ALIENSIZE - 20), true);
            var p3 = new AlienShot(aliens[0].x + (ALIENSIZE - 10), aliens[0].y + (ALIENSIZE - 20), true, "left");


            aliensShots.push(p1);
            aliensShots.push(p2);
            aliensShots.push(p3);
        }
        THEME.play();
    }




    var aliensF = setInterval(aliensFire, 2000);


    var run = setInterval(draw, 100);


}