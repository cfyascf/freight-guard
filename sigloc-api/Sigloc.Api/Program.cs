using Sigloc.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add our clean Auth setup
builder.Services.AddSiglocAuthentication(builder.Configuration);
builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();
app.Run();