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

		"gameFile" : "../games/game_1.lp", // *** The Cygnus file to be compiled ***

		"HealthBar" : "../lib/healthbarstandalone.js", // Needed for generated Phaser games that use HealthBar class
		"State" : "./State.js", // From StoryAssembler/. Needed because generated Phaser games reference Story Assembler's State object
		"Condition" : "./Condition.js", // From StoryAssembler/. Needed by State.js
		"Display" : "./Display.js", // Dummy version of the one from ClimateChange/js/. Referenced by the generated Phaser games. 
		"StoryAssembler" : "./StoryAssembler.js" // Dummy version. ""
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
	["Phaser","AspPhaserGenerator",
	"text!initialPhaserFile","text!gameFile",
	"text!HealthBar","text!State","text!Condition","text!Display","text!StoryAssembler",
	"jQuery"],
	function (Phaser, AspPhaserGenerator, initialPhaserFile, gameFile, HealthBar, State, Condition, Display, StoryAssembler) {


	var aspGameFile 		   = gameFile.split("==========")[0];
	var instructionsWithLabels = gameFile.split("==========")[1];
	var instructionsNoLabels   = gameFile.split("==========")[2];

	var generator = AspPhaserGenerator.AspPhaserGenerator (aspGameFile,initialPhaserFile);

	var phaserProgram = AspPhaserGenerator.generate (generator.aspGame, generator.initialPhaser, false);

	/* Phaser Game Constructor: new Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig);
	 * Creates a canvas element
	 * The final parameter is an object containing four references to Phasers essential functions. 
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

	$("#instructions").html("<h2>Game Information</h2>"+
		"<pre>"+instructions+"</pre>");


});
