export const shortenName = (username: string) => {
  let fullUsername = username;
  if (fullUsername?.split(" ").length > 1) {
    return (
      fullUsername?.split(" ")[0].charAt(0) + "." + fullUsername?.split(" ")[1]
    );
  } else {
    return fullUsername;
  }
};