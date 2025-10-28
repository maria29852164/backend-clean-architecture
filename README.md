## ENDPOINTS creados

#### explicacion de arquitectura usada
* domain: se agregaron las entidades plan subscription user
* applications: se implementaron los ports que son las interfacez de los metodos que usaran los casos de uso.
* infrastructure: seccion donde se implementan los repositorios configuracion del firebase y db con sus migraciones

### Como funciona
* el controlador llama a los casos de uso
* los casos de uso llaman a las interfacez, las implementaciones se definen en el app.module.ts,alli se aloja la logica de negocio
* los repositorios solo contienen acciones sql insert,select, update,delete


### implementacion con firebase
* se creo una colleccion audit_logs donde se guardan los eventos
![img_7.png](img_7.png)
## Endpoints
### /auth/registe
![img.png](img.png)

### /auth/login
![img_1.png](img_1.png)

### /plans
![img_2.png](img_2.png)

### /subscription
![img_3.png](img_3.png)

### /me subscription
![img_4.png](img_4.png)

### /subscription/status
![img_5.png](img_5.png)

### /subscription/change

![img_6.png](img_6.png)