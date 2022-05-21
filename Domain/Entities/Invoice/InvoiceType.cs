using Domain.Common;
using Domain.Entities.InvoiceSchedule;

namespace Domain.Entities.Invoice
{
    public class InvoiceType : BaseEntity, Category
    {
        public string CategoryName { get; set; }

        /*navigation props*/

        // InvoiceSchedule
        public virtual ICollection<InvoiceScheduleEntity> InvoiceSchedules { get; set; }

        // Invoice
        public virtual ICollection<InvoiceEntity> InvoiceEntities { get; set; }

    }
}
