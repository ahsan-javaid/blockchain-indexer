import express = require('express');
const router = express.Router({ mergeParams: true });


router.get('/:address', () => {

});

router.get('/:address/txs', () => {

});
router.get('/:address/coins', () => {

});

router.get('/:address/balance', () => {

});

module.exports = {
  router,
  path: '/address'
};
