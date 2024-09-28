import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Search from "./ui/search";
import NavBar from "./ui/nav-bar";
import Avatar from "./ui/avatar";

export default withPageAuthRequired(
  async function Home() {
    const { user } = await getSession();
    console.log(user);
    return (
      <>
        <div className="flex p-2 items-baseline	">
          <div>Logo</div>
          <NavBar />
          <Avatar />
        </div>
        <div>Hello {user.name}</div>
      </>
    );
  },
  { returnTo: "/" }
);
