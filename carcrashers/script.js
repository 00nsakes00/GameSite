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


var Main = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Done(){
      Phaser.Scene.call(this, {key: 'main'});
    },

 preload() {
  this.lights.enable();

  this.load.image('Black_viper', 'game/Black_viper.png');
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

  

  // det_state.setText('Health' + car_state);
  this.lights.addLight(400, 300, 300).setIntensity(0.5);
  var group = this.physics.add.staticGroup();
  car_group = this.physics.add.group();


  drive_1 = this.add.image(300, 300, 'background');

 var side_1 = this.physics.add.sprite(15, 100, 'border');
 var side_2 = this.physics.add.sprite(15, 600, 'border'); 

 var side_3 = this.physics.add.sprite(585, 100, 'border');
 var side_4 = this.physics.add.sprite(585, 600, 'border');

 road_tile1 = this.add.image(325, 150,'line');
 road_tile2 = this.add.image(325, 280, 'line');
 road_tile3 = this.add.image(295, 150, 'line');
 road_tile4 = this.add.image(295, 280, 'line');

  mechanic_group = this.physics.add.group();
  var ran_choose = Phaser.Math.Between(1,3);

  car = this.physics.add.image(200, 100, 'Audi');
  car.body.setAllowGravity(false);
  car.body.setSize(80, 195,30);

  if(ran_choose == 2){
    mechanic_group.create(Phaser.Math.Between(17, 583),500, 'fix_coin');
  }

  var timedEvent = this.time.addEvent({ delay: 4000, callback: onEvent, callbackScope: this, repeat: 9 });

  function onEvent() {

    var type_car;
    var lane = Phaser.Math.Between(1,2);
    console.log(lane);
    if(lane == 1){
      car_x = Phaser.Math.Between(100,200);
    }

    if(lane == 2){
      car_x = Phaser.Math.Between(400, 500);
    }
    console.log(lane);
    var car_y = 500
    type_car = Phaser.Math.Between(0, 9);
    if (type_car == 1) {
     car_group.create(car_x, car_y, 'Audi').body.setSize(80, 195,30);
     this.sound.play('carsound');
    }

    if (type_car == 2) {
     car_group.create(car_x, car_y, 'vanilla_car').body.setSize(80, 195,30);
     this.sound.play('carsound');
    }

    if (type_car == 3) {
      car_group.create(car_x, car_y, 'mini_truck').body.setSize(80, 195,30);
      this.sound.play('carsound');
    }

    if (type_car == 4) {
      car_group.create(car_x, car_y, 'mini_van').body.setSize(80, 195,30);
      this.sound.play('carsound');
    }

    if (type_car == 5) {
      car_group.create(car_x, car_y, 'taxi').body.setSize(80, 195,30);
      this.sound.play('carsound');
    }

    if (type_car == 6) {
      car_group.create(car_x, car_y, 'truck').body.setSize(80, 195,30);
      this.sound.play('carsound');
    }

    if(type_car == 7){
      car_group.create(car_x, car_y, 'cop').body.setSize(80, 195, 30);
      this.sound.play('carsound');
    }

    if(type_car == 8){
      car_group.create(car_x, car_y, 'ambulance').body.setSize(80, 195, 30);
      this.sound.play('carsound');
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
    mechanic_group.children.iterate(function (child) {
      child.destroy();
    });
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

 
 
  function off() {
    console.log('off');
  }

  if(car_state <= 0){
    console.log("LLLLEEEESSSSSSS")
  }

  function collide() {
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
   this.physics.world.removeCollider(collider);
  
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
      los_buttin.destroy();
      word.destroy();
      copslight.destroy();
      finaltext.destroy();
      continuetext.destroy();
      car_state = 100;
      timevar = 0;
      collider = this.physics.add.overlap(car_group, car, collide, null, this);
      return;
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
    
   mechanic_group.setVelocityY(-200);
   

  

    car_group.setVelocityY(-450);
  

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
