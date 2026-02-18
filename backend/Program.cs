var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// CORS: allow the Vite dev server (port 3000) to call the API.
// Tighten or remove this policy before any production deployment.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("AllowReactDev");
app.MapControllers();

app.Run();
