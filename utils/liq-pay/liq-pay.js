const crypto = require('crypto');
const { liqpayPublicKey, liqpayPrivateKey, sandboxMod } = require('config').credentials.liqPay;

function LiqPay(publicKey, privateKey) {
  this.host = 'https://www.liqpay.com/api/';

  // this.api = (path, params, callback, callbackerr) => {
  //   if (!params.version) throw new Error('version is null')
  //
  //   params.publicKey = publicKey
  //   const data = new Buffer(JSON.stringify(params)).toString('base64')
  //   const signature = this.str_to_sign(privateKey + data + privateKey)
  //
  //   const formData = new FormData()
  //   formData.append('data', data)
  //   formData.append('signature', signature)
  //
  //   fetch(this.host + path, {
  //     method: 'POST',
  //     mode: 'no-cors',
  //     body: formData
  //   })
  //     .then(res => callback(res))
  //     .catch(err => callbackerr(err))
  // }

  // this.cnb_form = params => {
  //   let language = 'ru'
  //   if (params.language) {
  //     language = params.language
  //   }
  //
  //   params = this.cnb_params(params)
  //   const data = new Buffer(JSON.stringify(params)).toString('base64')
  //   const signature = this.str_to_sign(privateKey + data + privateKey)
  //
  //   return `<form method="POST" action="https://www.liqpay.com/api/checkout" accept-charset="utf-8">
  //     <input type="hidden" name="data" value="'${data}'" />
  //     <input type="hidden" name="signature" value="'${signature}'" />
  //     <input type="image" src="//static.liqpay.com/buttons/p1'${language}'.radius.png" name="btn_text" />
  //   </form>`
  // }

  this.cnb_signature = params => {
    params = this.cnb_params(params)
    const data = new Buffer(JSON.stringify(params)).toString('base64')
    return this.str_to_sign(privateKey + data + privateKey)
  };

  this.cnb_params = params => {
    params.public_key = publicKey;

    if (!params.version) throw new Error('version is null');
    if (!params.amount) throw new Error('amount is null');
    if (!params.currency) throw new Error('currency is null');
    if (!params.description) throw new Error('description is null');

    return params;
  };

  this.str_to_sign = str => {
    const sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('base64');
  };

  this.assemblePayURL = (user_id, amount, depositId) => {
    let params = {
      amount,
      order_id: depositId,
      version: '3',
      action: 'pay',
      sandbox: sandboxMod,
      result_url: 'http://parkomat.yojji.io:3000/',
      server_url: 'http://parkomat.yojji.io:3000/api/pay-callback',
      currency: 'UAH',
      description: 'Refill Parkomat account'
    };

    params = this.cnb_params(params);
    const data = new Buffer(JSON.stringify(params)).toString('base64');
    const signature = this.str_to_sign(privateKey + data + privateKey);
    return `https://www.liqpay.com/api/3/checkout?data=${data}&signature=${signature}`;
  };

  this.isValidSignature = (data, signature) => (
    this.str_to_sign(privateKey + data + privateKey) === signature
  );

  return this;
}

module.exports = new LiqPay(liqpayPublicKey, liqpayPrivateKey);
