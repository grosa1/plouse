import sys
import bluetooth

bd_addr = 'F4:C2:48:6D:73:A3'
port = 1
sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
sock.connect((bd_addr,port))
sock.send("works".encode())