using System.ComponentModel.DataAnnotations;
using api.DTOs;

namespace api.Validations;

[AttributeUsage(AttributeTargets.Property | 
  AttributeTargets.Field, AllowMultiple = false)]
public class PriceCheck : ValidationAttribute
{
    public PriceCheck(int price)
        => Price = price;

    public int Price { get; }

    public string GetErrorMessage() =>
        $"Prices must have a number higher than {Price}.";

    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var cigarette = (AddCigaretteDto)validationContext.ObjectInstance;
        var price = cigarette.Price;

        if (price <= Price)
        {
            return new ValidationResult(GetErrorMessage());
        }

        return ValidationResult.Success;
    }
}