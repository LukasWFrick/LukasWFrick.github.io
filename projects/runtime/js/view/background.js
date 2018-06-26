var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var tree;
        var tree2;
        var buildings = [];
        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight/2,'black');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var circle;
            for(var i=0;i<1000;i++) {
                circle = draw.circle(1,'white','LightGray',0.2);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            
            var philSwift = draw.bitmap('img/philswift.png');
            philSwift.x = 0;
            philSwift.y = canvas.height/2;
            philSwift.scaleX = canvas.width/520;
            philSwift.scaleY = canvas.height/292/2;
            background.addChild(philSwift);
            
            
            
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeight = 300;
            var building;
            for(var i=0;i<5;++i) {
                if(i<3){
                    buildingHeight = buildingHeight - (10*(i+3));
                }else{
                    buildingHeight = 300-(i*20);
                }
                building = draw.rect(100,buildingHeight,'LightGrey','Black',2);
                building.x = canvasWidth/5 * i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/Minecraft_Tree.png');
            tree.x = canvas.width/2;
            tree.y = groundY - 225;
            tree.scaleX = .35;
            tree.scaleY = .38;
            background.addChild(tree);
            
            tree2 = draw.bitmap('img/Minecraft_Tree.png');
            tree2.x = canvas.width*.8;
            tree2.y = groundY - 225;
            tree2.scaleX = .35;
            tree2.scaleY = .38;
            background.addChild(tree2);
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 2.5;
            if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            tree2.x = tree2.x - 2.5;
            if(tree2.x < -300) {
                tree2.x = canvasWidth;
            }
            // TODO 5: Part 2 - Parallax
            buildings[0].x = buildings[0].x - 0.5;
            if(buildings[0].x < -110) {
                buildings[0].x = canvasWidth;
            }
            buildings[1].x = buildings[1].x - 1.0;
            if(buildings[1].x < -170) {
                buildings[1].x = canvasWidth;
            }
            buildings[2].x = buildings[2].x - 1.25;
            if(buildings[2].x < -150) {
                buildings[2].x = canvasWidth;
            }
            buildings[3].x = buildings[3].x - 2.25;
            if(buildings[3].x < -120) {
                buildings[3].x = canvasWidth;
            }
            buildings[4].x = buildings[4].x - 2.3;
            if(buildings[4].x < -100) {
                buildings[4].x = canvasWidth;
            }
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
