// send a NDEF message to adnroid or get a NDEF message
//
// note: [NDEF library](https://github.com/Don/NDEF) is needed.

#include "SPI.h"
#include "PN532_SPI.h"
#include "snep.h"
#include "NdefMessage.h"

PN532_SPI pn532spi(SPI, 10);
SNEP nfc(pn532spi);
uint8_t ndefBuf[128];

void setup()
{
    Serial.begin(115200);
    Serial.println("-------Peer to Peer--------");
}

void loop()
{
    Serial.println("Send a message to Android");
    NdefMessage message = NdefMessage();
    message.addUriRecord("A1B2C3D4F5");
    int messageSize = message.getEncodedSize();
    if (messageSize > sizeof(ndefBuf)) {
        Serial.println("ndefBuf is too small");
        while (1) {
        }

    }

    message.encode(ndefBuf);
    if (0 >= nfc.write(ndefBuf, messageSize)) {
        Serial.println("wtf");
        Serial.println("Failed :(");
    } else {
        Serial.println("Success");
    }

    delay(250);
}

