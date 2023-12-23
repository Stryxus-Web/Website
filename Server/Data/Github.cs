using System.Collections.Concurrent;
using System.Timers;

using Stryxus.Data.Json;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using Timer = System.Timers.Timer;

namespace Stryxus.Server.Data;

public class Github
{
	private BlockingCollection<GithubJson.CommitJson> Commits = [];

	public Github()
	{
		RetrieveCommits().GetAwaiter().GetResult();
		Timer t = new(1000);
		int lastHour = DateTime.Now.Hour;
		t.Elapsed += new ElapsedEventHandler(async (object? source, ElapsedEventArgs e) => 
		{
			if (lastHour < DateTime.Now.Hour || (lastHour == 23 && DateTime.Now.Hour == 0))
			{
				lastHour = DateTime.Now.Hour;
				await RetrieveCommits();
			}
		});
		t.Start();

		async Task RetrieveCommits()
		{
			Commits = [];
			using HttpClient client = new();
			using HttpRequestMessage req = new()
			{
				RequestUri = new($"https://api.github.com/repos/Stryxus/Website/commits?per_page=100&page=1"),
				Method = HttpMethod.Get,
			};
			req.Headers.Add("Accept", "application/vnd.github+json");
			req.Headers.Add("X-GitHub-Api-Version", "2022-11-28");
			req.Headers.Add("User-Agent", "Other");
			using HttpResponseMessage comResp = await client.SendAsync(req);
			if (comResp.IsSuccessStatusCode)
			{
				JArray? content;
				if ((content = JsonConvert.DeserializeObject(await comResp.Content.ReadAsStringAsync()) as JArray) is not null)
				{
					foreach (JObject com in content.ToList().Cast<JObject>())
					{
						JObject? commit = com.GetValue("commit") as JObject;
						if (commit is not null)
						{
							JToken? title = commit.GetValue("message");
							JToken? author = (commit.GetValue("author") as JObject)?.GetValue("name");
							if (title is not null && author is not null) // This should never fail but it makes the analyser happy
							{
								Commits.Add(new GithubJson.CommitJson
								{
									Title = title.ToString(),
									Author = author.ToString(),
								});
							}
						}
					}
				}
			}
		}
	}

	public BlockingCollection<GithubJson.CommitJson> GetCommits() => Commits;
}
