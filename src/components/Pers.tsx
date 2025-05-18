import React, { useEffect, useState } from "react";
type GithubUser = {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
};
const Pers = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/Akshat1sharma321`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-sm mx-auto mt-10 p-6 text-center">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="max-w-sm mx-auto mt-10 p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-sm mx-auto mt-10 p-6 text-center">
        No user data found
      </div>
    );
  }

  return (
    <div className="max-w-sm flex mx-auto mt-10 rounded-2xl border shadow-md p-6 bg-white dark:bg-gray-900">
      <img
        src={user.avatar_url}
        alt="avatar"
        className="w-24 p-1 flex flex-col h-24 align-middle justify-center rounded-full mx-auto mb-16 justify-items-center m-auto"
      />
      <div className="m-3">
        <h2 className="text-m font-bold text-center">{user.name}</h2>
        <a
          href="https://github.com/Akshat1sharma321"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-sm text-center text-gray-500">@{user.login}</p>
        </a>

        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-300">
          {user.bio}
        </p>
        <div className="flex justify-around mt-4 text-xs">
          <div>
            <p className="font-bold">{user.public_repos}</p>
            <p>Repos</p>
          </div>
          <div>
            <p className="font-bold">{user.followers}</p>
            <p>Followers</p>
          </div>
          <div>
            <p className="font-bold">{user.following}</p>
            <p>Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pers;
