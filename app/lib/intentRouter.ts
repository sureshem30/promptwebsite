export function routeFromIntent(intent: string, slug?: string) {
    switch (intent) {
        case "ABOUT":
            return "/about";
        case "CASE_STUDIES":
            return "/case-studies";
        case "CASE_DETAIL":
            return slug ? `/case-studies/${slug}` : "/case-studies";
        default:
            return "/";
    }
}
