const getMatchedUserInfo = (users, userLoggedIn) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedIn];

  const [id, user] = Object.entries(newUsers).flat(); //turn the object into a single dimension array with id and user only
  return { id, ...user };
};

export default getMatchedUserInfo;
