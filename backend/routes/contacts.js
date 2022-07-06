const express = require('express')
const router = express.Router();


const contact_controller = require('../controllers/contactController')


router.get('/all', contact_controller.contact_list);
router.get('/search/:id', contact_controller.search_contact);
router.post('/create', contact_controller.create_contact);
router.put('/update/:id', contact_controller.update_contact);
router.delete('/delete/:id', contact_controller.delete_contact);

module.exports = router;
