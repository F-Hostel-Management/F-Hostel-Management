using Domain.Common;
using Domain.Entities.Invoice;
using Domain.Entities.Room;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.InvoiceSchedule
{
    public class InvoiceScheduleEntity : BaseEntity
    {
        public string InvoiceCode { get; set; }
        public double Price { get; set; }
        public string Cron { get; set; }
        public string Content { get; set; }

        /*navigation props*/

        // M invoices - 1 type
        public Guid InvoiceTypeId { get; set; }
        public InvoiceType InvoiceType { get; set; }

        // 1 Manager (make) M InvoiceSchedules (for) 1 Room
        public Guid ManagerId { get; set; }
        public UserEntity Manager { get; set; }
        public Guid RoomId { get; set; }
        public RoomEntity Room { get; set; }
    }
}
