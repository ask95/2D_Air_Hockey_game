
//game elements
var canvas;
var elem;
var keystate;
var rightScore=0;
var leftScore=0;
var d = 3.0;

var audio1 = new Audio('coin_flip.wav'); //for puck collision with wall
var audio2= new Audio('click.wav');      //for puck collision with paddles
var audio3 = new Audio('goal.wav');      //for goal scoring
var audio4 = new Audio('cheering.wav');  //for winning
function initiate(){
   
  
		
  canvas = document.getElementById('canvas');
  canvas = canvas.getContext('2d');
  
  canvas.strokeStyle = "#000000"
  
  
  //table parameters
  var goalWidth= 200.0;
  var tableWidth = 500.0;
  var tableLength = 1000.0;
  
  
  
  
  
  
  //Puck object
  puck = {
  x : tableLength/2.0,
  y : tableWidth/2.0,
  rad:	25.0,

  //Speed of puck in x and y direction*/
  vx : 0.0, //initial velocity
  vy : 0.0, //initial velocity
  m : 2.0,
  
  };
  
  
  //left paddle object
  leftPaddle = {
  name : '',
  x : 100.0,
  y : tableWidth/2,
  rad 	: 50.0,
  vx : 0.0,
  vy : 0.0,
  m: 5.0,
  won:0, //property to be used as flag variable later
  goal:0,
  };
  
  //Right paddle object
  rightPaddle = {
  name : '',
  x : 900.0,
  y : tableWidth/2,
  rad   : 50.0,
  vx : 0.0,
  vy : 0.0,
  m : 5.0,
  won:0,
  goal:0,
  };
  

  

  
  
  
  var intervalTime=0.0001;
  alert("Hello! Welcome to 2D Air Hockey!");
  leftPaddle.name=prompt("Player1 please enter your name");
  rightPaddle.name=prompt("Player2 please enter your name");
  
 
		
	function Updateit(){	

		/* Animating  left paddle (user controlled)
		  
		*/
		
		addEventListener('keydown', whatKey);
		addEventListener('keyup', stop);
		/*
		Only when key is pressed, paddle gets a velocity
		If up key is pressed, paddle gets velocity only in y direction
		this is crucial for collision formula used ahead
		Hence if the paddle is to be stopped at a point, just press a particular key.
		*/
		
		function whatKey(evt){
			
			switch(evt.keyCode){
			
			case 65:
				leftPaddle.vx = -d;
				
				break;
				
			case 68:
				leftPaddle.vx = d;
				
				break;
				
			case 87:
				leftPaddle.vy = -d;
				
				break;
				
			case 83:
				leftPaddle.vy =d;
				
				break;
				
			case 37: 
				rightPaddle.vx = -d;
				break;
				
			case 39:
				rightPaddle.vx = d;
				
				break;
				
			case 38:
				rightPaddle.vy = -d;
				
				break;
				
			case 40:
				rightPaddle.vy = d;
				
				break;
					
					
			
			}			
		}
		
		
		function stop(evt){
			leftPaddle.vy =0.0;
			leftPaddle.vx = 0.0;
			rightPaddle.vy =0.0;
			rightPaddle.vx = 0.0;
		}
		
		leftPaddle.x += leftPaddle.vx;
		leftPaddle.y += leftPaddle.vy;
		rightPaddle.x += rightPaddle.vx;
		rightPaddle.y += rightPaddle.vy;
		
		/*if (leftPaddle.x <leftPaddle.rad || leftPaddle.x > tableLength/2-leftPaddle.rad || leftPaddle.y <leftPaddle.rad || leftPaddle.y > tableWidth-leftPaddle.rad){
			
				 leftPaddle.vx = 0;
				 leftPaddle.vy = 0;
			
		}*/
		
		//to keep left paddle in side of table
		
		if (leftPaddle.x <leftPaddle.rad){
			leftPaddle.x = leftPaddle.rad;
		}
		
		if (leftPaddle.x > tableLength/2-leftPaddle.rad ){
			leftPaddle.x = tableLength/2-leftPaddle.rad;
		}
		
		if (leftPaddle.y <leftPaddle.rad){
			leftPaddle.y = leftPaddle.rad;
		}
		
		if (leftPaddle.y > tableWidth-leftPaddle.rad){
			leftPaddle.y = tableWidth-leftPaddle.rad;
		}
		
		//to keep right paddle in his side of table
		
		if (rightPaddle.x <tableLength/2+rightPaddle.rad){
			rightPaddle.x = tableLength/2+rightPaddle.rad;
		}
		
		if (rightPaddle.x > tableLength-rightPaddle.rad){
			rightPaddle.x = tableLength-rightPaddle.rad;
		}	
		
		if (rightPaddle.y <rightPaddle.rad){
			rightPaddle.y = rightPaddle.rad;
		}
		if (rightPaddle.y > tableWidth-rightPaddle.rad){
			rightPaddle.y = tableWidth-rightPaddle.rad;
		}
		
		/* Reflection of puck off walls*/
		
		//most simple logic possible
		
		if (puck.x < puck.rad || puck.x > tableLength - puck.rad) {
			
			puck.vx *= -1.0;
			audio1.play();
			
		}
		
		//just to make sure that worst case scenario, puck doesn't leave table
		if (puck.x > tableLength - puck.rad){
			puck.x = Math.min(puck.x, tableLength-puck.rad );
			audio1.play();
		}
		
		if ( puck.x < puck.rad){
			puck.x = Math.max(puck.x, puck.rad );
			audio1.play();
		}
				
		//most simple logic possible
		
		if (puck.y-(tableWidth-puck.rad)>0 || puck.y-puck.rad < 0) {
			puck.vy*= -1.0;
			audio1.play();
			
			
		}
		
		
		//just to make sure that worst case scenario, puck doesn't leave table
		
		if (puck.y > tableWidth - puck.rad){
			puck.y = Math.min(puck.y, tableWidth-puck.rad );
			audio1.play();
		}
		
		if (puck.y < puck.rad){
			puck.y = Math.max(puck.y, puck.rad );
			audio1.play();
		}
		
		// This is for goal post!
		
		if ((puck.y>(tableWidth/2)-(goalWidth/2)) && (puck.y<(tableWidth/2)+(goalWidth/2))) {
			if(puck.x==puck.rad) {
			
			audio3.play();
			//reset the puck to the loser of the previous goal
			puck.x = tableLength/2 - 100;
			puck.y = tableWidth/2;
			puck.vx = 0
			puck.vy = 0
			
			
			//score update 
			 rightScore+=1;
			 rightPaddle.goal=1;
			 
			 
			 //winning text display condition
			 rightPaddle.won=0;
			 if(rightScore==7)
			 {
			 audio4.play();
			 rightPaddle.won=1;
			 d=0;
			 
			 }
			 
			 //goal display
			 
			 
			 
			}
			
			else if(puck.x==tableLength-puck.rad){
			
			audio3.play();
			//reset the puck to the loser of the previous goal
			puck.x = tableLength/2 + 100;
			puck.y = tableWidth/2;
			puck.vx = 0
			puck.vy = 0
			
			//score update 
			 leftScore+=1;
			 leftPaddle.goal=1;
			 //winning text display condition
			 
			 if(leftScore==7)
			 {
			 audio4.play();
			 leftPaddle.won=1;
			 d=0;
			 
			 
			 }
			 
			 //goal display
			 
			 
			}
			
		
		}
		

		
		
		
		
		//  For collisions
		
		//use of 12th std. JEE formula for collision.
		//paddle velocity has been updated earlier accordingly.
		
		if (Math.abs(leftPaddle.x-puck.x) < leftPaddle.rad+ 0.01 && Math.abs(leftPaddle.y-puck.y) < leftPaddle.rad+0.01 ){
			
			audio2.play();
			puck.vx = ((puck.m-leftPaddle.m)/(puck.m+leftPaddle.m))*puck.vx + ((2*leftPaddle.m)/(puck.m+leftPaddle.m))*leftPaddle.vx + 0.7 ;
			puck.vy = ((puck.m-leftPaddle.m)/(puck.m+leftPaddle.m))*puck.vy + ((2*leftPaddle.m)/(puck.m+leftPaddle.m))*leftPaddle.vy + 0.7;
			
			
		}
		
		if (Math.abs(rightPaddle.x-puck.x) < leftPaddle.rad+ 0.01 && Math.abs(rightPaddle.y-puck.y) < leftPaddle.rad+0.01 ){
			
			audio2.play();
			puck.vx = ((puck.m-leftPaddle.m)/(puck.m+rightPaddle.m))*puck.vx + ((2*rightPaddle.m)/(puck.m+rightPaddle.m))*rightPaddle.vx - 0.7;
			puck.vy = ((puck.m-rightPaddle.m)/(puck.m+rightPaddle.m))*puck.vy + ((2*rightPaddle.m)/(puck.m+rightPaddle.m))*rightPaddle.vy - 0.7;
			
		}
		
		puck.x+=puck.vx;
		puck.y+=puck.vy;
		
		
		
		
		
		Draw1();
		
		}
		
		
		
		
 function Draw1(){
 
  
  
  /* Making the air hockey table. */
  canvas.fillStyle = "#303030";
  canvas.strokeStyle = "black";
  canvas.lineWidth = 4;
  canvas.strokeRect(0, 0, tableLength, tableWidth);
  canvas.fillRect(0, 0, tableLength, tableWidth);
  
  canvas.strokeStyle = "white";
  canvas.beginPath();
  canvas.moveTo(tableLength/2 , 0);
  canvas.lineTo(tableLength/2 , tableWidth);
  canvas.stroke();
  canvas.fillStyle = "000000";
  
  canvas.beginPath();
  canvas.arc(tableLength/2, tableWidth/2, 100, 0, Math.PI * 2, false);
  canvas.stroke();
  canvas.beginPath();
  
  canvas.fillStyle = "#FFA500";
  canvas.strokeStyle = "#FFA500";
  canvas.strokeRect(0, tableWidth/2-(goalWidth/2), 20, goalWidth);
  canvas.fillRect(0, tableWidth/2-(goalWidth/2), 20, goalWidth);
  canvas.strokeRect(980, tableWidth/2-(goalWidth/2), 20, goalWidth);
  canvas.fillRect(980, tableWidth/2-(goalWidth/2), 20, goalWidth);
  
  /* Puck drawing*/
  canvas.fillStyle = "yellow";
  canvas.strokeStyle = "black";
  canvas.arc(puck.x, puck.y, puck.rad, 0, Math.PI * 2, false);
  canvas.stroke();
  canvas.fill();
	
 
  
  /* Left paddle drawing*/
  
  canvas.fillStyle = "red";
  canvas.strokeStyle = "black";
  canvas.beginPath();
  canvas.arc(leftPaddle.x, leftPaddle.y, leftPaddle.rad, 0, Math.PI * 2, false);
  canvas.stroke();
  canvas.fill();
  
  /* Right paddle drawing*/
    canvas.fillStyle = "green";
	canvas.strokeStyle = "black";
  canvas.beginPath();
  canvas.arc(rightPaddle.x, rightPaddle.y, rightPaddle.rad, 0, Math.PI * 2, false);
  canvas.stroke();
  canvas.fill();
  
			 //right score display
			 canvas.fillStyle = "white";
			 canvas.font = "bold 24px verdana, sans-serif";
			 canvas.textAlign = "start";
			 canvas.fillText(rightPaddle.name+""+":"+""+rightScore, 800, 100);
			 
			 //left score display
			 canvas.fillStyle = "white";
			 canvas.font = "bold 24px verdana, sans-serif";
			 canvas.textAlign = "start";
			 canvas.fillText(leftPaddle.name+""+":"+""+leftScore, 100, 100);
			 
		
			
			 
			 if(leftPaddle.won==1)
			 {
			 
			 canvas.font = "bold 40px verdana, sans-serif";
			 canvas.textAlign = "start";
			 canvas.fillStyle = 'white';
			 canvas.fillText(leftPaddle.name+" wins!", 400, 250);
			 }
			 
			 else if(rightPaddle.won==1)
			 {
			
			 canvas.font = "bold 40px verdana, sans-serif";
			 canvas.fillStyle = 'white';
			 canvas.textAlign = "start";
			 canvas.fillText(rightPaddle.name+" wins!", 400, 250);
			 }
			 
			 
			 
			
  
  

  
		
	}
	
	/* To generate frames after time interval*/	

   function init() {
   canvas = document.getElementById("canvas");
   canvas = canvas.getContext("2d");
   return setInterval(function(){ Updateit();}, intervalTime);
   }

//VARIABLES DONE WITH, APPLYING FUNCTIONS START.

init();
}

addEventListener("load",initiate);
 