using System.ComponentModel.DataAnnotations;
using api.DTOs;

namespace api.Validations;

[AttributeUsage(AttributeTargets.Property | 
  AttributeTargets.Field, AllowMultiple = false)]
public class QuantityCheck : ValidationAttribute
{
    public QuantityCheck(int quantity)
        => Quantity = quantity;

    public int Quantity { get; }

    public string GetErrorMessage() =>
        $"Quantities must have a number higher than {Quantity}.";

    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var cigarette = (AddCigaretteDto)validationContext.ObjectInstance;
        var quantity = cigarette.NicotineQuantity;

        if (quantity <= Quantity)
        {
            return new ValidationResult(GetErrorMessage());
        }

        return ValidationResult.Success;
    }
}