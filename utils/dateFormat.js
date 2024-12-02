// 日付をyyyy-mm-dd形式に変換する関数
export const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2); // 月は0から始まるため+1
  const day = (`0${date.getDate()}`).slice(-2); // 日付が1桁のときに0埋めする

  // JSTに変換
  const jstDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const jstYear = jstDate.getFullYear();
  const jstMonth = (`0${jstDate.getMonth() + 1}`).slice(-2);
  const jstDay = (`0${jstDate.getDate()}`).slice(-2);

  return `${jstYear}-${jstMonth}-${jstDay}`;
};