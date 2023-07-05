import CustomFeed from "@/components/homepage/CustomFeed";
import GeneralFeed from "@/components/homepage/GeneralFeed";
import MiniCreateCommunity from "@/components/homepage/MiniCreateCommunity";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <div>
      <h1 className="font-bold text-3xl md:text-4xl text-gray-900 dark:text-gray-100">
        Your Feed
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* feeds */}

        {session ? <CustomFeed /> : <GeneralFeed />}

        {/* Create community  */}
        <MiniCreateCommunity />
      </div>
    </div>
  );
}
