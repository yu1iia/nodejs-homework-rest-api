const express = require('express')
const router = express.Router()

const { joiContactSchema } = require('../../models/contact')
const { validation } = require('../../middlewares')
const ctrl = require('../../controllers/contacts')

const validationMiddleware = validation(joiContactSchema)

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validationMiddleware, ctrl.add)

router.delete('/:contactId', ctrl.delById)

router.put('/:contactId', validationMiddleware, ctrl.updateById)

router.patch('/:contactId/favorite', ctrl.updateStatusContact)

module.exports = router
