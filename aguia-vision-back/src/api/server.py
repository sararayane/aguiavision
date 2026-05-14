from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import cv2

from src.vision.detector import processar_frame
from src.arduino.arduino_reader import start_arduino, arduino_data
from src.ai.detector_ai import detectar_objetos

app = FastAPI()

# libera acesso do Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

start_arduino()

@app.get("/arduino")
def get_arduino():
    from src.arduino.arduino_reader import arduino_data
    return {"status": arduino_data}


# câmera
cap = cv2.VideoCapture(0)

# variável global
ultimo_risco = "baixo"


# 🔁 STREAM DE VÍDEO COM IA
def gerar_frames():
    global ultimo_risco

    while True:
        success, frame = cap.read()

        if not success:
            break

        # IA
        frame, risco = detectar_objetos(frame)

        # salva risco correto
        ultimo_risco = risco

        # converte imagem
        _, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()

        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' +
            frame_bytes +
            b'\r\n'
        )


# rota principal
@app.get("/")
def home():
    return {"message": "ÁguiaVision API rodando 🚀"}


# 🎥 vídeo
@app.get("/video")
def video_feed():
    return StreamingResponse(
        gerar_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )


# 📊 telemetria
@app.get("/status")
def status():
    return {
        "risco": ultimo_risco,
        "distancia": 10,
        "velocidade": 40
    }