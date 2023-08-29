using Microsoft.AspNetCore.Mvc;

namespace Stryxus.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        /*
        // GET: api/<AdminController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { };
        }

        // GET api/<AdminController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AdminController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        */

#if DEBUG
        // PUT api/<AdminController>/5
        [HttpPut("{command}")]
        public void Put(int command)
        {
            if (command == 0) Core.Shutdown();
        }
#endif

        /*

        // DELETE api/<AdminController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        */
    }
}
