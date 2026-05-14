from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import cv2
from src.vision.detector import processar_frame
from src.arduino.arduino_reader import start_arduino, arduino_data
from src.ai.detector_ai import detectar_objetos

app = FastAPI()
start_arduino()

@app.get("/arduino")
def get_arduino():
    from src.arduino.arduino_reader import arduino_data
    return {"status": arduino_data}

# câmera
cap = cv2.VideoCapture(0)

# variável global para compartilhar com o front
ultimo_risco = "baixo"

# 🔁 STREAM DE VÍDEO COM IA
def gerar_frames():
    global ultimo_risco

    while True:
        success, frame = cap.read()

        if not success:
            break

        # aplica IA
        frame = detectar_objetos(frame)

        # atualiza risco global
        ultimo_risco = risco

        # converte para jpg
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


# 🔥 ROTA PRINCIPAL
@app.get("/")
def home():
    return {"message": "ÁguiaVision API rodando 🚀"}


# 🎥 ROTA DE VÍDEO
@app.get("/video")
def video_feed():
    return StreamingResponse(
        gerar_frames(),
        media_type='multipart/x-mixed-replace; boundary=frame'
    )


# 📊 ROTA DE TELEMETRIA (FRONT USA)
@app.get("/status")
def status():
    return {
        "risco": ultimo_risco,
        "distancia": 10,   # depois ligamos no sensor real
        "velocidade": 40   # pode vir do Arduino depois
    }