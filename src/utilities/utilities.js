export function getTimeLapsed(from) {
  const now = new Date();
  const aDay = 86400000;
  const aHour = 1000 * 60 * 60;
  const difference = now - from;

  if (difference < aHour) {
    return Math.floor(difference / (1000 * 60)) + " minutos";
  } else if (difference === aHour || difference < aHour * 2) {
    return "1 Hora";
  } else if (difference >= aHour * 2 && difference < aDay) {
    return Math.floor(difference / aHour) + " horas";
  } else if (difference === aDay || difference < aDay * 2) {
    return Math.floor(difference / aDay) + " día";
  } else {
    return Math.floor(difference / aDay) + " días";
  }
}

export const generateId = (id1, id2) => id1 > id2 ? id1 + id2 : id2 + id1;



