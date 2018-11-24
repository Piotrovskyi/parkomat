const LiqPay = require('./liq-pay');

module.exports = {
  generatePayLink: (userId, amount, depositId) => LiqPay.assemblePayURL(userId, amount, depositId),
  getValidPayment: (rawData, signature) => {

    console.log('#################### 4', JSON.parse(new Buffer(rawData, 'base64').toString()));

    if (!LiqPay.isValidSignature(rawData, signature)) {
      console.log('#################### 5');
      return false;
    }

    console.log('#################### 6');

    const data = JSON.parse(new Buffer(rawData, 'base64').toString());
    const successStatuses = ['success', 'sandbox'];

    console.log('#################### 7', data);

    return (!~successStatuses.indexOf(data.status)) ? data : null;
  }
};

// {
//    "action":"pay",
//    "payment_id":237267870,
//    "status":"sandbox",
//    "version":3,
//    "type":"buy",
//    "paytype":"card",
//    "public_key":"i64049925655",
//    "acq_id":414963,
//    "order_id":"order_id_4",
//    "liqpay_order_id":"3MKQPPAA1472903159171886",
//    "description":"description text",
//    "sender_card_mask2":"516875*66",
//    "sender_card_bank":"pb",
//    "sender_card_type":"mc",
//    "sender_card_country":804,
//    "ip":"46.172.70.108",
//    "amount":1.0,
//    "currency":"USD",
//    "sender_commission":0.0,
//    "receiver_commission":0.03,
//    "agent_commission":0.0,
//    "amount_debit":26.6,
//    "amount_credit":26.6,
//    "commission_debit":0.0,
//    "commission_credit":0.73,
//    "currency_debit":"UAH",
//    "currency_credit":"UAH",
//    "sender_bonus":0.0,
//    "amount_bonus":0.0,
//    "mpi_eci":"7",
//    "is_3ds":false,
//    "create_date":1472903159217,
//    "end_date":1472903159217,
//    "transaction_id":237267870
// }
