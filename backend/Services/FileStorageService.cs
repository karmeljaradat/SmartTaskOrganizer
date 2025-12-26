using System.Text.Json;
using TaskWebApp.Api.Models;

namespace TaskWebApp.Api.Services
{
    public class FileStorageService
    {
        private readonly string _filePath = "tasks.json";

        public void Save(List<TaskItem> tasks)
        {
            var json = JsonSerializer.Serialize(tasks, new JsonSerializerOptions
            {
                WriteIndented = true
            });
            File.WriteAllText(_filePath, json);
        }

        public List<TaskItem> Load()
        {
            if (!File.Exists(_filePath))
                return new List<TaskItem>();

            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<TaskItem>>(json)
                   ?? new List<TaskItem>();
        }
    }
}
