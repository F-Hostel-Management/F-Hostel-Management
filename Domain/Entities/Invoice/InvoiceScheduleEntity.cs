using Domain.Common;
using Domain.Entities.Room;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.InvoiceSchedule;

[Table("InvoiceSchedules")]
public class InvoiceScheduleEntity : BaseEntity
{ 
    public string InvoiceCode { get; set; }
    public double Price { get; set; }
    public string Cron { get; set; }
    public string Content { get; set; }
    public string InvoiceType { get; set; }


    /*navigation props*/

    // 1 Manager (make) M InvoiceSchedules (for) 1 Room
    public Guid ManagerId { get; set; }
    public UserEntity Manager { get; set; }
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }
}
