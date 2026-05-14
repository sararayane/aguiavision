import serial
import threading

arduino_data = "DESCONECTADO"

def ler_arduino():
    global arduino_data

    try:
        ser = serial.Serial("COM3", 9600, timeout=1)
        print("Arduino conectado!")

        while True:
            if ser.in_waiting:
                linha = ser.readline().decode().strip()
                if linha:
                    arduino_data = linha
                    print("Arduino:", arduino_data)

    except Exception as e:
        print("Erro Arduino:", e)
        arduino_data = "DESCONECTADO"


def start_arduino():
    thread = threading.Thread(target=ler_arduino)
    thread.daemon = True
    thread.start()