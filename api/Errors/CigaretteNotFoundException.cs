using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace api.Errors;

public class CigaretteNotFoundException : Exception, IExceptionDetails
{
    public int CigaretteId { get; set; }
    public CigaretteNotFoundException(int cigaretteId) : base($"Cigarette with id {cigaretteId} not found.")
    {
        CigaretteId = cigaretteId;
    }

    public ProblemDetails GetDetails()
    {
        return new ProblemDetails
        {
            Status = (int)HttpStatusCode.NotFound,
            Type = "not-found-error",
            Title = "Cigarette not found error",
            Detail = this.Message
        };
    }
}
