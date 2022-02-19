const { Board, Button, Led } = require('johnny-five');

// Set `lightOn` to true as a default since our LED will be on
let lightOn = true;

// Make a new Board Instance
const board = new Board();

// When the board is connected, turn on the LED connected to pin 9
board.on('ready', function () {
  console.log('[johnny-five]: Signing On...');

  // Make a new Led object and connect it to pin 9
  const led = new Led(9);

  // Make a new Button object assigned to pin 7
  // We also need to say it is a pullup resistor
  var pushButton = new Button({
    pin: 7,
    isPullup: true,
  });

  // Switch it on
  led.on();

  // If the button is pressed, toggle the LED on or off
  pushButton.on('down', function () {
    if (lightOn) {
      led.off();
      lightOn = false;
    } else {
      led.on();
      lightOn = true;
    }
  });

  // REPL object so we can interact with our LED
  this.repl.inject({
    // Control the LED via calling for the object
    led: led,
    // switchOn and switchOff functions to turn LED on and off using REPL
    switchOn: function () {
      if (lightOn) {
        console.log('[johnny-five]: LED is already on...');
      } else {
        console.log('[johnny-five]: Turning LED on...');
        led.on();
        lightOn = true;
      }
    },
    switchOff: function () {
      if (!lightOn) {
        console.log('[johnny-five]: LED is already off...');
      } else {
        console.log('[johnny-five]: Turning LED off...');
        led.stop().off();
        lightOn = false;
      }
    },
  });

  // When the board is closing, stop any LED animations and turn it off
  this.on('exit', function () {
    led.stop().off();
    console.log('[johnny-five]: Signing Off...');
  });
});
