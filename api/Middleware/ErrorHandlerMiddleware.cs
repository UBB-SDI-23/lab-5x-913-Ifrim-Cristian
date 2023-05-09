using System.Net;
using System.Text.Json;
using api.Errors;
using Microsoft.AspNetCore.Mvc;

namespace api.Middleware;

public class ErrorHandlerMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception exception)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            ProblemDetails error;

            switch (exception)
            {
                case CigaretteNotFoundException ex:
                    error = ex.GetDetails();
                    break;
                case ConditionNotMetException ex:
                    error = ex.GetDetails();
                    break;
                case BrandNotFoundException ex:
                    error = ex.GetDetails();
                    break;
                default:
                    error = new ProblemDetails();
                    error.Status = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            var result = JsonSerializer.Serialize(error);
            context.Response.StatusCode = error.Status.GetValueOrDefault((int)HttpStatusCode.InternalServerError);
            await response.WriteAsync(result);
        }
    }
}
