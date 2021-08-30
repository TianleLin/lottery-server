import axios from 'axios'

export async function getPrize() {
  try {
    // 发出一个 POST 请求，并设置请求体
    // 请注意将示例中的 URL 地址和参数更换为你的真实请求地址和参数
    const result = await axios.post('https://qciwmk.fn.thelarkcloud.com/getPrizeInfo');
    console.log(result);
    // console.log(JSON.stringify(result.data));
    return result.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
export async function deletePrize(params) {
  try {
    // 发出一个 POST 请求，并设置请求体
    // 请注意将示例中的 URL 地址和参数更换为你的真实请求地址和参数
    const result = await axios.post('https://qciwmk.fn.thelarkcloud.com/deletePrize', {
      _id: params
    });
    return result;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
export async function updatePrize(id,name,amout,rate) {
  try {
    // 发出一个 POST 请求，并设置请求体
    // 请注意将示例中的 URL 地址和参数更换为你的真实请求地址和参数
    const result = await axios.post('https://qciwmk.fn.thelarkcloud.com/updatePrize', {
      _id: id,
      prize_name: name,
      prize_amount: amout,
      prize_rate: rate,
    });
    return result;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
export async function insertPrize(name,amout,rate) {
  try {
    // 发出一个 POST 请求，并设置请求体
    // 请注意将示例中的 URL 地址和参数更换为你的真实请求地址和参数
    const result = await axios.post('https://qciwmk.fn.thelarkcloud.com/insertPrize', {
      prize_name: name,
      prize_amount: amout,
      prize_rate: rate,
    });
    return result.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}