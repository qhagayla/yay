export default function convertDateTime(date) {
  const uploadDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - uploadDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let formattedDate = "";

  if (days < 1) {
    formattedDate = `${hours} hours ago`;
  } else if (days < 7) {
    formattedDate = `${days} days ago`;
  } else {
    formattedDate = uploadDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return formattedDate;
}
