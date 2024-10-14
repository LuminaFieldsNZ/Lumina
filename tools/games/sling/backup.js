// Matter.js module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// Create engine
var engine = Engine.create(),
    world = engine.world;

// Create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

Render.run(render);

// Create runner
var runner = Runner.create();
Runner.run(runner, engine);

// Add bodies
var ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });

var rockOptions = { density: 0.004 };
var rock = Bodies.polygon(170, 450, 8, 20, rockOptions);
var anchor = { x: 170, y: 450 };
var elastic = Constraint.create({ 
    pointA: anchor, 
    bodyB: rock, 
    stiffness: 0.05
});

var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 25, 40);
});

var ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });

var pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 25, 40);
});

Composite.add(world, [ground, pyramid, ground2, pyramid2, rock, elastic]);

// Add mouse control
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(world, mouseConstraint);

// Keep the mouse in sync with rendering
render.mouse = mouse;

// Fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});

// Reset rock when released
Events.on(engine, 'afterUpdate', function() {
    if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
        rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
        Composite.add(world, rock);
        elastic.bodyB = rock;
    }
});

