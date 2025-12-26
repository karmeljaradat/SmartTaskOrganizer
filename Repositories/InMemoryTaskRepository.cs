using TaskWebApp.Api.Models;

namespace TaskWebApp.Api.Repositories
{
    public class InMemoryTaskRepository : ITaskRepository
    {
        private static readonly List<TaskItem> _tasks = new();

        public void Add(TaskItem task) => _tasks.Add(task);

        public List<TaskItem> GetAll() => _tasks;

        public TaskItem? GetById(Guid id)
            => _tasks.FirstOrDefault(t => t.Id == id);

        public void Update(TaskItem task)
        {
            var index = _tasks.FindIndex(t => t.Id == task.Id);
            if (index >= 0)
                _tasks[index] = task;
        }
    }
}
