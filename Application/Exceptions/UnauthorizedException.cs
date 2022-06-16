using AutoWrapper.Wrappers;
using Microsoft.AspNetCore.Http;

namespace Application.Exceptions;

public class UnauthorizedException : BaseHttpException
{
    private readonly static int statusCode = StatusCodes.Status401Unauthorized;

    public UnauthorizedException(object customError) : base(customError, statusCode)
    {
    }

    public UnauthorizedException(IEnumerable<ValidationError> errors) : base(errors, statusCode)
    {
    }

    public UnauthorizedException(Exception ex) : base(ex, statusCode)
    {
    }

    public UnauthorizedException(string message, string errorCode = null, string refLink = null) : base(message, statusCode, errorCode, refLink)
    {
    }
}
