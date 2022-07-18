namespace Application.Interfaces;

public interface IInvoiceScheduleServices
{
    Task DeleteInvoicesScheduleByRoomId(Guid roomId);
}