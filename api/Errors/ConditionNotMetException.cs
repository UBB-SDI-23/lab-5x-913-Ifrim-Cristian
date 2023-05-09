using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace api.Errors
{
    class ConditionNotMetException : Exception, IExceptionDetails
    {
        public ConditionNotMetException() : base("There were no entries found that met the specified conditions.")
        {
        }
        public ProblemDetails GetDetails()
        {
            return new ProblemDetails
            {
                Status = (int)HttpStatusCode.NotFound,
                Type = "not-found-error",
                Title = "Entries not found error",
                Detail = this.Message
            };
        }
    }
}