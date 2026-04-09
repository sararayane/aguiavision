from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import cv2
from src.vision.detector import processar_frame

app = FastAPI()

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
        frame, risco, area = processar_frame(frame)

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