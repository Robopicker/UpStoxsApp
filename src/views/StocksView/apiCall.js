async function callApi() {
  const response = await fetch(
    'https://run.mocky.io/v3/6d0ad460-f600-47a7-b973-4a779ebbaeaf',
  );
  const data = await response.json();
  return data;
}

export const fetchStockData = async dispatch => {
  try {
    dispatch({
      type: 'FETCHING_DATA',
    });
    const response = await callApi();
    let totalCurrentValue = 0;
    let totalInvestmentValue = 0;
    let todayPL = 0;
    const updateData = response?.data.map(item => {
      let currentValue = item?.quantity * item?.ltp;
      let investmentValue = item?.avg_price * item?.quantity;
      totalCurrentValue += currentValue;
      totalInvestmentValue += investmentValue;
      //((Close - LTP ) * quantity)
      todayPL += (item?.close - item?.ltp) * item?.quantity;
      return {
        ...item,
        pl: (currentValue - investmentValue).toFixed(2),
      };
    });
    dispatch({
      type: 'SAVE_DATA',
      payload: {
        stockList: updateData,
        totalCurrentValue,
        totalInvestmentValue,
        totalPL: totalCurrentValue - totalInvestmentValue,
        todayPL,
      },
    });
  } catch (error) {
    dispatch({
      type: 'DATA_ERROR',
    });
  }
};
