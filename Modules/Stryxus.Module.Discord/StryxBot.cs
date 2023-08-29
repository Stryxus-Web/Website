using Discord;
using Discord.WebSocket;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stryxus.Module.Discord;

public class StryxBot
{
    public void Connect(string discordToken)
    {
        DiscordSocketClient client = new(new DiscordSocketConfig() 
        {
            AlwaysDownloadUsers = true,
            GatewayIntents = GatewayIntents.Guilds | GatewayIntents.AutoModerationActionExecution | GatewayIntents.DirectMessages,
        });
        client.LoginAsync(TokenType.Bot, discordToken);
        client.StartAsync();
        client.Log += async (LogMessage msg) => 
        {
            Console.WriteLine($"StryxBot: {msg.Message}");
        };
    }
}
