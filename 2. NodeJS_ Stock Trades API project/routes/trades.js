const express = require('express');
const router = express.Router();

const trades = require('../controllers/trades');

router.post('/', trades.createTrade);
router.get('/', trades.getTrades);
router.get('/:id', trades.getTradeById);

router.delete('/:id', (req, res) => { res.status(405).send() });
router.put('/:id', (req, res) => { res.status(405).send() });
router.patch('/:id', (req, res) => { res.status(405).send() });

module.exports = router;
