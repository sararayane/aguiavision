import cv2

def processar_frame(frame):
    # 1. escala de cinza
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 2. gaussiano
    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    # 3. canny (bordas)
    edges = cv2.Canny(blur, 50, 150)

    # 4. converter bordas para 3 canais
    edges_colored = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)

    # 5. overlay (efeito visual)
    frame_processado = cv2.addWeighted(frame, 0.8, edges_colored, 0.5, 0)

    # 6. contornos
    contornos, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    maior_area = 0

    for cnt in contornos:
        area = cv2.contourArea(cnt)

        if area > 5000:
            x, y, w, h = cv2.boundingRect(cnt)

            # desenha retângulo
            cv2.rectangle(frame_processado, (x, y), (x+w, y+h), (0, 255, 0), 2)

        if area > maior_area:
            maior_area = area

    # 7. risco baseado em área
    if maior_area > 5000:
        risco = "alto"
        cor = (0, 0, 255)
    elif maior_area > 2000:
        risco = "medio"
        cor = (0, 255, 255)
    else:
        risco = "baixo"
        cor = (0, 255, 0)

    # 8. texto
    cv2.putText(frame_processado, f"Risco: {risco}", (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 1, cor, 2)

    return frame_processado, risco, maior_area