using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class FixConflictSnapshotVer1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "InvoiceSchedules");

            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "InvoiceSchedules");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "UnitPrice",
                table: "Invoices");
        }
    }
}
