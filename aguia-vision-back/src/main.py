import cv2
from src.vision.detector import processar_frame

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    if not ret:
        break

    frame, risco, area = processar_frame(frame)

    cv2.imshow("ÁguiaVision", frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()