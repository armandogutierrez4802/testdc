using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilesController : ControllerBase
{
    // In-memory file store — simulates HDFS / blob storage
    private static readonly Dictionary<string, byte[]> _store = new();

    // GET api/files — list all stored file names
    [HttpGet]
    public IActionResult List()
    {
        return Ok(_store.Keys.ToList());
    }

    // GET api/files/{name} — download a file by name
    [HttpGet("{name}")]
    public IActionResult Download(string name)
    {
        if (!_store.ContainsKey(name))
            return NotFound(new { error = $"File '{name}' not found." });

        return File(_store[name], "application/octet-stream", name);
    }

    // POST api/files — upload a file
    [HttpPost]
    public IActionResult Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { error = "No file provided." });

        using var ms = new MemoryStream();
        file.CopyTo(ms);
        _store[file.FileName] = ms.ToArray();

        return Ok(new { name = file.FileName, size = file.Length });
    }
}
