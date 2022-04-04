const useAuth = () => {
  var user = { loggedIn: true, role: "user" };

  return {
    auth: user && user.loggedIn,
    role: user.role,
  };
};

export default useAuth;
