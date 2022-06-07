using AutoWrapper.Wrappers;
using Microsoft.AspNetCore.Http;

namespace Application.Exceptions;

public class BadRequestException : BaseHttpException
{
    private readonly static int statusCode = StatusCodes.Status400BadRequest;

    public BadRequestException(object customError) : base(customError, statusCode)
    {
    }

    public BadRequestException(IEnumerable<ValidationError> errors) : base(errors, statusCode)
    {
    }

    public BadRequestException(Exception ex) : base(ex, statusCode)
    {
    }

    public BadRequestException(string message, string errorCode = null, string refLink = null) : base(message, statusCode, errorCode, refLink)
    {
    }
}
