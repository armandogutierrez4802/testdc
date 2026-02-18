namespace Backend.Models;

/// <summary>Represents a user-authored text note stored in memory.</summary>
public record Note(
    string Id,        // GUID assigned at save time
    string Title,     // Short display label
    string Content,   // Full text body
    DateTime SavedAt  // UTC timestamp
);
