const calculateTotalProjectTime = (
  preSortTime,
  sortTime,
  postSortTime,
  surveyTime
) => {
  let hours;
  let minutes;
  let seconds;

  const preSortTimeArray = preSortTime.split(':').map(Number);
  const sortTimeArray = sortTime.split(':').map(Number);
  const postSortTimeArray = postSortTime.split(':').map(Number);
  const surveyTimeArray = surveyTime.split(':').map(Number);

  seconds =
    preSortTimeArray[2] +
    sortTimeArray[2] +
    postSortTimeArray[2] +
    surveyTimeArray[2];

  minutes =
    preSortTimeArray[1] +
    sortTimeArray[1] +
    postSortTimeArray[1] +
    surveyTimeArray[1];

  hours =
    preSortTimeArray[0] +
    sortTimeArray[0] +
    postSortTimeArray[0] +
    surveyTimeArray[0];

  const additionalMinutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds - additionalMinutes * 60;

  minutes += additionalMinutes;

  const additionalHours = Math.floor(minutes / 60);
  let remainingMinutes = minutes - additionalHours * 60;

  hours += additionalHours;

  if (remainingSeconds < 10) {
    remainingSeconds = `0${remainingSeconds}`;
  }

  if (remainingMinutes < 10) {
    remainingMinutes = `0${remainingMinutes}`;
  }

  const totalCumulativeTime = `${hours}:${remainingMinutes}:${remainingSeconds}`;

  return totalCumulativeTime;
};

export default calculateTotalProjectTime;
