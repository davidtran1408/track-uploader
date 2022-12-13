export const formatTime = (totalSeconds: number): string => {
  const dataConfig = +totalSeconds.toFixed(0);
  let seconds: any = dataConfig % 60;
  let minutes: any = Math.floor(dataConfig / 60);
  seconds = `0${seconds}`.slice(-2);
  minutes = `0${minutes}`.slice(-2);

  return `${minutes}:${seconds}`;
};