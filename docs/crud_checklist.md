1) File Structure
    - /src/lib/<entidad>/<entidad>.ts
        - definir la clase, interfaz
    - /src/routes/<entidad>/<entidad>.ts
        - definir los endpoints usando express.Router y exportar la instancia del router
    - /src/routes/index.ts
        - importar el router de la entidad y agregarlo al path (ej: router.use)
    

Nota: son 5 EndPoint y 5 métodos en la librearía

- getAll
- getById
- create
- update
- delete