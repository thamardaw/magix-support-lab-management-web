export default function padZero(value, pad = "000") {
  const value_str = "" + value;
  return pad.substring(0, pad.length - value_str.length) + value_str;
}
