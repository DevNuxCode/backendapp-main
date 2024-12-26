const express = require('express')
const respuesta = require('../../red/respuestas')
const controlador = require('./index')

const router = express.Router()

router.get('/', todos)
router.get('/:id', uno)
router.post('/', agregar)
router.put('/', eliminar)

router.delete('/items/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const result = await controlador.eliminar(itemId);
        if (result.affectedRows > 0) {
            respuesta.success(req, res, 'Item deleted successfully', 200);
        } else {
            respuesta.error(req, res, 'Item not found', 404);
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        respuesta.error(req, res, 'Internal Server Error', 500);
    }
});

async function todos (req, res) {

    try {
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200)
    }catch(err){
        console.error('Error fetching items:', err)
        respuesta.error(req, res, 'Internal Server Error', 500)

    }
    
   
    
}

async function uno(req, res) {
        try {
        const items = await controlador.uno(req.params.id)
        respuesta.success(req, res, items, 200)
    }catch(err){
        console.error('Error fetching items:', err)
        respuesta.error(req, res, 'Internal Server Error', 500)

    }
    
}




async function agregar(req, res, next) {
    try {
       
       const item = await controlador.agregar(req.body)
       if(req.body.id == 0){
        mensaje = 'Item guardado con exito'
       }else{
        mensaje = 'Item actualizado con exito'
       }

       respuesta.success(req, res, mensaje, 201)
   }catch(err){
       next(err);
       respuesta.error(req, res,  err, 500)

}}


async function eliminar(req, res, next) {
     try {
        
        const item = await controlador.eliminar(req.body)
        respuesta.success(req, res, 'Item Eliminado satisfactoriamente', 200)
    }catch(err){
        next(err);
        respuesta.error(req, res,  err, 500)

}

}
module.exports = router;