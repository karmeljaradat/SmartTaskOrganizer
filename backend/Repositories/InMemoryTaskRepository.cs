using TaskWebApp.Api.Models;
using TaskWebApp.Api.Services;

namespace TaskWebApp.Api.Repositories
{
    public class InMemoryTaskRepository : ITaskRepository
    {
        private readonly FileStorageService _storage;
        private static List<TaskItem> _tasks = new();

        public InMemoryTaskRepository(FileStorageService storage)
        {
            _storage = storage;
            _tasks = _storage.Load();
        }

        public void Add(TaskItem task)
        {
            _tasks.Add(task);
            _storage.Save(_tasks);
        }

        public List<TaskItem> GetAll() => _tasks;

        public TaskItem? GetById(Guid id)
            => _tasks.FirstOrDefault(t => t.Id == id);

        public void Update(TaskItem task)
        {
            var index = _tasks.FindIndex(t => t.Id == task.Id);
            if (index >= 0)
            {
                _tasks[index] = task;
                _storage.Save(_tasks);
            }
        }

        public void Delete(Guid id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task != null)
            {
                _tasks.Remove(task);
                _storage.Save(_tasks);
            }
        }
    }
}
