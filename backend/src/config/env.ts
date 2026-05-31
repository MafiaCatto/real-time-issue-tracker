import "dotenv/config";

export const env = {
  port: Number(process.env.PORT || 4000),
  kafkaBroker: process.env.KAFKA_BROKER || "localhost:29092",
  slackBotToken: process.env.SLACK_BOT_TOKEN,
  nodeEnv: process.env.NODE_ENV || "development",
};
