using Discord;

namespace Stryxus.Components.Server.Discord;

public static class DiscordPermissions
{
    public static async Task SetPermission(IRole role, GuildPermission permission, bool toggle)
    {
        await role.ModifyAsync((props) =>
        {
            props.Permissions = new GuildPermissions(
                permission is GuildPermission.CreateInstantInvite ? toggle : role.Permissions.CreateInstantInvite,
                permission is GuildPermission.KickMembers ? toggle : role.Permissions.KickMembers,
                permission is GuildPermission.BanMembers ? toggle : role.Permissions.BanMembers,
                permission is GuildPermission.Administrator ? toggle : role.Permissions.Administrator,
                permission is GuildPermission.ManageChannels ? toggle : role.Permissions.ManageChannels,
                permission is GuildPermission.ManageGuild ? toggle : role.Permissions.ManageGuild,
                permission is GuildPermission.AddReactions ? toggle : role.Permissions.AddReactions,
                permission is GuildPermission.ViewAuditLog ? toggle : role.Permissions.ViewAuditLog,
                permission is GuildPermission.ViewGuildInsights ? toggle : role.Permissions.ViewGuildInsights,
                permission is GuildPermission.ViewChannel ? toggle : role.Permissions.ViewChannel,
                permission is GuildPermission.SendMessages ? toggle : role.Permissions.SendMessages,
                permission is GuildPermission.SendTTSMessages ? toggle : role.Permissions.SendTTSMessages,
                permission is GuildPermission.ManageMessages ? toggle : role.Permissions.ManageMessages,
                permission is GuildPermission.EmbedLinks ? toggle : role.Permissions.EmbedLinks,
                permission is GuildPermission.AttachFiles ? toggle : role.Permissions.AttachFiles,
                permission is GuildPermission.ReadMessageHistory ? toggle : role.Permissions.ReadMessageHistory,
                permission is GuildPermission.MentionEveryone ? toggle : role.Permissions.MentionEveryone,
                permission is GuildPermission.UseExternalEmojis ? toggle : role.Permissions.UseExternalEmojis,
                permission is GuildPermission.Connect ? toggle : role.Permissions.Connect,
                permission is GuildPermission.Speak ? toggle : role.Permissions.Speak,
                permission is GuildPermission.MuteMembers ? toggle : role.Permissions.MuteMembers,
                permission is GuildPermission.ChangeNickname ? toggle : role.Permissions.ChangeNickname,
                permission is GuildPermission.ManageNicknames ? toggle : role.Permissions.ManageNicknames,
                permission is GuildPermission.ManageRoles ? toggle : role.Permissions.ManageRoles,
                permission is GuildPermission.ManageWebhooks ? toggle : role.Permissions.ManageWebhooks,
                permission is GuildPermission.ManageEmojisAndStickers ? toggle : role.Permissions.ManageEmojisAndStickers,
                permission is GuildPermission.UseApplicationCommands ? toggle : role.Permissions.UseApplicationCommands,
                permission is GuildPermission.RequestToSpeak ? toggle : role.Permissions.RequestToSpeak,
                permission is GuildPermission.ManageEvents ? toggle : role.Permissions.ManageEvents,
                permission is GuildPermission.ManageThreads ? toggle : role.Permissions.ManageThreads,
                permission is GuildPermission.CreatePublicThreads ? toggle : role.Permissions.CreatePublicThreads,
                permission is GuildPermission.CreatePrivateThreads ? toggle : role.Permissions.CreatePrivateThreads,
                permission is GuildPermission.UseExternalStickers ? toggle : role.Permissions.UseExternalStickers,
                permission is GuildPermission.SendMessagesInThreads ? toggle : role.Permissions.SendMessagesInThreads,
                permission is GuildPermission.StartEmbeddedActivities ? toggle : role.Permissions.StartEmbeddedActivities,
                permission is GuildPermission.ModerateMembers ? toggle : role.Permissions.ModerateMembers,
                permission is GuildPermission.UseSoundboard ? toggle : role.Permissions.UseSoundboard,
                permission is GuildPermission.ViewMonetizationAnalytics ? toggle : role.Permissions.ViewMonetizationAnalytics,
                permission is GuildPermission.SendVoiceMessages ? toggle : role.Permissions.SendVoiceMessages
            );
        });
    }
}
