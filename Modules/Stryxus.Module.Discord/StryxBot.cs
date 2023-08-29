using Discord;
using Discord.WebSocket;

using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;

using ProfFilter = ProfanityFilter.ProfanityFilter;

namespace Stryxus.Module.Discord;

public class StryxBot
{
    private ProfFilter filter = new();

    public void Start(string discordToken)
    {
        DiscordSocketClient client = new(new DiscordSocketConfig
        {
            AlwaysDownloadUsers = true,
            GatewayIntents = GatewayIntents.All,
            MessageCacheSize = 100
        });
        client.Log += async (LogMessage msg) => Console.WriteLine($"StryxBot: {msg.Message}");

        client.MessageReceived += async (SocketMessage msg) =>
        {
            await FilterProfanity(msg);
        };

        client.MessageUpdated += async (Cacheable<IMessage, ulong> before, SocketMessage after, ISocketMessageChannel channel) =>
        {
            await FilterProfanity(after);
        };

        client.LoginAsync(TokenType.Bot, discordToken);
        client.StartAsync();
    }

    private async Task FilterProfanity(SocketMessage msg, Cacheable<IMessage, ulong>? before = null)
    {
        List<string> profanity;
        if ((profanity = filter.DetectAllProfanities(msg.Content).ToList()).Count > 0)
        {
            string profmsg;
            if (before is null)
            {
                profmsg = $"Your message has been removed because it contains profanity which is not allowed!\nIncluded Profanity: '{string.Join("', '", profanity)}'\n\nYour message:";
                await msg.Author.SendMessageAsync(profmsg, false, null, null, null, null, null);
                await msg.Author.SendMessageAsync(msg.Content, false, null, null, null, null, null);
            }
            else
            {
                profmsg = $"Your edited message has been removed because it contains profanity which is not allowed!\nIncluded Profanity: '{string.Join("', '", profanity)}'\n\nYour previous message:";
                await msg.Author.SendMessageAsync(profmsg, false, null, null, null, null, null);
                await msg.Author.SendMessageAsync((await before.Value.GetOrDownloadAsync()).Content, false, null, null, null, null, null);
            }
            await msg.DeleteAsync(new RequestOptions
            {
                AuditLogReason = "Profanity Filter Triggered"
            });
        }
    }
}
