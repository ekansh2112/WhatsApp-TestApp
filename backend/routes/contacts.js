const express = require('express')
const router = express.Router();


const contact_controller = require('../controllers/contactController')


router.get('/all', contact_controller.contact_list);
router.get('/:id/search', contact_controller.search_contact);
router.post('/create', contact_controller.create_contact);
router.put('/:id/update', contact_controller.update_contact);
router.delete('/:id/delete', contact_controller.delete_contact);

module.exports = router;
