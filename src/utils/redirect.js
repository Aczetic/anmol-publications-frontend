// handles the "?redirect=" param of the login / sign up pages
// e.g. read sample -> /login?redirect=/read-sample/123 -> after login the user lands back on /read-sample/123

// only paths of this site are accepted, so a link can't send the user to some other website after login
export const getRedirect = (searchParams) => {
  const redirect = searchParams.get("redirect");
  if (!redirect || !redirect.startsWith("/") || redirect.startsWith("//") || redirect.startsWith("/\\")) return null;
  return redirect;
};

export const withRedirect = (path, redirect) =>
  redirect ? `${path}?redirect=${encodeURIComponent(redirect)}` : path;
