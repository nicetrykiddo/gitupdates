require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

async function sendMessage(message, buttons = []) {
  const payload = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: "HTML",
    disable_web_page_preview: false,
    reply_markup: { inline_keyboard: buttons },
  };

  await axios.post(BASE_URL, payload);
}

app.post("/webhook", async (req, res) => {
  const eventType = req.headers["x-github-event"];
  const payload = req.body;
  let message = "";
  let buttons = [];

  switch (eventType) {
    case "push":
      message =
        `⚒ <b>New Commit(s) Pushed</b>\n` +
        `📌 Repo: <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>\n` +
        `👤 By: <a href="https://github.com/${payload.pusher.name}">${payload.pusher.name}</a>\n` +
        `📝 Commit(s):\n`;
      payload.commits.forEach((commit) => {
        message += `🔹 <a href="${commit.url}"><code>${commit.id.substring(
          0,
          7
        )}</code></a> - ${commit.message}\n`;
      });

      buttons.push([{ text: "🔍 View Changes", url: payload.compare }]);
      break;

    case "fork":
      message =
        `🍴 <b>New Repository Forked</b>\n` +
        `👤 <a href="${payload.sender.html_url}">${payload.sender.login}</a> forked <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>\n` +
        `📌 Forked to: <a href="${payload.forkee.html_url}">${payload.forkee.full_name}</a>`;
      break;

    case "watch":
      message =
        `⭐ <b>New Star</b>\n` +
        `👤 <a href="${payload.sender.html_url}">${payload.sender.login}</a> starred <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>\n` +
        `✨ Total Stars: <b>${payload.repository.stargazers_count}</b>`;
      buttons.push([
        {
          text: "🌟 View Stars",
          url: `${payload.repository.html_url}/stargazers`,
        },
      ]);
      break;

    case "issues":
      message =
        `🐞 <b>Issue ${payload.action}</b>\n` +
        `📌 Repo: <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>\n` +
        `🔗 <a href="${payload.issue.html_url}">#${payload.issue.number}</a> - ${payload.issue.title}\n` +
        `👤 By: <a href="${payload.issue.user.html_url}">${payload.issue.user.login}</a>`;
      buttons.push([{ text: "🐛 View Issue", url: payload.issue.html_url }]);
      break;

    case "issue_comment":
      message =
        `💬 <b>New Issue Comment</b>\n` +
        `👤 <a href="${payload.comment.user.html_url}">${payload.comment.user.login}</a> commented on issue <a href="${payload.issue.html_url}">#${payload.issue.number}</a>\n` +
        `📝 ${payload.comment.body}`;
      buttons.push([
        { text: "💬 View Comment", url: payload.comment.html_url },
      ]);
      break;

    case "pull_request":
      message =
        `🔀 <b>Pull Request ${payload.action}</b>\n` +
        `📌 Repo: <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>\n` +
        `🔗 <a href="${payload.pull_request.html_url}">#${payload.pull_request.number}</a> - ${payload.pull_request.title}\n` +
        `👤 By: <a href="${payload.pull_request.user.html_url}">${payload.pull_request.user.login}</a>`;
      buttons.push([
        { text: "🔀 View Pull Request", url: payload.pull_request.html_url },
      ]);
      break;

    case "release":
      message =
        `🚀 <b>New Release Published</b>\n` +
        `📌 Repo: <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>\n` +
        `🎉 <a href="${payload.release.html_url}">${payload.release.tag_name}</a> - ${payload.release.name}\n` +
        `👤 By: <a href="${payload.sender.html_url}">${payload.sender.login}</a>`;
      buttons.push([
        { text: "🚀 View Release", url: payload.release.html_url },
      ]);
      break;

    case "repository":
      message =
        `📂 <b>Repository ${payload.action}</b>\n` +
        `📌 <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>\n` +
        `👤 By: <a href="${payload.sender.html_url}">${payload.sender.login}</a>`;
      buttons.push([
        { text: "📁 View Repository", url: payload.repository.html_url },
      ]);
      break;

    case "security_advisory":
      message =
        `⚠️ <b>Security Alert</b>\n` +
        `📌 Repo: <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>\n` +
        `🔴 Advisory: <b>${payload.advisory.summary}</b>\n` +
        `📝 Details: ${payload.advisory.description}`;
      buttons.push([
        { text: "⚠️ View Advisory", url: payload.advisory.html_url },
      ]);
      break;

    default:
      message =
        `📢 <b>Unhandled Event: ${eventType}</b>\n` +
        `📌 Repo: <a href="${payload.repository.html_url}">${payload.repository.full_name}</a>`;
  }

  if (message) {
    await sendMessage(message, buttons);
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log(`🚀 Webhook server running on port 3000!`));
