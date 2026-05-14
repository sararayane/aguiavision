from ultralytics import YOLO

# carrega modelo
model = YOLO("yolov8n.pt")

def detectar_objetos(frame):
    results = model(frame)

    annotated_frame = results[0].plot()

    return annotated_frame