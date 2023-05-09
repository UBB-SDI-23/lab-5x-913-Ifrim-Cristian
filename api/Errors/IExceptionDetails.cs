using Microsoft.AspNetCore.Mvc;

namespace api.Errors;

public interface IExceptionDetails
{
    ProblemDetails GetDetails();
}
