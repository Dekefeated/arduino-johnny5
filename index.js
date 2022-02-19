const { Board, Led, Sensor } = require('johnny-five');
const board = new Board();

board.on('ready', function () {
  const mic = new Sensor({
    pin: 'A0',
    freq: 100,
    threshold: 10,
  });
  const led = new Led(11);
  // led.brightness(1);
  led.off();
  // Scale the sensor's value to the LED's brightness range

  mic.scale([0, 1]).on('data', function () {
    // set the led's brightness based on force
    // applied to force sensitive resistor
    console.log('[johnny-five]: Data from Sensor...');
    console.log('this.value: ', this.value);
    if (this.value < 0.35) {
      console.log('Turn LED On...');
      led.on();
    } else {
      led.off();
      console.log('Turn LED Off...');
    }
  });
});
