using AutoWrapper.Wrappers;

namespace Application.Exceptions;

public abstract class BaseHttpException : ApiException
{
    protected BaseHttpException(object customError, int statusCode = 400) : base(customError, statusCode)
    {
    }

    protected BaseHttpException(IEnumerable<ValidationError> errors, int statusCode = 400) : base(errors, statusCode)
    {
    }

    protected BaseHttpException(Exception ex, int statusCode = 500) : base(ex, statusCode)
    {
    }

    protected BaseHttpException(string message, int statusCode = 400, string errorCode = null, string refLink = null) : base(message, statusCode, errorCode, refLink)
    {
    }
}
