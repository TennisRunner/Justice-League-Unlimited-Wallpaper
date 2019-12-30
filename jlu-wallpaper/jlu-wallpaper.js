





var heroes = new Array();
var otherHeroCache = new Array();

function rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var can = null;
var con = null;
var imgBackground = null;
var imgLightOverlay = null;
var imgHeroes = null;

$(document).ready(function()
{	
	can = $("<canvas  width=\"100\" height=\"100\"></canvas>")[0];
	con = can.getContext("2d");
	
	$("#wallpaper").append(can);
	
	imgBackground = new Image();
	imgBackground.src = "jlu-wallpaper/img/background.png";
	
	imgLightOverlay = new Image();
	imgLightOverlay.src = "jlu-wallpaper/img/light-overlay.png";
	
	imgHeroes = new Image();
	imgHeroes.src = "jlu-wallpaper/img/heroes.png";
	
	
	setInterval(function()
	{
		var tempHero = new Object();
		
		
		var type = rand(0, 10);
		
		tempHero.x = rand(-($(window).width()/2), $(window).width()/2);
		tempHero.y = $(window).height() + rand(-$(window).height()/2, $(window).height()/2);
		
		tempHero.x -= $(window).width()/2;
		tempHero.y += $(window).height()/2;
		
		
		
		if(type == 9)
		{
			// create big one
			tempHero.speed = 3.0;
			tempHero.imgName = "jlu-wallpaper/img/other-big-" + rand(1, 3) + ".png";
		}
		else if(type == 8 || type == 7)
		{
			// create medium one
			tempHero.speed = 2.0;
			tempHero.imgName = "jlu-wallpaper/img/other-medium-" + rand(1, 1) + ".png";
		}
		else
		{
			// create small one
			tempHero.speed = 1.0;
			tempHero.imgName = "jlu-wallpaper/img/other-small-" + rand(1, 6) + ".png";
		}
		
		tempHero.randomization = (rand(75, 125) / 100);
		
		
		if(typeof otherHeroCache[tempHero.imgName] == "undefined")
		{
			otherHeroCache[tempHero.imgName] = new Image();
			otherHeroCache[tempHero.imgName].src = tempHero.imgName;
			
			tempHero.img = otherHeroCache[tempHero.imgName];
		}
		else
			tempHero.img = otherHeroCache[tempHero.imgName];
		
		heroes.push(tempHero);
		
	}, 1000);
	
	var frameRate = 0;
	
	var frameCount = 0;
	
	var time = 0;
	
	
	setInterval(function(){
		
		var windowWidth,
		    windowHeight;
			
		var date = new Date();
		var tempTime = date.getTime();
		
		if(tempTime - time > 1000)
		{			
			frameRate = frameCount;
			
			time = tempTime;
			
			frameCount = 0;
		}
		
		frameCount++;
		
		windowWidth = $(window)[0].innerWidth;
		windowHeight = $(window)[0].innerHeight;
		
		if(can.width != windowWidth)
			can.width = windowWidth;
		
		if(can.height != windowHeight)
			can.height = windowHeight;
		
		
		// save the context
		con.save();
		
		con.drawImage(imgBackground, 0, 0, imgBackground.width, imgBackground.height, 0, 0, windowWidth, windowHeight);
		
		
		for(i = 0; i < heroes.length; i++)
		{
			var tempHero = heroes[i];
			
			var rad = Math.atan2($(window).width(), $(window).height());
			
			var mySpeedMultiplier = 1.0;
			
			tempHero.x += Math.sin(rad) * ((tempHero.speed * mySpeedMultiplier) * tempHero.randomization);
			tempHero.y -= Math.cos(rad) * ((tempHero.speed * mySpeedMultiplier) * tempHero.randomization);
			
			
			con.drawImage(tempHero.img, tempHero.x, tempHero.y);
			
			if(tempHero.x - 100 > $(window).width() || tempHero.y + 100 < 0)
			{
				heroes.splice(i--, 1);
				
				$(tempHero.el).remove();
			}
		}
		
		
		con.drawImage(imgLightOverlay, 0, 0);
		
		
		var newHeight = imgHeroes.height * (windowWidth / imgHeroes.width);
		con.drawImage(imgHeroes, 0, 0, imgHeroes.width, imgHeroes.height, 0, windowHeight - newHeight, windowWidth, newHeight);
		
		
		con.font="20px Consolas";
		
		con.restore();
	}, 10);
	
});