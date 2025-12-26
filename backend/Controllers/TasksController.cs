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
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var deleted = _service.Delete(id);
            if (!deleted)
                return NotFound();

            return NoContent(); 
        }
        [HttpGet]
        public IActionResult GetAll(
     [FromQuery] TaskWebApp.Api.Models.TaskStatus? status,
     [FromQuery] TaskPriority? priority,
     [FromQuery] string? sortBy)
        {
            var tasks = _service.GetAll();

            if (status.HasValue)
            {
                tasks = tasks
                    .Where(t => t.Status == status.Value)
                    .ToList();
            }

            if (priority.HasValue)
            {
                tasks = tasks
                    .Where(t => t.Priority == priority.Value)
                    .ToList();
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortBy.Equals("deadline", StringComparison.OrdinalIgnoreCase))
                    tasks = tasks.OrderBy(t => t.Deadline).ToList();

                if (sortBy.Equals("priority", StringComparison.OrdinalIgnoreCase))
                    tasks = tasks.OrderBy(t => t.Priority).ToList();
            }

            return Ok(tasks);
        }



    }
}
