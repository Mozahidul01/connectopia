import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommunitySubscriptionValidator } from "@/lib/validators/community";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { communityId } = CommunitySubscriptionValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        communityId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response("You are not subscribed to this community.", {
        status: 400,
      });
    }

    //check if the user is the owner of the community
    const community = await db.community.findFirst({
      where: {
        id: communityId,
        creatorId: session.user.id,
      },
    });

    if (community) {
      return new Response("You can not unsubscribe from your own community", {
        status: 400,
      });
    }

    await db.subscription.deleteMany({
      where: {
        userId: session?.user.id,
        communityId: communityId,
      },
    });

    return new Response(communityId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Couldn't unsubscribe to this community", {
      status: 500,
    });
  }
}
