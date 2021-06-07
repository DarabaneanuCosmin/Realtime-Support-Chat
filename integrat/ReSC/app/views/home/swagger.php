<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.24.2/swagger-ui.css" >
  <style>
    html
    {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    *,
    *:before,
    *:after
    {
      box-sizing: inherit;
    }

    body {
      margin:0;
      background: #fafafa;
    }
  </style>
</head>
<body>

<div id="swagger-ui"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.24.2/swagger-ui-bundle.js"> </script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.24.2/swagger-ui-standalone-preset.js"> </script>
<script>
window.onload = function() {

  var spec = {"swagger": "2.0", "info": {"description": "Aplicatie de support chat in timp real.", "version": "1.0.0", "title": "Realtime Support Chat", "termsOfService": "http://swagger.io/terms/", "contact": {"email": "messaging@ReSC.io"}, "license": {"name": "Apache 2.0", "url": "http://www.apache.org/licenses/LICENSE-2.0.html"}}, "host": "localhost", "basePath": "/v2/api", "tags": [{"name": "room", "description": "Controller pentru manipulare detalii camere de chat"}, {"name": "messages", "description": "Controller de operatii pe mesaje"}, {"name": "user", "description": "Controller de operatii pe user"}], "schemes": ["https", "http"], "paths": {"/api/messages/{idRoom}/{sessionId}": {"get": {"tags": ["messages"], "summary": "Face rost de toate mesajele dintr-un room pornind de la sessionId pentru vizitatori", "description": "", "operationId": "fetchMessages", "produces": ["application/json"], "parameters": [{"name": "idRoom", "in": "path", "description": "Id-ul de room", "required": true, "type": "string"}, {"name": "sessionId", "in": "path", "description": "Id-ul de sesiune", "required": true, "type": "string"}], "responses": {"default": {"description": "successful operation"}}, "x-swagger-router-controller": "Messages"}}, "/api/session": {"post": {"tags": ["user"], "summary": "Creeaza noua sesiune si ii asigneaza un user", "description": "Creeaza noua sesiune si ii asigneaza un user", "operationId": "createSession", "produces": ["application/json"], "parameters": [], "responses": {"default": {"description": "successful operation"}}, "x-swagger-router-controller": "User"}}, "/api/updateSession": {"put": {"tags": ["user"], "summary": "Updateaza statusul - daca a facut consent la gdpr sau nu (implicit se adauga si username-ul)", "description": "", "operationId": "updateSessionUserName", "produces": ["application/json"], "parameters": [], "responses": {"default": {"description": "successful operation", "schema": {"$ref": "#/definitions/UserPrivateData"}}}, "x-swagger-router-controller": "User"}}, "/api/userData/{sessionId}": {"get": {"tags": ["user"], "summary": "Face rost de date publice despre un user", "description": "", "operationId": "loginUser", "produces": ["application/json"], "parameters": [{"name": "sessionId", "in": "path", "description": "Id-ul de sesiune", "required": true, "type": "string"}], "responses": {"200": {"description": "Success", "schema": {"type": "string"}}, "400": {"description": "Invalid sessionId supplied"}}, "x-swagger-router-controller": "User"}}, "/api/username/session/{sessionId}": {"get": {"tags": ["user"], "summary": "Face rost de username-ul public al unui user dupa session id", "description": "", "operationId": "getUsernameBySid", "produces": ["application/json"], "parameters": [{"name": "sessionId", "in": "path", "description": "Id-ul de sesiune", "required": true, "type": "string"}], "responses": {"200": {"description": "Success", "schema": {"type": "string"}}, "404": {"description": "Invalid sessionId supplied"}}, "x-swagger-router-controller": "User"}}, "/api/messages/createRoom": {"post": {"tags": ["room"], "summary": "Creeaza un nou room privat pentru user in situatia in care nu are unul deja", "description": "", "operationId": "createNewRoom", "produces": ["application/json"], "parameters": [], "responses": {"200": {"description": "Found one of the already existing ones", "schema": {"type": "string"}}, "201": {"description": "Created", "schema": {"type": "string"}}, "404": {"description": "Invalid sessionId supplied", "schema": {"type": "string"}}}, "x-swagger-router-controller": "Room"}}, "/api/rooms": {"get": {"tags": ["room"], "summary": "Fa rost de toate camerele", "description": "", "operationId": "getAllRooms", "produces": ["application/json"], "parameters": [], "responses": {"200": {"description": "Success", "schema": {"type": "string"}}, "404": {"description": "Nicio camera", "schema": {"type": "string"}}}, "x-swagger-router-controller": "Room"}}, "/api/messagess/{idRoom}/{sesionId}": {"post": {"tags": ["messages"], "summary": "Adauga un nou mesaj intr-o camera", "description": "", "operationId": "addNewMessage", "produces": ["application/json"], "parameters": [{"name": "idRoom", "in": "path", "description": "Id-ul unui room", "required": true, "type": "string"}, {"name": "sesionId", "in": "path", "description": "Id-ul de sesiune", "required": true, "type": "string"}], "responses": {"200": {"description": "Success", "schema": {"$ref": "#/definitions/Message"}}, "404": {"description": "Session id not found"}}, "x-swagger-router-controller": "Messages"}}, "/api/admin/{idRoom}/{sessionId}": {"post": {"tags": ["messages"], "summary": "Adauga un admin la un room", "description": "", "operationId": "addAdminToRoom", "produces": ["application/json"], "parameters": [{"name": "idRoom", "in": "path", "description": "Id-ul unui room", "required": true, "type": "string"}, {"name": "sessionId", "in": "path", "description": "Id-ul de sesiune", "required": true, "type": "string"}], "responses": {"200": {"description": "Success", "schema": {"$ref": "#/definitions/UserPrivateData"}}, "404": {"description": "Session id not found"}}, "x-swagger-router-controller": "Messages"}}, "/api/message/{idRoom}/{idMessage}": {"get": {"tags": ["messages"], "summary": "Fa rost de urmatorul mesaj din acel room > idMessage", "description": "", "operationId": "getOneMessage", "produces": ["application/json"], "parameters": [{"name": "idRoom", "in": "path", "description": "Id-ul unui room", "required": true, "type": "string"}, {"name": "idMessage", "in": "path", "description": "Id-ul de mesaj", "required": true, "type": "string"}], "responses": {"200": {"description": "Success", "schema": {"$ref": "#/definitions/Message"}}, "204": {"description": "No new message"}}, "x-swagger-router-controller": "Messages"}}, "/api/generateSession": {"post": {"tags": ["user"], "summary": "Genereaza un session id, sesiune retinuta la nivel de API", "description": "", "operationId": "generateSessionCookie", "produces": ["application/json"], "parameters": [], "responses": {"200": {"description": "Success", "schema": {"$ref": "#/definitions/UserPrivateData"}}}, "x-swagger-router-controller": "User"}}, "/api/messages/createRoomEnhanced": {"post": {"tags": ["room"], "summary": "Creeaza un nou room privat pentru user in situatia in care nu are unul deja (si in plus returneaza detalii despre camera pentru prezentare UI) + adauga userul si in room-ul global", "description": "", "operationId": "createPrivateRoomAndAddToGlobal", "produces": ["application/json"], "parameters": [], "responses": {"200": {"description": "Found one of the already existing ones", "schema": {"type": "string"}}, "201": {"description": "Created", "schema": {"type": "string"}}, "404": {"description": "Invalid sessionId supplied", "schema": {"type": "string"}}}, "x-swagger-router-controller": "Room"}}, "/api/listRooms/{sessionId}": {"get": {"tags": ["room"], "summary": "Listeaza room-urile unui anumit user", "description": "", "operationId": "listRooms", "produces": ["application/json"], "parameters": [{"name": "sessionId", "in": "path", "description": "Id-ul de sesiune", "required": true, "type": "string"}], "responses": {"200": {"description": "Room list returned", "schema": {"type": "string"}}, "404": {"description": "Invalid sessionId supplied", "schema": {"type": "string"}}}, "x-swagger-router-controller": "Room"}}, "/api/aquireRoomInfo/{idRoom}": {"get": {"tags": ["room"], "summary": "Listeaza detaliile despre un anumit room", "description": "", "operationId": "relayRoomData", "produces": ["application/json"], "parameters": [{"name": "idRoom", "in": "path", "description": "Id-ul unui room", "required": true, "type": "string"}], "responses": {"200": {"description": "Room data returned", "schema": {"type": "object"}}, "404": {"description": "Invalid sessionId supplied", "schema": {"type": "string"}}}, "x-swagger-router-controller": "Room"}}}, "definitions": {"Message": {"type": "object", "properties": {"idMessage": {"type": "string"}, "senderName": {"type": "string"}, "messageText": {"type": "string"}, "dateSent": {"type": "string", "format": "date-time"}, "sentByMe": {"type": "boolean"}}, "xml": {"name": "Message"}, "example": {"messageText": "messageText", "senderName": "senderName", "sentByMe": true, "idMessage": "idMessage", "dateSent": "2000-01-23T04:56:07.000+00:00"}}, "Room": {"type": "object", "properties": {"adminName": {"type": "string"}, "idAssignedAdmin": {"type": "string"}, "idRoom": {"type": "string"}, "roomName": {"type": "string"}, "roomParticipantsCount": {"type": "number"}}, "xml": {"name": "Room"}}, "UserPrivateData": {"type": "object", "properties": {"idUser": {"type": "string"}, "username": {"type": "string"}, "message": {"type": "string"}, "hasConsented": {"type": "boolean"}}, "xml": {"name": "Message"}, "example": {"idUser": "idUser", "hasConsented": true, "message": "message", "username": "username"}}}, "externalDocs": {"description": "Find out more about Swagger", "url": "http://swagger.io"}};

  // Build a system
  const ui = SwaggerUIBundle({
    spec: spec,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })

  window.ui = ui
}
</script>
</body>

</html>
