﻿namespace Stryxus.Website.Data.Json;

public static class GithubJson
{
    public class CommitJson
    {
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required DateTime PublishDateTime { get; set; }
    }
}
