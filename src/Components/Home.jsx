// import { Feed } from "./Feed";

// export const Home = ({ posts }) => {
//   return (
//     <main className="Home">
//       {posts.length ? (
//         <Feed posts={posts} />
//       ) : (
//         <p style={{ margin: "2rem" }}> No posts to Display.</p>
//       )}
//     </main>
//   );
// };

//------------------------------------------------------------------------------------------------------------
import { Feed } from "./Feed";

export const Home = ({ posts, isLoading, fetchError }) => {
  return (
    <main className="Home">
      {isLoading && <p>Loading posta......</p>}

      {!isLoading && fetchError && <p>{fetchError}</p>}
      {!isLoading && !fetchError && posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ margin: "2rem" }}> No posts to Display.</p>
      )}
    </main>
  );
};
