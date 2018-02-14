requirejs.config({
	paths: {

		"text" : "../lib/text", // Needed for loading text resources like JSON files via RequireJS. Uses 'text!' prefix.
		"Phaser" : "../lib/phaser",
		"jQuery": "../lib/jquery-3.0.0.min",
		//"jQueryUI": "../lib/jquery-ui.min",

		"AspPhaserGenerator" : "../asp-phaser-generator-2/index",
		"translateAsp" : "../asp-phaser-generator-2/src/asp-to-cygnus-2",
		"rensa" : "../asp-phaser-generator-2/src/brain",
		"ctp" : "../asp-phaser-generator-2/src/cygnus-to-phaser-brain-2",
		"translatePhaserBrain" : "../asp-phaser-generator-2/src/phaser-brain-to-code-2",

		"initialPhaserFile" : "../asp-phaser-generator-2/src/initial-phaser-file.json",

		"HealthBar" : "../lib/healthbarstandalone.js", // Needed for generated Phaser games that use HealthBar class
		"State" : "./State.js", // From StoryAssembler/. Needed because generated Phaser games reference Story Assembler's State object
		"Condition" : "./Condition.js", // From StoryAssembler/. Needed by State.js
		"Display" : "./Display.js", // Dummy version of the one from ClimateChange/js/. Referenced by the generated Phaser games. 
		"StoryAssembler" : "./StoryAssembler.js", // Dummy version of StoryAssembler for Phaser to reference

		// *** The Cygnus files to be compiled ***
		"game_1" : "../games/game_1.lp", 
		"game_2" : "../games/game_2.lp",
		"game_3" : "../games/game_3.lp",
		"game_4" : "../games/game_4.lp",
		"game_5" : "../games/game_5.lp",
		"game_6" : "../games/game_6.lp",
		"dinner_1" : "../games/dinner_1.lp"

	}

	/*
	shim: {
		"jQueryUI": {
			export: "$",
			deps: ["jQuery"]
		}
	}*/

});

requirejs(
	["Phaser","AspPhaserGenerator","text!initialPhaserFile",
	"text!game_1","text!game_2","text!game_3","text!game_4","text!game_5","text!game_6","text!dinner_1",
	"text!HealthBar","text!State","text!Condition","text!Display","text!StoryAssembler",
	"jQuery"],
	function (Phaser, AspPhaserGenerator, initialPhaserFile, 
		game_1,game_2,game_3,game_4,game_5,game_6,dinner_1,
		HealthBar, State, Condition, Display, StoryAssembler) {

	var gameFile = game_1;

	// Add listeners to contents links (for games 1-6)

	$('#link-game1').click({game:1},loadGame);
	$('#link-game2').click({game:2},loadGame);
	$('#link-game3').click({game:3},loadGame);
	$('#link-game4').click({game:4},loadGame);
	$('#link-game5').click({game:5},loadGame);
	$('#link-game6').click({game:6},loadGame);

	function loadGame (e){
	    console.log(e.data.game);
	    gameFile = ("game_"+e.data.game);
	}

	var aspGameFile 		   = gameFile.split("==========")[0];
	var instructionsWithLabels = gameFile.split("==========")[1];
	var instructionsNoLabels   = gameFile.split("==========")[2];

	// Compile Cygnus .lp files into Phaser code
	//var generator = AspPhaserGenerator.AspPhaserGenerator (aspGameFile,initialPhaserFile);
	//var phaserProgram = AspPhaserGenerator.generate (generator.cygnusBrain, generator.initialPhaserBrain, true);
	var phaserProgram = AspPhaserGenerator.compile (aspGameFile, initialPhaserFile, true);

	/* Phaser Game Constructor: new Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig);
	 * Creates a canvas element
	 */
	phaserProgram = 
		"game = new Phaser.Game(500, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update }, true);"
		+ Display
		+ StoryAssembler
		+ phaserProgram
		+ HealthBar
		+ Condition
		+ State;

	eval(phaserProgram);

	var instructions = instructionsNoLabels;

	// Discard the first line of the instructions ("With labels:" or "Without labels:")
	instructions = instructions.substring(instructions.indexOf("\n",1) + 1);

	$("#instructions").html("<h2>Beach Cleanup</h2>"+
		"<pre>"+instructions+"</pre>");


});
