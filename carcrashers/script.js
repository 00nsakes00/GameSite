//https://labs.phaser.io/edit.html?src=src%5Cphysics%5Carcade%5Coverlap%20zone.js
var car;
var timetext;
var overlapTriggered = false;
var los_buttin;
var cursors;
let continue_buttin;
var car_text;
var finaltext;
var drive;
let timevar = 0
var plant;
let x;
let car_group;
let cop_group;
var car_group_var
var checker_cross; 
let minus_speed = 0 ;
var SteeringWheel;
var carSpeed = 0;
var staticFriction = 1;
let lap1 = 0;
let lap2 = 0;
var car_state = 100;
let lapstxt;
let mechanic_group;
let road_tile1;
let road_tile2;
let start_buttin;
var collider;
var leftgroup;
var rightgroup;
var rect2;
var rect;
var target = new Phaser.Math.Vector2();
var i = 0;
var ii =0;

var Main = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Done(){
      Phaser.Scene.call(this, {key: 'main'});
    },

 preload() {
  this.lights.enable();

  this.load.image('Black_viper', 'Black_viper.png');
  this.load.image('Audi', 'Audi.png');
  this.load.image('vanilla_car', 'Car.png');
  this.load.image('mini_truck', 'Mini_truck.png');
  this.load.image('mini_van', 'Mini_van.png');
  this.load.image('taxi', 'taxi.png');
  this.load.image('truck', 'truck.png');
  this.load.image('cop', 'Police.png');
  this.load.image('side', 'side.png');
  this.load.image('fix_coin', 'pow_up.png');
  this.load.image('background', 'background.svg');
  this.load.image('checker', 'checker.png');
  this.load.image('border', 'border.png');
  this.load.image('line', 'line_.png');
  this.load.image('fuel','fuel.png');
  this.load.image('border_flip', 'border_flip.png');
  this.load.image('ambulance', 'Ambulance.png');
  this.load.image('greypanel', 'grey_panel.png');
  this.load.spritesheet('balls', 'sprotshet.png', { frameWidth: 60, frameHeight: 60 });

  //lose animation
  this.load.image('blue', 'blue.svg');
  this.load.image('red', 'red.svg');

  //cop animation
  this.load.image('cop_1', '1.png');
  this.load.image('cop_2', '2.png');
  this.load.image('cop_3', '3.png');

  //sounds
  this.load.audio('carsound', 'carsound.mp3');
  this.load.audio('crashnoise', 'crashnoise.wav')

  //lose screen
  this.load.image('button', 'grey_button14.png');
      this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  
},

create() {
  //animations
  this.anims.create({
        key: 'cop_light',
        frames: [
            { key: 'cop_1' },
            { key: 'cop_2' },
            { key: 'cop_3' }
        ],
        frameRate: 5,
        repeat: -1
    });

  rect = new Phaser.Geom.Rectangle(-70, 5, 100, 900);//445
  leftgroup = this.add.group({ key: 'balls', frame: [0,1,2,3,4,5], frameQuantity: 8 });

  rect2 = new Phaser.Geom.Rectangle(500, 5, 100, 900);//445
  rightgroup = this.add.group({ key: 'balls', frame: [0,1,2,3,4,5], frameQuantity: 8 });

   i = 0;
   ii = 0;
  // det_state.setText('Health' + car_state);
  
  var group = this.physics.add.staticGroup();
  car_group = this.physics.add.group();


  drive_1 = this.add.image(300, 300, 'background').scaleX = .85;
 

 //var side_1 = this.physics.add.sprite(15, 100, 'border');
 //var side_2 = this.physics.add.sprite(15, 600, 'border'); 

 //var side_3 = this.physics.add.sprite(585, 100, 'border');
 //var side_4 = this.physics.add.sprite(585, 600, 'border');

 road_tile1 = this.add.image(325, 150,'line');
 road_tile2 = this.add.image(325, 280, 'line');
 road_tile3 = this.add.image(295, 150, 'line');
 road_tile4 = this.add.image(295, 280, 'line');

  mechanic_group = this.physics.add.group();
  
  car = this.physics.add.image(200, 100, 'Audi');
  car.body.setAllowGravity(false);
  car.body.setSize(80, 195,30);

  var coin_add = this.time.addEvent({ delay: 20000, callback: coin_func, callbackScope: this, loop: true });

  function coin_func(){
  //  var ran_choose = Phaser.Math.Between(1,10);
   // if(ran_choose == 2){
    mechanic_group.create(Phaser.Math.Between(17, 583),700, 'fix_coin');
  //  }
  }

  var timedEvent = this.time.addEvent({ delay: 1900, callback: onEvent, callbackScope: this, loop: true });

  function onEvent() {

    var type_car;
    var lane = Phaser.Math.Between(1,2);
    if(lane == 1){
      car_x = Phaser.Math.Between(100,401);
    }

    if(lane == 2){
      car_x = Phaser.Math.Between(400, 500);
    }
    var car_y = 700
    type_car = Phaser.Math.Between(0, 8);
    if (type_car == 1) {
     this.sound.play('carsound');
     car_group.create(car_x, car_y, 'Audi').body.setSize(80, 195,30);
    }

    if (type_car == 2) {
     this.sound.play('carsound');
     car_group.create(car_x, car_y, 'vanilla_car').body.setSize(80, 195,30);
    }

    if (type_car == 3) {
      this.sound.play('carsound');
      car_group.create(car_x, car_y, 'mini_truck').body.setSize(80, 195,30);
    }

    if (type_car == 4) {
      this.sound.play('carsound');
      car_group.create(car_x, car_y, 'mini_van').body.setSize(80, 195,30);
    }

    if (type_car == 5) {
      this.sound.play('carsound');
      car_group.create(car_x, car_y, 'taxi').body.setSize(80, 195,30);
    }

    if (type_car == 6) {
      this.sound.play('carsound');
      car_group.create(car_x, car_y, 'truck').body.setSize(80, 195,30);
    }

    if(type_car == 7){
      this.sound.play('carsound');
      car_group.create(car_x, car_y, 'cop').body.setSize(80, 195, 30);
    }

    if(type_car == 8){
      this.sound.play('carsound');
      car_group.create(car_x, car_y, 'ambulance').body.setSize(80, 195, 30);
    }
  }

  car.setDamping(true);
  car.setDrag(.9);
  car.setMaxVelocity(700);

  collider = this.physics.add.overlap(car_group, car, collide, null, this);

  this.physics.add.overlap(mechanic_group, car, fix_crash, null, this);

  cursors = this.input.keyboard.createCursorKeys();


  this.physics.add.overlap(mechanic_group, car, mechanic_add, null,this);

  function fix_crash(){
    //mechanic_group.children.iterate(function (child) {
      //child.destroy();
    //});
    ///mechanic_group.clear(true);
    mechanic_group.clear(true);
    car_state += 25;
  }

  function over_line(){
    //this.scene.run('lose');
    //this.scene.stop('main');
  }

  function mechanic_add(){
    if(car_state < 100){
      car_state += 1;
    }
  }

  function collide() {
  //car.body.checkCollision.none = true;
  var continuetext;
  this.sound.play('crashnoise');
  this.anims.create({
        key: 'loselight',
        frames: [
            { key: 'red' },
            { key: 'blue' },
        ],
        frameRate: 5,
        repeat: -1
    });

  var copslight = this.physics.add.sprite(300,300,'blue').play('loselight');

   timedEvent.paused = true;
   coin_add.paused = true;

   this.physics.world.removeCollider(collider);
   this.physics.world.removeCollider(fix_crash);
  
   var add = this.add;
  var word;
      los_buttin = this.add.image(300,300, 'button').setInteractive();
      
     WebFont.load({
        google: {
            families: [ 'Oswald' ]
        },
        active: function ()
        {
           word = add.text(115, 170, 'You Crashed!', { fontFamily: 'Oswald', fontSize: 80, color: '#ffffff' });

           finaltext = add.text(225, 350, 'Final score: ' + timevar, {fontFamily: 'Oswald', fontSize:30, color: '#ffffff'});

          continuetext = add.text(250, 275, 'Continue', {fontFamily: 'Oswald', fontSize:30, color: '#000000'});

        }
    });

    los_buttin.on('pointerover', function (event){
      los_buttin.setTint(0x7878ff);
    },this);

    los_buttin.on('pointerout', function (event){
    los_buttin.setTint();
    }, this);

    los_buttin.on('pointerdown', function (event){
      timedEvent.paused = false;
      coin_add.paused = false;
      los_buttin.destroy();
      word.destroy();
      copslight.destroy();
      finaltext.destroy();
      continuetext.destroy();
      car_state = 100;
      timevar = 0;
      collider = this.physics.add.overlap(car_group, car, collide, null, this);

      fix_crash = this.physics.add.overlap(mechanic_group, car, fix_crash, null, this);
      clearInterval()
      return;
     // car.body.checkCollision.none = false;
    }, this);
  }

  function cop_collide() {
   // this.scene.run('lose');
   // this.scene.remove('main');
  }

      

  this.add.image(70, 600, 'greypanel').setScale(1.5);
  var add = this.add;
   WebFont.load({
        google: {
            families: [ 'Oswald' ]
        }
     });

        car_text = add.text(5, 560, '', {fontFamily: 'Oswald', fontSize: '20px', fill: '#000000'});

         timetext = add.text(5, 540, '', {fontFamily: 'Oswald', fontSize: '20px', fill: '#000000'});


 

 },
  update(){
    Phaser.Actions.PlaceOnRectangle(leftgroup.getChildren(), rect, i);

    i++;
    ii++;

    if (i === leftgroup.length)
    {
        i = 0;
    }

     Phaser.Actions.PlaceOnRectangle(rightgroup.getChildren(), rect2, i);


    if (ii === rightgroup.length)
    {
        ii = 0;
    }

   mechanic_group.setVelocityY(-200);
   
  if (cursors.right.isDown){
      car_state = car_state - .5;
      car.setVelocityX(1500);
      timevar += 1;
    }

    if(cursors.left.isDown){
      
      car_state = car_state - .5;
      timevar += 1;
      car.setVelocityX(-1500);
    }

    car_group.setVelocityY(-450);

    var add = this.add;
    var anims = this.anims;
    var physics = this.physics;

    function healthlos(){
      setInterval(clear, 0.001);
      function clear(){
        car_group.clear(true);
        mechanic_group.clear(true)
      }
     
      car.body.checkCollision.none = true;

      var continuetext;
  //this.sound.play('crashnoise');
    anims.create({
        key: 'loselight',
        frames: [
            { key: 'red' },
            { key: 'blue' },
        ],
        frameRate: 5,
        repeat: -1
    });

  var copslight = physics.add.sprite(300,300,'blue').play('loselight');


   //physics.world.removeCollider(collider);
  
   //var add = this.add;
  var word;
      los_buttin = add.image(300,300, 'button').setInteractive();
      
     WebFont.load({
        google: {
            families: [ 'Oswald' ]
        },
        active: function ()
        {
           word = add.text(115, 170, 'You Crashed!', { fontFamily: 'Oswald', fontSize: 80, color: '#ffffff' });

           finaltext = add.text(225, 350, 'Final score: ' + timevar, {fontFamily: 'Oswald', fontSize:30, color: '#ffffff'});

          continuetext = add.text(250, 275, 'Continue', {fontFamily: 'Oswald', fontSize:30, color: '#000000'});

        }
    });

    los_buttin.on('pointerover', function (event){
      los_buttin.setTint(0x7878ff);
    },this);

    los_buttin.on('pointerout', function (event){
    los_buttin.setTint();
    }, this);

    los_buttin.on('pointerdown', function (event){
     
      los_buttin.destroy();
      word.destroy();
      copslight.destroy();
      finaltext.destroy();
      continuetext.destroy();
      car_state = 100;
      timevar = 0;
      car.body.checkCollision.none = false;
      return;
    }, this);
    }

    if(car_state == 0){
      healthlos();
    }

    car_text.setText('Health: ' + Math.floor(car_state));
    timetext.setText('Score: ' + timevar);
  }


}); 


var MainMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  intitialize:
    function main(){
      Phaser.Scene.Call(this, {key: 'menu'});
    },

    preload(){
      this.load.image('button', 'grey_button14.png');
      
    },

    create(){
       continue_buttin = this.add.image(300,300, 'button').setInteractive();

       this.add.text(260, 280, 'Play', {fontSize: '32px', fill: 'ffffff'})
    },

    update(){
      continue_buttin.on('pointerover', function (event){
      continue_buttin.setTint(0x7878ff);
    },this);

    continue_buttin.on('pointerout', function (event){
    continue_buttin.setTint();
    }, this);

    continue_buttin.on('pointerdown', function (event){
      this.scene.stop('menu');
      this.scene.run('main');
    }, this);
    }
});

var config = {
  type:Phaser.AUTO,
  width: 600,
  height: 600,
  scene: [Main],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

var game = new Phaser.Game(config);
