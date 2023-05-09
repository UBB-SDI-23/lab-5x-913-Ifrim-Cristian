using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace api.Errors
{
    public class BrandNotFoundException : Exception, IExceptionDetails
    {
        public int BrandId { get; set; }
        public BrandNotFoundException(int brandId) : base($"Brand with id {brandId} not found.")
        {
            BrandId = brandId;
        }

        public ProblemDetails GetDetails()
        {
            return new ProblemDetails
            {
                Status = (int)HttpStatusCode.NotFound,
                Type = "not-found-error",
                Title = "Brand not found error",
                Detail = this.Message
            };
        }

        ProblemDetails IExceptionDetails.GetDetails()
        {
            throw new NotImplementedException();
        }
    }
}