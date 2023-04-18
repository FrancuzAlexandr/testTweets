import useStore from "./store";

const url = new URL(
  // "https://63adedf4ceaabafcf16fc55a.mockapi.io/users?page=1&limit=3"
  "https://63adedf4ceaabafcf16fc55a.mockapi.io/users"
);
url.searchParams.append("completed", false); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false
url.searchParams.append("page", 1); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false&page=1
url.searchParams.append("limit", 3); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false&page=1&limit=10

export const fetchUsers = () => {
  fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((tasks) => {
      useStore.setState((state) => {
        const newTasks = tasks.map(
          ({ id, user, tweets, followers, avatar, isFollowing }) => {
            return { id, user, tweets, followers, avatar, isFollowing };
          }
        );
        return {
          users: newTasks,
        };
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const generateURL = (dynamicId) => {
  const url = new URL(
    `https://63adedf4ceaabafcf16fc55a.mockapi.io/users/${dynamicId}`
  );
  url.searchParams.append("completed", false); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false
  url.searchParams.append("page", 1); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false&page=1
  url.searchParams.append("limit", 3); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false&page=1&limit=10
  return url;
};

export const fetchUsersUpdate = (tweet) => {
  fetch(generateURL(tweet.id), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...tweet,
      isFollowing: !tweet.isFollowing,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};
