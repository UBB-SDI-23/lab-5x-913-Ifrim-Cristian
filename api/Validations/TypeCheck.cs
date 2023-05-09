using System.ComponentModel.DataAnnotations;
using api.DTOs;

namespace api.Validations;

[AttributeUsage(AttributeTargets.Property | 
  AttributeTargets.Field, AllowMultiple = false)]
public class TypeCheck : ValidationAttribute
{
    public TypeCheck() 
    {

    }

    private string[] types = { "Long", "Normal", "Slim", "DemiSlim", "Short" };

    public string GetErrorMessage() =>
        $"Cigarette types must be one of the following: {string.Join(", ", types)}";

    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var obj = (AddCigaretteDto)validationContext.ObjectInstance;
        var type = obj.Type;

        if (!types.Contains(type))
        {
            return new ValidationResult(GetErrorMessage());
        }

        return ValidationResult.Success;
    }
}