const getMatchedUserInfo = (users, userLoggedIn) => {
  console.log(users);
  const newUsers = { ...users };
  delete newUsers[userLoggedIn];
  console.log(newUsers);
  const [id, user] = Object.entries(newUsers).flat(); //turn the object into a single dimension array with id and user only
  return { id, ...user };
};

export default getMatchedUserInfo;
