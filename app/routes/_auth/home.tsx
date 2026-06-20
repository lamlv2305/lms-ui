import { Navigate } from "react-router";
import { landingPath } from "~/config/navigation";
import { useProfile } from "~/store/use-profile";

export default function Home() {
	const user = useProfile((s) => s.user);
	return <Navigate to={landingPath(user?.school?.roles)} replace />;
}
