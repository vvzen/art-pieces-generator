function DroppedWord(pos, textString, fontSize, globals) {

    this.font = globals.font;
    this.world = globals.world;

    // Graphics
    this.fontSize = fontSize;
    this.hue = map(Math.random(), 0, 1, 70, 100);
    this.saturation = map(Math.random(), 0, 1, 70, 99);
    this.value = map(Math.random(), 0, 1, 50, 85);

    // Physics
    this.mass = map(Math.random(), 0, 1, 0.1, 0.6);
    this.friction = 0.3;
    this.restitution = 0.6;

    // Lifespan
    // this.lifespan = 50;
    // this.alpha = map(this.lifespan, 0, 50, 0, 100);
    // this.scheduledToDie = false;

    let bbox = this.font.textBounds(textString, pos.x, pos.y, this.fontSize);
    this.body = Bodies.rectangle(pos.x, pos.y, bbox.w, bbox.h + (bbox.h * 0.25), {
        mass: 0.1,
        friction: this.friction,
        restitution: this.restitution
    });
    this.textString = textString;

    World.add(this.world, this.body);
}

DroppedWord.prototype.show = function () {

    push();
    colorMode(HSB, 100);
    noStroke();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    fill(this.hue, this.saturation, this.value, this.alpha);
    textSize(this.fontSize);
    text(this.textString, 0, 0);
    pop();
}