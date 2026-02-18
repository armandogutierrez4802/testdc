using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers;

/// <summary>
/// Manages in-memory text notes.
/// Endpoints: GET api/notes, GET api/notes/{id}, POST api/notes
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    // In-memory note store — keyed by GUID string
    private static readonly Dictionary<string, Note> _store = new();

    // GET api/notes — return summary list (id, title, savedAt) without content
    [HttpGet]
    public IActionResult List()
    {
        var summaries = _store.Values
            .OrderByDescending(n => n.SavedAt)
            .Select(n => new { n.Id, n.Title, n.SavedAt });
        return Ok(summaries);
    }

    // GET api/notes/{id} — return full note including content
    [HttpGet("{id}")]
    public IActionResult Get(string id)
    {
        if (!_store.TryGetValue(id, out var note))
            return NotFound(new { error = $"Note '{id}' not found." });

        return Ok(note);
    }

    // POST api/notes — save a new note and return it
    [HttpPost]
    public IActionResult Create([FromBody] CreateNoteRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Title) || string.IsNullOrWhiteSpace(req.Content))
            return BadRequest(new { error = "Title and content are required." });

        var note = new Note(
            Id: Guid.NewGuid().ToString(),
            Title: req.Title.Trim(),
            Content: req.Content,
            SavedAt: DateTime.UtcNow
        );

        _store[note.Id] = note;
        return Ok(note);
    }
}

// Request body shape for POST api/notes
public record CreateNoteRequest(string Title, string Content);
