<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://luatecsolutions.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$nombre   = htmlspecialchars($data['nombre'] ?? '');
$apellido = htmlspecialchars($data['apellido'] ?? '');
$email    = htmlspecialchars($data['email'] ?? '');
$telefono = htmlspecialchars($data['telefono'] ?? '');
$mensaje  = htmlspecialchars($data['mensaje'] ?? '');

if (!$nombre || !$email || !$mensaje) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Campos requeridos faltantes']);
    exit;
}

$RESEND_API_KEY = 're_avNUvzd2_GYYznPMe2xrPCf4Mb4N3twkN';

$payload = json_encode([
    'from'     => 'contacto@luatecsolutions.com',
    'to'       => ['ventas@luatecsolutions.com'],
    'reply_to' => $email,
    'subject'  => "Nuevo contacto web: $nombre $apellido",
    'html'     => "
        <h2 style='color:#053D8A'>Nuevo mensaje desde luatecsolutions.com</h2>
        <table style='font-family:sans-serif;font-size:14px'>
            <tr><td style='padding:6px 12px;font-weight:bold'>Nombre:</td><td>$nombre $apellido</td></tr>
            <tr><td style='padding:6px 12px;font-weight:bold'>Email:</td><td>$email</td></tr>
            <tr><td style='padding:6px 12px;font-weight:bold'>Teléfono:</td><td>$telefono</td></tr>
            <tr><td style='padding:6px 12px;font-weight:bold;vertical-align:top'>Mensaje:</td><td>$mensaje</td></tr>
        </table>
    "
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $RESEND_API_KEY,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200 || $httpCode === 201) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al enviar']);
}
?>