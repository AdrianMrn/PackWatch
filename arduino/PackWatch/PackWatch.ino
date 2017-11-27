#include <SPI.h>
#include "PN532_SPI.h"
#include "PN532.h"
#include "NfcAdapter.h"

#include "SPI.h"
#include "snep.h"
#include "NdefMessage.h"

PN532_SPI interface(SPI, 10); // create a SPI interface for the shield with the SPI CS terminal at digital pin 10


String listOfItems;
String newItem;

void setup(void)
{
    Serial.begin(115200); // start serial comm
    Serial.println("NDEF Reader");
}

void loop(void)
{
    NfcAdapter nfc = NfcAdapter(interface); // create an NFC adapter object
    nfc.begin(); // begin NFC comm
      
    Serial.println("\nScan an NFC tag\n");
    if (nfc.tagPresent()) // Do an NFC scan to see if an NFC tag is present
    {
        NfcTag tag = nfc.read(); // read the NFC tag
        if(tag.hasNdefMessage())
        {
          NdefMessage message = tag.getNdefMessage();
          for(int i=0;i<message.getRecordCount();i++)
          {
            NdefRecord record = message.getRecord(i);
            int payloadLength = record.getPayloadLength();
            byte payload[payloadLength];
            record.getPayload(payload);
  
            String strPayload = String((char*)payload);
  
            newItem = strPayload[3];
            newItem += strPayload[4];
  
            if (listOfItems.indexOf(newItem) == -1) {
              listOfItems += newItem;
            }
  
            Serial.println(listOfItems);
          }
        } else {
          p2p();
        }
    }
    delay(250);
}

void p2p(void)
{
    SNEP nfc(interface);
    uint8_t ndefBuf[128];

    Serial.println("Send a message to Android");
    NdefMessage message = NdefMessage();
    message.addUriRecord(listOfItems);
    int messageSize = message.getEncodedSize();
    if (messageSize > sizeof(ndefBuf)) {
        Serial.println("ndefBuf is too small");
        while (1) {
        }
    }

    message.encode(ndefBuf);
    if (0 >= nfc.write(ndefBuf, messageSize)) {
        Serial.println("Failed :(");
    } else {
        Serial.println("Success");
    }
}

