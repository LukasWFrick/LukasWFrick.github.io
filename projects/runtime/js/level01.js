var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY - 115},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:800,y:groundY - 115},
                {type: 'sawblade',x:1000,y:groundY},
                {type: 'sawblade',x:1150,y:groundY},
                {type: 'sawblade',x:1300,y:groundY},
                {type: 'death',x:1500,y:groundY - 115},
                {type: 'death',x:1650,y:groundY},
                {type: 'enemy',x:400,y:groundY - 50},
                {type: 'enemy',x:800,y:groundY - 50},
                {type: 'enemy',x:1200,y:groundY - 50},
                {type: 'bonusItem',x:1900,y:groundY - 160},
                
                {type: 'sawblade',x:2050,y:groundY},
                {type: 'sawblade',x:2200,y:groundY},
                {type: 'sawblade',x:2400,y:groundY - 115},
                {type: 'sawblade',x:2600,y:groundY},
                {type: 'sawblade',x:2750,y:groundY - 115},
                {type: 'sawblade',x:2900,y:groundY},
                {type: 'death',x:3200,y:groundY},
                {type: 'death',x:3350,y:groundY - 115},
                {type: 'death',x:3500,y:groundY},
                {type: 'bonusItem',x:3800,y:groundY - 160},
                
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        
        
        function createSawBlade(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            myObstacle.rotationalVelocity = -30
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        function createDeath(x,y){
            var hitZoneSize = 20;
            var damageFromObstacle = 9999;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/death.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -30;
            obstacleImage.y = -30;
        }
        
        function createEnemy(x,y) {
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -2.7;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function(){
                game.changeIntegrity(-20);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function(){
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }
        
        function createBonusItem(x,y) {
            var bonusItem = game.createGameItem('bonusItem',25);
            var bonusItemImage = draw.bitmap('img/bonus.png');
            bonusItemImage.x = -30;
            bonusItemImage.y = -30;
            bonusItem.addChild(bonusItemImage);
            bonusItem.x = x;
            bonusItem.y = y;
            game.addGameItem(bonusItem);
            bonusItem.velocityX = -2;
            bonusItem.onPlayerCollision = function(){
                game.changeIntegrity(10000);
                game.increaseScore(5000);
                bonusItem.fadeOut();
            };
            
            
        }
        
        for (var e = 0; e < levelData.gameItems.length; e ++) {
            if(levelData.gameItems[e].type === 'sawblade'){
                createSawBlade(levelData.gameItems[e].x,levelData.gameItems[e].y);
            }else if(levelData.gameItems[e].type === 'death'){
                createDeath(levelData.gameItems[e].x,levelData.gameItems[e].y);
            }else if(levelData.gameItems[e].type === 'enemy'){
                createEnemy(levelData.gameItems[e].x,levelData.gameItems[e].y);
            }else if(levelData.gameItems[e].type === 'bonusItem'){
                createBonusItem(levelData.gameItems[e].x,levelData.gameItems[e].y);
            }
        }
        
        
        
        
        
        
        
        
        
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}