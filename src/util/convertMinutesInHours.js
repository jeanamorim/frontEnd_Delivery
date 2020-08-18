export default function convertHourToMinutes(time) {
  const hours = time / 60;
  const minutes = time % 60;

  const timeInMinutes = `${hours}:${minutes}`;

  return timeInMinutes;
}
