import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "~/components/ui/sidebar";
import { ROLE_NAV } from "~/config/navigation";
import { useProfile } from "~/store/use-profile";

function usePageTitle(pathname: string): string {
	const items = Object.values(ROLE_NAV).flatMap((group) => group.items);
	// Longest matching url wins so "/teacher/classes" beats "/teacher".
	const match = items
		.filter((item) => pathname === item.url)
		.sort((a, b) => b.url.length - a.url.length)[0];
	return match?.title ?? "Dashboard";
}

export default function ProtectedLayout() {
	const user = useProfile((s) => s.user);
	const hasHydrated = useProfile((s) => s.hasHydrated);
	const syncSession = useProfile((s) => s.syncSession);
	const location = useLocation();
	const title = usePageTitle(location.pathname);
	// After an OIDC redirect there's a Kratos cookie but no persisted user;
	// check whoami once before deciding the user is unauthenticated.
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (hasHydrated && !user && !checked) {
			syncSession().finally(() => setChecked(true));
		}
	}, [hasHydrated, user, checked, syncSession]);

	// Wait for sessionStorage rehydration (and the whoami probe) before
	// deciding auth state, otherwise SSR/first paint would redirect to /login.
	if (!hasHydrated || (!user && !checked)) {
		return (
			<div className="flex min-h-svh items-center justify-center p-6">
				<Skeleton className="h-32 w-full max-w-md rounded-xl" />
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	const schoolName = user.school?.name ?? "Dashboard";

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-vertical:h-4 data-vertical:self-auto"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									{schoolName}
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>{title}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
