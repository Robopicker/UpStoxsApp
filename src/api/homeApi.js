const callPromise = async () => {
  const data = await fetch('https://dummyjson.com/products');
  const result = await data.json();
  return result;
};

export const fetchData = async dispatch => {
  const result = await callPromise();
  dispatch({
    type: 'SAVE_DATA',
    payload: result.products,
  });
};
