using Microsoft.AspNetCore.Mvc;
using TaskWebApp.Api.Models;
using TaskWebApp.Api.Services;

namespace TaskWebApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _service;

        public TasksController(TaskService service)
        {
            _service = service;
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody] TaskItem task)
        {
            var updated = _service.Update(id, task);
            if (updated == null)
                return NotFound();

            return Ok(updated);
        }
    }
}
