export function whoIsWinner(merchantsObj) {
  const merchArr = Object.keys(merchantsObj);
  let winner;
  let rubyMerchants = fiveRubyMerchants(merchantsObj);
  if (rubyMerchants.length > 1) {
    let richDudesWithRubies = moneyMerchants(rubyMerchants);
    winner = richDudesWithRubies[0];
  } else {
    winner = rubyMerchants[0];
  }
  return winner;
}

function fiveRubyMerchants(merchantsObj) {
  const merchArr = Object.keys(merchantsObj);
  let fiveRubyMerchants = [];
  merchArr.forEach((merchantId) => {
    if (merchantsObj[merchantId].wheelbarrow.ruby === 5) fiveRubyMerchants.push(merchantId = merchantsObj[merchantId]);
  })
  return fiveRubyMerchants;
}

function moneyMerchants(merchantsArray) {
  let sortedMerchantsByMoney = merchantsArray.sort(function(a, b) {
    return b.money - a.money;
  })
  let max = sortedMerchantsByMoney[0].money;
  let moneyKings = sortedMerchantsByMoney.filter((merchant) => {
    return merchant.money === max;
  });
  return moneyKings;
}
