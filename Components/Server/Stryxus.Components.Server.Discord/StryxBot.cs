using Discord;
using Discord.WebSocket;
using ProfFilter = ProfanityFilter.ProfanityFilter;

namespace Stryxus.Components.Server.Discord;

public class StryxBot : IAsyncDisposable
{
    private readonly DiscordSocketClient Client;
    private SocketGuild Guild;
    private readonly ProfFilter Filter = new();

#pragma warning disable CS8618
    public StryxBot(string discordToken)
#pragma warning restore CS8618
    {
        Client = new(new DiscordSocketConfig
        {
            AlwaysDownloadUsers = true,
            GatewayIntents = GatewayIntents.All,
            MessageCacheSize = 100
        });

        Client.Log += async (LogMessage msg) => Console.WriteLine($"StryxBot: {msg.Message}");

        Client.MessageReceived += async (SocketMessage msg) =>
        {
            await FilterProfanity(msg);
        };

        Client.MessageUpdated += async (Cacheable<IMessage, ulong> before, SocketMessage after, ISocketMessageChannel channel) =>
        {
            await FilterProfanity(after);
        };

        Client.Ready += async () => 
        {
            await Client.SetStatusAsync(UserStatus.AFK);
            await Client.SetGameAsync("Loading...");

            Guild = Client.GetGuild(1050396378767032371);

            await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.SendMessages, true);
            await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.SendTTSMessages, true);
            await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.Connect, true);
            await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.Speak, true);
            await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.CreatePublicThreads, true);
            await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.CreatePrivateThreads, true);
            await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.SendMessagesInThreads, true);
            await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.SendVoiceMessages, true);

            await Client.SetStatusAsync(UserStatus.Online);
            await Client.SetGameAsync("You...", null, ActivityType.Watching);
        };

        Client.LoginAsync(TokenType.Bot, discordToken);
        Client.StartAsync();
    }

    public async ValueTask DisposeAsync()
    {
        await Client.SetStatusAsync(UserStatus.DoNotDisturb);
        await Client.SetGameAsync("Shutting Down...");

        await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.SendMessages, false);
        await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.SendTTSMessages, false);
        await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.Connect, false);
        await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.Speak, false);
        await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.CreatePublicThreads, false);
        await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.CreatePrivateThreads, false);
        await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.SendMessagesInThreads, false);
        await DiscordPermissions.SetPermission(Guild.EveryoneRole, GuildPermission.SendVoiceMessages, false);

        await Client.StopAsync();
        await Client.LogoutAsync();
        GC.SuppressFinalize(this);
    }

    private async Task FilterProfanity(SocketMessage msg, Cacheable<IMessage, ulong>? before = null)
    {
        List<string> profanity;
        if ((profanity = Filter.DetectAllProfanities(msg.Content).ToList()).Count > 0)
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
