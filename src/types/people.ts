import { getPeopleWstarring, getPersonWstarring } from "@/app/actions/people";

export type Peeps = Awaited<ReturnType<typeof getPeopleWstarring>>;
export type Peep = Awaited<ReturnType<typeof getPersonWstarring>>;
