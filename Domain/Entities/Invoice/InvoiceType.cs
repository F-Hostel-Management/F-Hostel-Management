using Domain.Common;
using Domain.Entities.InvoiceSchedule;

namespace Domain.Entities.Invoice
{
    public class InvoiceType : BaseEntity, Category
    {
        public string CategoryName { get; set; }

        /*navigation props*/

        // 1 type - M invoiceSchedules
        public virtual ICollection<InvoiceScheduleEntity> InvoiceSchedules { get; set; }

        // 1 type - M invoices
        public virtual ICollection<InvoiceEntity> Invoices { get; set; }

    }
}
