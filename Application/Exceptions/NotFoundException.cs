using AutoWrapper.Wrappers;
using Microsoft.AspNetCore.Http;

namespace Application.Exceptions;

public class NotFoundException : BaseHttpException
{
    private readonly static int statusCode = StatusCodes.Status404NotFound;

    public NotFoundException(object customError) : base(customError, statusCode)
    {
    }

    public NotFoundException(IEnumerable<ValidationError> errors) : base(errors, statusCode)
    {
    }

    public NotFoundException(Exception ex) : base(ex, statusCode)
    {
    }

    public NotFoundException(string message, string errorCode = null, string refLink = null) : base(message, statusCode, errorCode, refLink)
    {
    }
}
