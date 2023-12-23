using Microsoft.AspNetCore.Mvc;

using Stryxus.Data;
using Stryxus.Server.Data;

using Newtonsoft.Json;

namespace Stryxus.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GithubController(Github github) : ControllerBase
{
	private Github Github { get; set; } = github;

	[HttpGet("{id}")]
	public string Get(int id)
	{
		return (APIEnums.GithubAPIJson)id switch
		{
			APIEnums.GithubAPIJson.Commits => JsonConvert.SerializeObject(Github.GetCommits()),
			_ => string.Empty,
		};
	}
}
