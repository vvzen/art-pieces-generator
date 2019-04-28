// @author: Valerio Viperino
// Thanks to Daniel Shiffman and its videos on matterjs

// module aliases
let Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let ground;

let droppedWords = [];
let artisticMovements = [];
let finalOutputs = [];

let montserratFont;

/*--------- P5JS---------*/
function preload() {

    montserratFont = loadFont('src/fonts/Montserrat-Regular.otf');
    console.log("font loaded!");

    // Load the json file
    fetch('src/json/isms.json').then(response => {
        return response.json();
    }).then(data => {

        console.log(data);

        data.isms.forEach(element => {
            let words = element.split(' ');
            artisticMovements.push(...words);
            // console.log(words);
        });

        data.outputs.forEach(element => {
            finalOutputs.push(element);
        });

    });

}

function setup() {

    let canvas = createCanvas(window.innerWidth, window.innerHeight / 2);
    canvas.parent('sketch-holder');

    textFont(montserratFont);
    textAlign(CENTER, CENTER);

    engine = Engine.create();
    world = engine.world;

    ground = Bodies.rectangle((width + 2) / 2, height, window.innerWidth, 100, {
        isStatic: true
    });

    World.add(world, ground);
}

function draw() {

    background(255);

    Engine.update(engine);

    for (let droppedWord of droppedWords) {
        droppedWord.show();
    }

    // drawGround();
}

function drawGround() {
    stroke(0);
    fill(255);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 100);
}

function generateArtPiece() {

    droppedWords.length = 0;
    World.clear(world, true);

    let finalWordsCount = Math.floor(map(Math.random(), 0, 1, 2, 3));

    // Drop the 'A'
    let fontSize = map(Math.random(), 0, 1, 20, 32);
    let articleTextBBox = montserratFont.textBounds('a', 0, 0, fontSize);

    droppedWords.push(new DroppedWord(
        { x: 10 + articleTextBBox.w, y: 10 },
        'a', fontSize,
        { font: montserratFont, world: world })
    );

    // Randomly pick a few adjectives
    if (artisticMovements.length > 0) {

        for (let i = 0; i < finalWordsCount; i++) {

            droppedWordText = artisticMovements[Math.floor(Math.random() * artisticMovements.length)];


            let fontSize = map(Math.random(), 0, 1, 20, 32);
            let droppedWordTextBBox = montserratFont.textBounds(droppedWordText, 0, 0, fontSize);

            let posX = map(i, 0, finalWordsCount, droppedWordTextBBox.w, width);

            droppedWords.push(new DroppedWord(
                { x: posX, y: mouseY },
                droppedWordText, fontSize,
                { font: montserratFont, world: world })
            );

            // console.log(droppedWords);
        }
    }

    // Drop the output word
    if (finalOutputs.length > 0) {

        let randomOutput = finalOutputs[Math.floor(Math.random() * finalOutputs.length)];

        let fontSize = map(Math.random(), 0, 1, 20, 32);
        let outputTextBBox = montserratFont.textBounds(randomOutput, 0, 0, fontSize)

        droppedWords.push(new DroppedWord(
            { x: width - outputTextBBox.w, y: outputTextBBox.h },
            randomOutput, fontSize,
            { font: montserratFont, world: world })
        );
    }
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}