#include <Adafruit_CircuitPlayground.h>

void setup() {
  // put your setup code here, to run once:
  CircuitPlayground.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  CircuitPlayground.setPixelColor(0, 255, 0, 0);  // Turn pixel 0 ON (red)
  delay(1000);
  CircuitPlayground.setPixelColor(0, 0, 0, 0);    // Turn pixel 0 OFF
  delay(1000);
}
