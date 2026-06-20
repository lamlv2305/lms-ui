import { GalleryVerticalEndIcon } from "lucide-react";
import type * as React from "react";
import { NavRole } from "~/components/nav-role";
import { NavUser } from "~/components/nav-user";
import { TeamSwitcher } from "~/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "~/components/ui/sidebar";
import { ROLE_NAV, rolesInOrder } from "~/config/navigation";
import { useProfile } from "~/store/use-profile";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = useProfile((s) => s.user);
	const logout = useProfile((s) => s.logout);
	const roles = rolesInOrder(user?.school?.roles);

	const team = {
		name: user?.school?.name ?? "No School",
		logo: <GalleryVerticalEndIcon />,
		plan: "School",
	};

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={[team]} />
			</SidebarHeader>
			<SidebarContent>
				{roles.map((role) => (
					<NavRole key={role} {...ROLE_NAV[role]} />
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						name: user?.name ?? "",
						email: user?.email ?? "",
						avatar: user?.avatar ?? "",
					}}
					onLogout={logout}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
