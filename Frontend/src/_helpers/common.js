
const numberFormat = (num, fDigit=0) => {
  
  const formattedNumber = num.toLocaleString('en-US', {
    minimumFractionDigits: fDigit,
    maximumFractionDigits: fDigit,
  });

  return formattedNumber;
};
function convertUnixTimestampToTime(timestamp) {
  // Convert Unix timestamp to milliseconds
  const milliseconds = timestamp * 1000;
  
  // Create a new Date object with the timestamp
  const date = new Date(milliseconds);
  
  // Extract time components
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  // Format the time string
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  
  return formattedTime;
}
const addZeroes = num => num.toLocaleString("en",{minimumFractionDigits: 2})


export const common = { numberFormat,convertUnixTimestampToTime, addZeroes };