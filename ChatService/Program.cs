using ChatService;
using ChatService.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowCredentials()
            .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(options =>
    new Dictionary<string, UserConnection>()
);

var app = builder.Build();

app.UseRouting();

app.UseCors();

app.MapHub<ChatHub>("/chat");

app.Run();

