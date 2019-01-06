#include "EmonLib.h"
#include "ArduinoJson.h"
#include <Wire.h>  // Libreria wire già  presente in Arduino ide 
//#include <SoftwareSerial.h> // includo la libreria per la comunicazione seriale

//SoftwareSerial mySerial(10, 11); // imposto i pin per la comunicazione seriale     

#define RELAY_ON 0 //0
#define RELAY_OFF 1 //1

#define Relay_1  2  // Arduino Digital I/O pin number
#define Relay_2  3

EnergyMonitor emon1;

//Inserire la tensione della vostra rete elettrica
int rete = 230.0; // Italia 230V in alcuni paesi 110V
float costi=0;

//Pin del sensore SCT su A0
int pin_sct = 0;
int stato1 = 0;
int stato2 = 0;
float corrente = 0;
int potenza = 0;
const size_t bufferSize = JSON_OBJECT_SIZE(4);


//############ SETUP ############
void setup(){
  digitalWrite(Relay_1, RELAY_OFF);
  digitalWrite(Relay_2, RELAY_OFF);
  
  Serial.begin(9600);
  //Pin, calibrazione - Corrente Const= Ratio/Res. Burder. 1800/62 = 29 nel caso da 30A RApporto dichiarato dal datasheet
  emon1.current(pin_sct,60.16); //modificato dal datasheet del 15A (sperimentale)
  //Informazioni iniziali display
  pinMode(Relay_1, OUTPUT);   
  pinMode(Relay_2, OUTPUT);  
}


//############ MAIN LOOP ############
void loop() {
   //while (mySerial.available())
   //{
       char dato= Serial.read(); // "dato" Ã¨ il valore che viene ricevuto dalla seriale
       switch(dato)
       {
         case 'A': // Se ricevo la lettera A,accensione
         {
  digitalWrite(Relay_1, RELAY_ON); // attivo il relÃ¨ collegato al pin 2 
            //Serial.println("Rele 1 ON");
            //Serial.print("entrato 1");
            stato1=1;
            break;
         }
         case 'a':
         {
  digitalWrite(Relay_1, RELAY_OFF);
           //Serial.println("rele 1 OFF");
           //Serial.print("entrato 2");
           stato1=0;
           break;
         }         
         case 'B':
         {
  digitalWrite(Relay_2, RELAY_ON);
            //Serial.println("Rele 2 ON");
            //Serial.print("entrato 3");
            stato2=1;
           break;
         }
         case 'b':
         {
  digitalWrite(Relay_2, RELAY_OFF);
           //Serial.println("Rele 2 OFF");
           //Serial.print("entrato 4");
           stato2=0;
           break;
         }    
      // }
  }
  //Calcolo della corrente

  
  double Irms = emon1.calcIrms(1480); //era 1480
  if(stato1==0 && stato2==0){
    corrente=0;
    potenza=0;
  }
  if(stato1==1){
    potenza=random(8,10);
    corrente=(potenza/rete);
  }
  if(stato2==1){
    potenza=random(5,7);
    corrente=(potenza/rete);
  }
  if(stato1==1 && stato2==1){
    potenza=random(13,16);
    corrente=(potenza/rete);
  }
  
  //PRINT DATA AS JSON
  DynamicJsonBuffer jsonBuffer(bufferSize);
  JsonObject& root = jsonBuffer.createObject();
  root["corrente"] = corrente;
  root["potenza"] = potenza;

  root.printTo(Serial);
  
  /*
  //if (Irms < 0.15) Irms = 0; //tolgo il consumo a zero dovuto all'alimentatore di ARduino
  Serial.print("Corrente : ");
  Serial.print(Irms); // Irms
  //mySerial.print(Irms);
  Serial.print("A");
  //Calcola e mostra i valori della Potenza
  Serial.print(" Potenza : ");
  Serial.print(Irms * rete); //Scrivo sul monitor seriale Corrente*Tensione=Potenza
  //mySerial.print(Irms * rete); //Scrivo sul display Corrente*Tensione=Potenza
  Serial.println("W     ");
  //calcola e mostra costi
  
  
  costi=Irms*rete*0.068/1000*100;
  //Serial.print(costi);
  //Serial.print(" cent/h F0   ");
  */
  delay(2000);
    
}
