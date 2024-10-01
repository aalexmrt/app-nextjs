import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function Home() {
    const { user } = await getSession();
    console.log(user);
    return (
      <>
        <div>Hello {user.name}</div>
      </>
    );
  },
  { returnTo: "/" }
);
