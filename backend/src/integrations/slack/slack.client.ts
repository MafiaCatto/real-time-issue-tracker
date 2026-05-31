// src/integrations/slack/slack.client.ts
import { WebClient } from "@slack/web-api";
import { env } from "../../config/env";

export const slackClient = new WebClient(env.slackBotToken);
