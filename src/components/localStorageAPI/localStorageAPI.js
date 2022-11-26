const update = (item, data) => {
  const stringified = JSON.stringify(data);
  localStorage.setItem(item, stringified);
};

const get = item => {
  const savedData = localStorage.getItem(item);
  return JSON.parse(savedData);
};

export default { update, get };
