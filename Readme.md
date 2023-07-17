# Proyecto Final Backend Coderhouse - Javier Maita

Aqui se presenta mi proyecto final desarrollado a lo largo del curso de Backend en Coderhouse

## Tecnologias

**Client:** HTML, CSS, Handlebars

**Server:** Node, Express, MongoDB, socket.io, JWT

## API Reference

#### Products

```http
  GET       /api/products        Retorna todos los productos
  POST      /api/products        Crea un producto en la Base de Datos
  GET       /api/products/:pid   Retorna un producto por ID
  PUT       /api/products/:pid   Actualiza un producto identificandolo por ID
  DELETE    /api/products/:pid   Elimina un producto de la Base de Datos
```

#### Carts

```http
  POST      /api/carts                    Crea un nuevo carrito en la Base de Datos
  GET       /api/carts/:cid               Retorna todos los productos de un carrito
  DELETE    /api/carts/:cid               Elimina todos los productos de un carrito
  PUT       /api/carts/:cid               Recibe por body un array con productos para remplazar los que se encuentre en el carrito
  POST      /api/carts/:cid/product/:pid  Agrega al carrito que se recibe por params el producto que se recibe tambien por params
  DELETE    /api/carts/:cid/product/:pid  Elimina del  carrito que se recibe por params el producto que se recibe tambien por params
  PUT       /api/carts/:cid/product/:pid  Actualiza al carrito que se recibe por params aumentado la cantidad del producto que tambien es recibido por params
  POST      /api/carts/:cid/purchase      Genera el ticket de compra con todos los productos del carrito
```

#### User

```http
  GET     /api/users                        Retorna todos los usuarion de manera segura (sin las contraseñas)
  DELETE  /api/users                        Elimina a todos los usuarios con mas de 2 dias de inactividad
  POST    /api/users/:uemail                Elimina al usuario recibido por params
  POST    /api/users/:uemail/documents      Agregara al campo "documents" del usuario los documentos que se reciban
  GET     /api/users/premium/:uemail        Cambiara el roll del usuario a premium o user
  GET     /api/users/changePassword/:token  Renderizará la plantilla para que el usuario pueda ingresar la nueva contraseña
  POST    /api/users/changeUser/Password    Cambiará la contraseña del usuario en la Base de Datos
  POST    /api/users/changeRoll/:uemail     Cambiara el roll del usuario a recibido por body
```