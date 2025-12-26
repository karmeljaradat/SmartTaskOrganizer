using TaskWebApp.Api.Models;
using TaskWebApp.Api.Repositories;

namespace TaskWebApp.Api.Services
{
    public class TaskService
    {
        private readonly ITaskRepository _repo;

        public TaskService(ITaskRepository repo)
        {
            _repo = repo;
        }

        public TaskItem Create(TaskItem task)
        {
            task.Status = TaskWebApp.Api.Models.TaskStatus.ToDo;
            _repo.Add(task);
            return task;
        }

        public List<TaskItem> GetAll() => _repo.GetAll();

        public TaskItem? Update(Guid id, TaskItem updated)
        {
            var existing = _repo.GetById(id);
            if (existing == null) return null;

            existing.Title = updated.Title;
            existing.Description = updated.Description;
            existing.Deadline = updated.Deadline;
            existing.Priority = updated.Priority;

            _repo.Update(existing);
            return existing;
        }

        public bool Delete(Guid id)
        {
            var existing = _repo.GetById(id);
            if (existing == null) return false;

            _repo.Delete(id);
            return true;
        }

    }
}
