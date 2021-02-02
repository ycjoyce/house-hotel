export const formattedDateStr = (dateStr) => {
  let result = dateStr.split('/').map((time, index) => {
    if (index < 1) return time;
    return time < 10 ? `0${time}` : time;
  });
  result = result.join('-');
  return result;
};

export const dayDistance = 24 * 60 * 60 * 1000;

export const getDateArr = (date1, date2) => {
  const after = new Date(date1) < new Date(date2) ? date2 : date1;
  const before = after === date2 ? date1 : date2;
  const newStart = new Date(before).getTime();
  const newEnd = new Date(after).getTime();
  const result = [];
  for (let i = newStart; i < newEnd; i += dayDistance) {
    const formattedDate = new Date(i).toLocaleDateString();
    result.push(formattedDateStr(formattedDate));
  }
  return result;
};
