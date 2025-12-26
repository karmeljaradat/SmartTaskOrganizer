using TaskWebApp.Api.Models;

namespace TaskWebApp.Api.Repositories
{
    public interface ITaskRepository
    {
        void Add(TaskItem task);
        List<TaskItem> GetAll();
        TaskItem? GetById(Guid id);
        void Update(TaskItem task);
        void Delete(Guid id);

    }
}

