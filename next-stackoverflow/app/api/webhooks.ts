/* eslint-disable camelcase */

import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    // Create a new user in your db
    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
      username: username!,
      email: email_addresses[0].email_address,
      picture: image_url,
    });

    res.status(201).json({ user: mongoUser, message: "OK" });
  } else if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    // Create a new user in your db
    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name}${last_name ? String(last_name) : ""}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      path: `/profile/${id}`,
    });

    res.status(201).json({ user: mongoUser, message: "Updated" });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const deletedUser = await deleteUser({ clerkId: id! });
    res.status(200).json({ user: deletedUser, message: "Deleted" });
  }
}
